import { StoryPage, InferenceQuestion, WordDef, EmotionType, StoryStageCard } from '../types';

export const STORY_TITLE = "Max the Brave Dog";

export const WORD_DICTIONARY: Record<string, WordDef> = {
  brave: {
    word: "Brave",
    korean: "용감한",
    ipa: "/breɪv/",
    englishMeaning: "Not afraid of danger or hard things.",
    inThisStory: "Max is a very brave watch dog.",
    pronunciationTip: "입술을 둥글게 모았다가 '브레이브'하고 발음해요.",
    iconType: "shield"
  },
  guards: {
    word: "Guards",
    korean: "지키다, 수호하다",
    ipa: "/ɡɑːrdz/",
    englishMeaning: "Protects or watches over a safe place.",
    inThisStory: "He guards the quiet garden.",
    pronunciationTip: "'가-ㄹ즈'로 '가' 소리를 길고 힘차게 내요.",
    iconType: "shield"
  },
  yard: {
    word: "Yard",
    korean: "마당, 뜰",
    ipa: "/jɑːrd/",
    englishMeaning: "An open grass area next to a house.",
    inThisStory: "A big red ball rolls into the yard.",
    pronunciationTip: "'야-ㄹ드'처럼 혀를 가볍게 뒤로 굴려요.",
    iconType: "yard"
  },
  gate: {
    word: "Gate",
    korean: "대문, 출입문",
    ipa: "/ɡeɪt/",
    englishMeaning: "A door in a fence or garden wall.",
    inThisStory: "Max watches the front gate.",
    pronunciationTip: "'게이트'에서 끝 음을 부드럽게 멈춰요.",
    iconType: "gate"
  },
  wall: {
    word: "Wall",
    korean: "담장, 벽",
    ipa: "/wɔːl/",
    englishMeaning: "A solid brick or stone fence around a yard.",
    inThisStory: "He stands near the stone wall.",
    pronunciationTip: "'월'을 발음할 때 혀끝을 윗니 뒤에 대요.",
    iconType: "wall"
  },
  rolls: {
    word: "Rolls",
    korean: "굴러가다",
    ipa: "/roʊlz/",
    englishMeaning: "Moves forward by turning over and over.",
    inThisStory: "A big red ball rolls into the yard.",
    pronunciationTip: "'롤-즈'하고 혀를 둥글게 말아 소리내요.",
    iconType: "ball"
  },
  park: {
    word: "Park",
    korean: "공원",
    ipa: "/pɑːrk/",
    englishMeaning: "A pleasant green place with grass and trees.",
    inThisStory: "It moves toward the open park.",
    pronunciationTip: "'파-ㄹ크'처럼 맑고 힘있게 발음해요.",
    iconType: "tree"
  },
  afraid: {
    word: "Afraid",
    korean: "두려워하는, 무서워하는",
    ipa: "/əˈfreɪd/",
    englishMeaning: "Feeling scared of something.",
    inThisStory: 'Max says, "I am not afraid of anything!"',
    pronunciationTip: "'어-프레이드'로 '프' 소리를 살려요.",
    iconType: "fear"
  },
  outside: {
    word: "Outside",
    korean: "바깥, 밖으로",
    ipa: "/ˌaʊtˈsaɪd/",
    englishMeaning: "Not inside the house or building.",
    inThisStory: "He looks at the trail outside.",
    pronunciationTip: "'아웃-사이드'의 두 박자를 또렷하게 읽어요.",
    iconType: "outdoor"
  },
  walks: {
    word: "Walks",
    korean: "걷다",
    ipa: "/wɔːks/",
    englishMeaning: "Moves forward by putting one foot before the other.",
    inThisStory: "Max walks through the gate.",
    pronunciationTip: "'워크스'에서 'l' 소리는 내지 않아요.",
    iconType: "footsteps"
  },
  sidewalk: {
    word: "Sidewalk",
    korean: "보도, 인도",
    ipa: "/ˈsaɪdwɔːk/",
    englishMeaning: "A safe paved path for people to walk beside the street.",
    inThisStory: "He steps onto the sidewalk.",
    pronunciationTip: "'사이드-워크'를 자연스럽게 이어 읽어요.",
    iconType: "path"
  },
  stands: {
    word: "Stands",
    korean: "서 있다",
    ipa: "/stændz/",
    englishMeaning: "Remains upright on one's feet.",
    inThisStory: "Max stands tall like a lion.",
    pronunciationTip: "'스탠-즈'로 힘있게 시작해요.",
    iconType: "stand"
  },
  bench: {
    word: "Bench",
    korean: "벤치, 긴 의자",
    ipa: "/bentʃ/",
    englishMeaning: "A long seat made of wood in a park.",
    inThisStory: "He hides near the park bench.",
    pronunciationTip: "'벤-취'처럼 끝 소리를 짧게 끊어요.",
    iconType: "bench"
  },
  sound: {
    word: "Sound",
    korean: "소리",
    ipa: "/saʊnd/",
    englishMeaning: "Something that you can hear with your ears.",
    inThisStory: "Max hears a soft sound in the bush.",
    pronunciationTip: "'사운-드'의 '운'을 부드럽게 이어줘요.",
    iconType: "ear"
  },
  bush: {
    word: "Bush",
    korean: "덤불, 수풀",
    ipa: "/bʊʃ/",
    englishMeaning: "A short plant with green leaves and many branches.",
    inThisStory: "Max hears a soft sound in the bush.",
    pronunciationTip: "'부-쉬'처럼 입술을 내밀며 소리내요.",
    iconType: "plant"
  },
  steps: {
    word: "Steps",
    korean: "걸음을 옮기다",
    ipa: "/steps/",
    englishMeaning: "Moves by lifting a paw or foot.",
    inThisStory: "Max steps into the cool shade.",
    pronunciationTip: "'스텝스'에서 '프' 소리를 가볍게 내요.",
    iconType: "paw"
  },
  shade: {
    word: "Shade",
    korean: "그늘",
    ipa: "/ʃeɪd/",
    englishMeaning: "A cool place sheltered from the hot sunshine.",
    inThisStory: "Max steps into the cool shade.",
    pronunciationTip: "'쉐이드'의 '쉬'를 부드럽게 바람 빼듯 내요.",
    iconType: "cloud_shade"
  },
  beside: {
    word: "Beside",
    korean: "~옆에",
    ipa: "/bɪˈsaɪd/",
    englishMeaning: "At the side of or next to someone.",
    inThisStory: "Max stays beside the little bird.",
    pronunciationTip: "'비-사이드'로 또박또박 발음해요.",
    iconType: "beside"
  },
  gently: {
    word: "Gently",
    korean: "부드럽게, 조심스럽게",
    ipa: "/ˈdʒentli/",
    englishMeaning: "In a kind, soft, and loving way.",
    inThisStory: "He sits down gently on the grass.",
    pronunciationTip: "'젠-틀리'로 따뜻하고 다정하게 읽어요.",
    iconType: "feather"
  },
  hugs: {
    word: "Hugs",
    korean: "꼭 안아주다",
    ipa: "/hʌɡz/",
    englishMeaning: "Puts arms around someone tightly to show love.",
    inThisStory: "Leo hugs Max and smiles.",
    pronunciationTip: "'허그-즈'에서 목 안쪽을 편안하게 열어요.",
    iconType: "heart"
  },
  truly: {
    word: "Truly",
    korean: "진정으로, 정말로",
    ipa: "/ˈtruːli/",
    englishMeaning: "In a real and honest way.",
    inThisStory: "Max is truly a brave dog today!",
    pronunciationTip: "'트루-리'로 힘을 주어 발음해요.",
    iconType: "star"
  },
  really: {
    word: "Really",
    korean: "진짜로, 실제로",
    ipa: "/ˈriːəli/",
    englishMeaning: "In reality or in fact.",
    inThisStory: "How does Max really feel?",
    pronunciationTip: "'리얼-리'처럼 자연스럽게 굴려요.",
    iconType: "question"
  },
  happen: {
    word: "Happen",
    korean: "일어나다, 발생하다",
    ipa: "/ˈhæpən/",
    englishMeaning: "To take place or occur.",
    inThisStory: "What will happen next?",
    pronunciationTip: "'해-픈'으로 두 음절을 경쾌하게 읽어요.",
    iconType: "magic"
  },
  nervous: {
    word: "Nervous",
    korean: "불안한, 초조한",
    ipa: "/ˈnɜːrvəs/",
    englishMeaning: "Worried and a little bit afraid.",
    inThisStory: "He is nervous and startled by the bicycle.",
    pronunciationTip: "'너-ㄹ버스'로 '너'를 길게 발음해요.",
    iconType: "fear"
  },
  protect: {
    word: "Protect",
    korean: "보호하다, 지키다",
    ipa: "/prəˈtekt/",
    englishMeaning: "To keep someone safe from hurt or danger.",
    inThisStory: "Max will protect the little baby bird.",
    pronunciationTip: "'프로-텍트'의 '텍'에 강세를 줘요.",
    iconType: "shield"
  },
  proud: {
    word: "Proud",
    korean: "자랑스러운, 뿌듯한",
    ipa: "/praʊd/",
    englishMeaning: "Feeling pleased and happy about what you did.",
    inThisStory: "He feels proud and truly happy.",
    pronunciationTip: "'프라우-드'를 당당하게 소리내요.",
    iconType: "badge"
  },
  trail: {
    word: "Trail",
    korean: "오솔길, 산책로",
    ipa: "/treɪl/",
    englishMeaning: "A path through a park or woods.",
    inThisStory: "He looks at the trail outside.",
    pronunciationTip: "'트레일'로 두 모음을 자연스럽게 이어줘요.",
    iconType: "path"
  },
  garden: {
    word: "Garden",
    korean: "정원, 뜰",
    ipa: "/ˈɡɑːrdn/",
    englishMeaning: "An outdoor area with grass, flowers, and plants.",
    inThisStory: "He guards the quiet garden.",
    pronunciationTip: "'가-ㄹ든'으로 부드럽게 발음해요.",
    iconType: "yard"
  },
  watches: {
    word: "Watches",
    korean: "지켜보다, 주시하다",
    ipa: "/ˈwɑːtʃɪz/",
    englishMeaning: "Looks at something carefully over time.",
    inThisStory: "Max watches the front gate.",
    pronunciationTip: "'와치즈'의 끝소리를 똑똑히 내요.",
    iconType: "ear"
  },
  stone: {
    word: "Stone",
    korean: "돌, 석재",
    ipa: "/stoʊn/",
    englishMeaning: "A hard, solid piece of rock.",
    inThisStory: "He stands near the stone wall.",
    pronunciationTip: "'스톤'으로 오 소리를 길게 내요.",
    iconType: "wall"
  },
  toward: {
    word: "Toward",
    korean: "~쪽으로, ~를 향하여",
    ipa: "/təˈwɔːrd/",
    englishMeaning: "In the direction of something.",
    inThisStory: "It moves toward the open park.",
    pronunciationTip: "'투-워드'처럼 앞뒤를 매끄럽게 연결해요.",
    iconType: "path"
  },
  through: {
    word: "Through",
    korean: "~를 통과하여, 지나서",
    ipa: "/θruː/",
    englishMeaning: "Going into one side and out of the other.",
    inThisStory: "Max walks through the gate.",
    pronunciationTip: "혀끝을 살짝 내밀며 '스루' 소리를 내요.",
    iconType: "footsteps"
  },
  lion: {
    word: "Lion",
    korean: "사자",
    ipa: "/ˈlaɪən/",
    englishMeaning: "A large, strong wild animal known as the king of beasts.",
    inThisStory: "Max stands tall like a lion.",
    pronunciationTip: "'라이언'으로 크고 당당하게 읽어요.",
    iconType: "badge"
  },
  hides: {
    word: "Hides",
    korean: "숨다",
    ipa: "/haɪdz/",
    englishMeaning: "Goes to a place where no one can see you.",
    inThisStory: "He hides near the park bench.",
    pronunciationTip: "'하이드-즈'로 끝을 부드럽게 내려요.",
    iconType: "fear"
  },
  leaves: {
    word: "Leaves",
    korean: "나뭇잎들",
    ipa: "/liːvz/",
    englishMeaning: "The flat, green parts growing on a plant or tree.",
    inThisStory: "He looks into the green leaves.",
    pronunciationTip: "'리-브즈'처럼 이를 살짝 보이며 읽어요.",
    iconType: "plant"
  },
  chirps: {
    word: "Chirps",
    korean: "짹짹 울다",
    ipa: "/tʃɜːrps/",
    englishMeaning: "Makes a short, high sound like a small baby bird.",
    inThisStory: "The baby bird chirps softly.",
    pronunciationTip: "'처-ㄹ프스'로 귀엽고 발랄하게 소리내요.",
    iconType: "ear"
  },
  softly: {
    word: "Softly",
    korean: "부드럽게, 조용하게",
    ipa: "/ˈsɔːftli/",
    englishMeaning: "In a gentle and quiet sound or manner.",
    inThisStory: "The baby bird chirps softly.",
    pronunciationTip: "'소프트-리'로 바람 빠지듯 조용하게 읽어요.",
    iconType: "feather"
  },
  grass: {
    word: "Grass",
    korean: "풀, 잔디",
    ipa: "/ɡræs/",
    englishMeaning: "The green ground plants covering the meadow.",
    inThisStory: "He sits down gently on the grass.",
    pronunciationTip: "'그래스'로 입을 크게 벌려 소리내요.",
    iconType: "yard"
  },
  smiles: {
    word: "Smiles",
    korean: "미소 짓다",
    ipa: "/smaɪlz/",
    englishMeaning: "Makes a happy look by curving the lips up.",
    inThisStory: "Leo hugs Max and smiles.",
    pronunciationTip: "'스마일-즈'로 웃으며 밝게 발음해요.",
    iconType: "heart"
  }
};

export const STORY_PAGES: StoryPage[] = [
  {
    pageNumber: 1,
    illustrationId: 'page_1',
    sentences: [
      {
        id: 'p1_s1',
        text: 'Max is a very brave watch dog.',
        underlinedWords: ['brave'],
        practiceWords: ['brave'],
        feedbackComment: "'brave'를 읽을 때 입술을 둥글게 모아 힘있게 읽어보세요!"
      },
      {
        id: 'p1_s2',
        text: 'He guards the quiet garden.',
        underlinedWords: ['guards', 'garden'],
        practiceWords: ['guards', 'garden'],
        feedbackComment: "'guards'와 'garden'의 시작 소리를 든든하고 분명하게 발음해보세요!"
      }
    ]
  },
  {
    pageNumber: 2,
    illustrationId: 'page_2',
    sentences: [
      {
        id: 'p2_s1',
        text: 'Max watches the front gate.',
        underlinedWords: ['watches', 'gate'],
        practiceWords: ['watches', 'gate'],
        feedbackComment: "'watches'와 'gate'의 소리를 선명하게 발음해보세요!"
      },
      {
        id: 'p2_s2',
        text: 'He stands near the stone wall.',
        underlinedWords: ['stone', 'wall'],
        practiceWords: ['stone', 'wall'],
        feedbackComment: "'wall'을 말할 때 혀끝을 윗니 뒤쪽에 살짝 대어보세요!"
      }
    ]
  },
  {
    pageNumber: 3,
    illustrationId: 'page_3',
    sentences: [
      {
        id: 'p3_s1',
        text: 'A big red ball rolls into the yard.',
        underlinedWords: ['rolls', 'yard'],
        practiceWords: ['rolls', 'ball'],
        feedbackComment: "'rolls'의 모음을 둥글게 소리내어 자연스럽게 이어보세요!"
      },
      {
        id: 'p3_s2',
        text: 'It moves toward the open park.',
        underlinedWords: ['toward', 'park'],
        practiceWords: ['open', 'park'],
        feedbackComment: "'park'의 시작 소리 p를 통통 튀듯 맑게 읽어보세요!"
      }
    ]
  },
  {
    pageNumber: 4,
    illustrationId: 'page_4',
    sentences: [
      {
        id: 'p4_s1',
        text: 'Max says, "I am not afraid of anything!"',
        underlinedWords: ['afraid'],
        practiceWords: ['afraid'],
        feedbackComment: "'afraid'의 f 소리에 살짝 바람을 불어넣어 연습해보세요!"
      },
      {
        id: 'p4_s2',
        text: 'He looks at the trail outside.',
        underlinedWords: ['trail', 'outside'],
        practiceWords: ['trail', 'outside'],
        feedbackComment: "'trail'과 'outside'의 발음을 또렷하고 경쾌하게 읽어보세요!"
      }
    ]
  },
  {
    pageNumber: 5,
    illustrationId: 'page_5',
    sentences: [
      {
        id: 'p5_s1',
        text: 'Max walks through the gate.',
        underlinedWords: ['walks', 'through'],
        practiceWords: ['walks', 'through'],
        feedbackComment: "'walks'에서 l 소리를 내지 않고 '워크스'처럼 읽어보세요!"
      },
      {
        id: 'p5_s2',
        text: 'He steps onto the sidewalk.',
        underlinedWords: ['steps', 'sidewalk'],
        practiceWords: ['sidewalk'],
        feedbackComment: "'sidewalk'의 'side'와 'walk'를 매끄럽게 연결해보세요!"
      }
    ]
  },
  {
    pageNumber: 6,
    illustrationId: 'page_6',
    sentences: [
      {
        id: 'p6_s1',
        text: 'Max stands tall like a lion.',
        underlinedWords: ['stands', 'lion'],
        practiceWords: ['stands', 'lion'],
        feedbackComment: "'stands'를 힘차고 당당한 목소리로 발음해보세요!"
      },
      {
        id: 'p6_s2',
        text: 'He hides near the park bench.',
        underlinedWords: ['hides', 'bench'],
        practiceWords: ['hides', 'bench'],
        feedbackComment: "'bench'의 끝소리 ch를 부드럽고 짧게 멈춰보세요!"
      }
    ]
  },
  {
    pageNumber: 7,
    illustrationId: 'page_7',
    sentences: [
      {
        id: 'p7_s1',
        text: 'Max hears a soft sound in the bush.',
        underlinedWords: ['sound', 'bush'],
        practiceWords: ['sound', 'bush'],
        feedbackComment: "'sound'의 모음과 'bush'의 쉬 소리를 살려 차분하게 읽어보세요!"
      },
      {
        id: 'p7_s2',
        text: 'He looks into the green leaves.',
        underlinedWords: ['leaves'],
        practiceWords: ['green', 'leaves'],
        feedbackComment: "'leaves'를 길고 부드럽게 소리내어보세요!"
      }
    ]
  },
  {
    pageNumber: 8,
    illustrationId: 'page_8',
    sentences: [
      {
        id: 'p8_s1',
        text: 'Max steps into the cool shade.',
        underlinedWords: ['steps', 'shade'],
        practiceWords: ['steps', 'shade'],
        feedbackComment: "'shade'의 앞소리를 조용히 속삭이듯 내보세요!"
      },
      {
        id: 'p8_s2',
        text: 'The baby bird chirps softly.',
        underlinedWords: ['chirps', 'softly'],
        practiceWords: ['chirps', 'softly'],
        feedbackComment: "'chirps'의 경쾌한 소리를 귀엽게 살려 읽어보세요!"
      }
    ]
  },
  {
    pageNumber: 9,
    illustrationId: 'page_9',
    sentences: [
      {
        id: 'p9_s1',
        text: 'Max stays beside the little bird.',
        underlinedWords: ['beside'],
        practiceWords: ['beside'],
        feedbackComment: "'beside'를 또박또박 안정감 있게 읽어보세요!"
      },
      {
        id: 'p9_s2',
        text: 'He sits down gently on the grass.',
        underlinedWords: ['gently', 'grass'],
        practiceWords: ['gently', 'grass'],
        feedbackComment: "'gently'를 다정하고 따뜻한 톤으로 발음해보세요!"
      }
    ]
  },
  {
    pageNumber: 10,
    illustrationId: 'page_10',
    sentences: [
      {
        id: 'p10_s1',
        text: 'Leo hugs Max and smiles.',
        underlinedWords: ['hugs', 'smiles'],
        practiceWords: ['hugs', 'smiles'],
        feedbackComment: "'hugs'와 'smiles'를 기분 좋은 미소를 지으며 읽어보세요!"
      },
      {
        id: 'p10_s2',
        text: 'Max is truly a brave dog today!',
        underlinedWords: ['truly', 'brave'],
        practiceWords: ['truly', 'brave'],
        feedbackComment: "'truly'에 힘찬 자신감을 담아 멋지게 읽어보세요!"
      }
    ]
  }
];

export const INFERENCE_QUESTIONS: InferenceQuestion[] = [
  {
    id: 'q_page_2',
    pageNumber: 2,
    question: "How does Max really feel?",
    underlinedWord: "really",
    choices: [
      "He feels scared of the small cat.",
      "He is very angry at the cat.",
      "He is sleeping happily."
    ],
    correctIndex: 0,
    hint: "Look at Max's shaking legs and surprised face!"
  },
  {
    id: 'q_page_4',
    pageNumber: 4,
    question: "What will happen next?",
    underlinedWord: "happen",
    choices: [
      "Max will run outside to find the ball.",
      "Max will sleep inside his doghouse.",
      "The cat will bring the ball back."
    ],
    correctIndex: 0,
    hint: "Look at the ball outside the open gate and Max looking at it!"
  },
  {
    id: 'q_page_6',
    pageNumber: 6,
    question: "How does Max really feel?",
    underlinedWord: "nervous",
    choices: [
      "He is nervous and startled by the bicycle.",
      "He is proud and laughing out loud.",
      "He wants to ride the bicycle."
    ],
    correctIndex: 0,
    hint: "Look at Max hiding behind the bench with his eyes closed!"
  },
  {
    id: 'q_page_8',
    pageNumber: 8,
    question: "What will happen next?",
    underlinedWord: "protect",
    choices: [
      "Max will protect the little baby bird.",
      "Max will run back home alone.",
      "The bird will fly to the sky immediately."
    ],
    correctIndex: 0,
    hint: "Look at the baby bird looking right at Max!"
  },
  {
    id: 'q_page_10',
    pageNumber: 10,
    question: "How does Max really feel?",
    underlinedWord: "proud",
    choices: [
      "He feels proud and truly happy.",
      "He is still scared and crying.",
      "He is sleepy and bored."
    ],
    correctIndex: 0,
    hint: "Look at Max's wagging tail and bright smiling face!"
  }
];

export const REFLECTION_OPTIONS: Record<EmotionType, { emoji: string; label: string; chips: string[] }> = {
  happy: {
    emoji: '😊',
    label: 'happy',
    chips: [
      'Max saved the baby bird.',
      'Leo gave Max a warm hug.',
      'Max showed real courage today.'
    ]
  },
  sad: {
    emoji: '🙁',
    label: 'sad',
    chips: [
      'Max was shaking behind the bench.',
      'The baby bird fell from the nest.',
      'Max dropped his favorite bone.'
    ]
  },
  surprised: {
    emoji: '😮',
    label: 'surprised',
    chips: [
      'The butterfly landed on Max\'s nose.',
      'The bicycle splashed water quickly.',
      'The big red ball rolled away.'
    ]
  },
  interested: {
    emoji: '🤔',
    label: 'interested',
    chips: [
      'Max looked at the cat on the wall.',
      'The baby bird chirped for help.',
      'Max stepped outside the front gate.'
    ]
  }
};

export const STORY_STAGE_CARDS: StoryStageCard[] = [
  {
    id: 'stage_beginning',
    stageName: 'beginning',
    sentence: 'Max stays in the yard and sees a small cat.',
    illustrationId: 'page_2'
  },
  {
    id: 'stage_development',
    stageName: 'development',
    sentence: 'A red ball rolls outside through the open gate.',
    illustrationId: 'page_4'
  },
  {
    id: 'stage_turn',
    stageName: 'turn',
    sentence: 'Max gets startled by a bicycle but finds a baby bird.',
    illustrationId: 'page_6'
  },
  {
    id: 'stage_ending',
    stageName: 'ending',
    sentence: 'Max guards the little bird until his owner smiles.',
    illustrationId: 'page_10'
  }
];

export const VIRTUAL_BOOKS = [
  {
    id: 'max_brave_dog',
    title: 'Max the Brave Dog',
    badge: 'Current',
    description: 'A courageous puppy who overcomes his fears to protect a tiny friend.',
    icon: '🐶'
  },
  {
    id: 'luna_space_bunny',
    title: 'Luna the Space Bunny',
    badge: 'Coming Soon',
    description: 'Hop across the stars with Luna on an exciting moonlit adventure.',
    icon: '🐰'
  },
  {
    id: 'sammy_ocean_adventure',
    title: "Sammy's Ocean Adventure",
    badge: 'Coming Soon',
    description: 'Dive deep into the coral reef with a friendly sea turtle.',
    icon: '🐢'
  }
];
