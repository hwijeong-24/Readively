/**
 * Shared Audio & Speech Recognition Utilities for Readively
 * Implements strict Section 5-A Valid Speech Check
 */

export interface SpeechValidationResult {
  isValid: boolean;
  transcript: string;
  durationMs: number;
  averageVolume: number;
  sustainedAboveNoiseMs: number;
  noiseFloor: number;
  audioBlobUrl?: string;
  failureReason?: string;
}

export type SpeechRecorderState = 'idle' | 'recording' | 'processing' | 'permission_denied';

export class VoiceSpeechValidator {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private recognition: any = null;
  private animFrameId: number | null = null;

  private startTime: number = 0;
  private transcriptText: string = '';
  private noiseFloorSamples: number[] = [];
  private calculatedNoiseFloor: number = 0.005;
  private sustainedVoiceTimeMs: number = 0;
  private lastSampleTime: number = 0;
  private totalRmsSum: number = 0;
  private totalSampleCount: number = 0;
  private hasRecognitionError: boolean = false;
  private recognitionErrorMessage: string = '';

  /**
   * Start recording with AudioContext volume analysis and SpeechRecognition
   */
  public async startRecording(onVolumeUpdate?: (currentVolume: number) => void): Promise<void> {
    this.resetState();

    // 1. Request microphone access
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Initialize MediaRecorder to capture learner's audio for "My Voice"
      if (typeof MediaRecorder !== 'undefined') {
        try {
          this.audioChunks = [];
          this.mediaRecorder = new MediaRecorder(this.mediaStream);
          this.mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              this.audioChunks.push(e.data);
            }
          };
          this.mediaRecorder.start(100);
        } catch (mErr) {
          console.warn('[VoiceValidator] MediaRecorder init error:', mErr);
        }
      }
    } catch (err: any) {
      console.error('[VoiceValidator] Microphone permission denied or device error:', err);
      throw new Error('PERMISSION_DENIED');
    }

    // 2. Setup Web AudioContext + AnalyserNode
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      this.audioContext = new AudioCtx();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.3;
      source.connect(this.analyser);
    }

    // 3. Setup Web Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          this.transcriptText = currentTranscript.trim();
        };

        this.recognition.onerror = (event: any) => {
          console.warn('[VoiceValidator] Speech recognition event error:', event.error);
          if (event.error === 'no-speech' || event.error === 'audio-capture') {
            this.hasRecognitionError = true;
            this.recognitionErrorMessage = event.error;
          }
        };

        this.recognition.start();
      } catch (e) {
        console.warn('[VoiceValidator] Could not start speech recognition:', e);
      }
    } else {
      console.warn('[VoiceValidator] Web Speech API not supported in this browser, relying strictly on AudioContext volume check.');
    }

    this.startTime = Date.now();
    this.lastSampleTime = this.startTime;

    // 4. Volume sampling loop
    const sampleBuffer = new Float32Array(this.analyser ? this.analyser.fftSize : 256);

    const checkVolume = () => {
      if (!this.analyser) return;

      this.analyser.getFloatTimeDomainData(sampleBuffer);
      let sumSq = 0;
      for (let i = 0; i < sampleBuffer.length; i++) {
        sumSq += sampleBuffer[i] * sampleBuffer[i];
      }
      const rms = Math.sqrt(sumSq / sampleBuffer.length);

      const now = Date.now();
      const deltaMs = Math.max(0, now - this.lastSampleTime);
      this.lastSampleTime = now;
      const elapsedTotalMs = now - this.startTime;

      // First 300ms: calibrate noise floor
      if (elapsedTotalMs <= 300) {
        this.noiseFloorSamples.push(rms);
        const avgNoise =
          this.noiseFloorSamples.reduce((a, b) => a + b, 0) / this.noiseFloorSamples.length;
        this.calculatedNoiseFloor = Math.max(0.003, avgNoise);
      } else {
        // After 300ms: check if volume is clearly above noise floor (at least 3x noise floor and >= 0.012 min RMS)
        const minThreshold = Math.max(0.012, this.calculatedNoiseFloor * 3);
        if (rms >= minThreshold) {
          this.sustainedVoiceTimeMs += deltaMs;
        }
      }

      this.totalRmsSum += rms;
      this.totalSampleCount += 1;

      if (onVolumeUpdate) {
        // Normalize 0 to 1 for visual feedback indicator
        const visualMeter = Math.min(1, Math.max(0, rms * 15));
        onVolumeUpdate(visualMeter);
      }

      this.animFrameId = requestAnimationFrame(checkVolume);
    };

    this.animFrameId = requestAnimationFrame(checkVolume);
  }

  /**
   * Stop recording, cleanup microphone streams, and perform strict Section 5-A validation
   */
  public async stopAndValidate(): Promise<SpeechValidationResult> {
    const durationMs = Date.now() - this.startTime;

    // Stop volume loop
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    // Stop speech recognition gracefully
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
    }

    // Give SpeechRecognition and MediaRecorder a small moment to deliver final buffers
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Release microphone tracks
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    // Close AudioContext
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        await this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }

    const averageVolume =
      this.totalSampleCount > 0 ? this.totalRmsSum / this.totalSampleCount : 0;
    const finalTranscript = this.transcriptText.trim();
    const isSpeechApiSupported =
      Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    // Section 5-A Validation Checks
    let isValid = true;
    let failureReason = '';

    // Condition A: Duration must be at least 1 second (1000ms)
    if (durationMs < 1000) {
      isValid = false;
      failureReason = 'Recording was shorter than 1 second.';
    }

    // Condition B: Volume check (AudioContext + AnalyserNode)
    // Must rise clearly above noise floor for at least 400ms in total
    if (this.sustainedVoiceTimeMs < 400) {
      isValid = false;
      failureReason = failureReason || `Voice volume was not sustained (only ${Math.round(this.sustainedVoiceTimeMs)}ms detected).`;
    }

    // Condition C: Real transcript check
    if (isSpeechApiSupported) {
      if (this.hasRecognitionError && !finalTranscript) {
        isValid = false;
        failureReason = failureReason || `Recognition error: ${this.recognitionErrorMessage}`;
      } else if (!finalTranscript || finalTranscript.length === 0) {
        isValid = false;
        failureReason = failureReason || 'No recognizable words were detected in the speech transcript.';
      }
    }

    let audioBlobUrl: string | undefined = undefined;
    if (this.audioChunks.length > 0 && isValid) {
      try {
        const mime = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: mime });
        audioBlobUrl = URL.createObjectURL(blob);
      } catch (e) {
        console.warn('[VoiceValidator] Error creating Blob URL:', e);
      }
    }

    const result: SpeechValidationResult = {
      isValid,
      transcript: finalTranscript,
      durationMs,
      averageVolume,
      sustainedAboveNoiseMs: Math.round(this.sustainedVoiceTimeMs),
      noiseFloor: Number(this.calculatedNoiseFloor.toFixed(4)),
      audioBlobUrl,
      failureReason: isValid ? undefined : failureReason,
    };

    // Requirement: Log transcript, volume, duration, and decision with console.log for debugging
    console.log('[VoiceValidator Decision]', {
      transcript: result.transcript,
      volume: Number(result.averageVolume.toFixed(4)),
      sustainedMs: result.sustainedAboveNoiseMs,
      durationMs: result.durationMs,
      noiseFloor: result.noiseFloor,
      decision: result.isValid ? 'VALID' : 'INVALID',
      failureReason: result.failureReason,
    });

    this.resetState();
    return result;
  }

  /**
   * Cancel and release resources without evaluating
   */
  public cancel(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
    }
    this.audioChunks = [];
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        // ignore
      }
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }
    this.resetState();
  }

  private resetState(): void {
    this.transcriptText = '';
    this.noiseFloorSamples = [];
    this.calculatedNoiseFloor = 0.005;
    this.sustainedVoiceTimeMs = 0;
    this.totalRmsSum = 0;
    this.totalSampleCount = 0;
    this.hasRecognitionError = false;
    this.recognitionErrorMessage = '';
  }
}

// Global shared singleton instance as per PRD: "Use ONE shared validation function for all recordings"
export const sharedVoiceValidator = new VoiceSpeechValidator();

/**
 * Text-to-speech for AI Model reading
 */
export function playAISpeech(text: string, onEnd?: () => void): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported');
    if (onEnd) onEnd();
    return () => {};
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.88; // Natural, clear pacing suitable for A1 elementary learners
  utterance.pitch = 1.05; // Cheerful, friendly tone

  // Try to pick a natural high-quality English voice if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))) ||
    voices.find((v) => v.lang.startsWith('en'));

  if (enVoice) {
    utterance.voice = enVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('TTS utterance error:', e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);

  // Return cancel function
  return () => {
    window.speechSynthesis.cancel();
  };
}

export function stopAISpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
