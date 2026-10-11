import React from 'react';

interface WordIconProps {
  iconType: string;
  className?: string;
}

export const WordIcon: React.FC<WordIconProps> = ({ iconType, className = 'w-10 h-10' }) => {
  switch (iconType) {
    case 'shield':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4 L34 9 C34 24 20 36 20 36 C20 36 6 24 6 9 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <path d="M20 8 L30 12 C30 23 20 32 20 32 Z" fill="#60a5fa" />
          <polygon points="20,13 22,18 27,18 23,21 24,26 20,23 16,26 17,21 13,18 18,18" fill="#facc15" />
        </svg>
      );
    case 'yard':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="24" width="36" height="14" rx="3" fill="#22c55e" />
          <circle cx="12" cy="18" r="6" fill="#f43f5e" />
          <circle cx="12" cy="18" r="2.5" fill="#fef08a" />
          <circle cx="28" cy="16" r="7" fill="#fbbf24" />
          <circle cx="28" cy="16" r="3" fill="#ffffff" />
          <rect x="18" y="10" width="4" height="16" fill="#15803d" />
        </svg>
      );
    case 'gate':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="6" height="28" rx="2" fill="#78350f" />
          <rect x="30" y="8" width="6" height="28" rx="2" fill="#78350f" />
          <rect x="10" y="12" width="20" height="4" fill="#b45309" />
          <rect x="10" y="26" width="20" height="4" fill="#b45309" />
          <rect x="14" y="16" width="4" height="18" fill="#d97706" />
          <rect x="22" y="16" width="4" height="18" fill="#d97706" />
          <circle cx="26" cy="22" r="2" fill="#1e293b" />
        </svg>
      );
    case 'wall':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="10" width="32" height="24" rx="2" fill="#b91c1c" />
          <line x1="4" y1="18" x2="36" y2="18" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="4" y1="26" x2="36" y2="26" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="14" y1="10" x2="14" y2="18" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="26" y1="10" x2="26" y2="18" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="20" y1="18" x2="20" y2="26" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="10" y1="26" x2="10" y2="34" stroke="#fee2e2" strokeWidth="1.5" />
          <line x1="30" y1="26" x2="30" y2="34" stroke="#fee2e2" strokeWidth="1.5" />
        </svg>
      );
    case 'ball':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
          <path d="M12 12 A 16 16 0 0 1 28 28" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="14" cy="14" r="3" fill="#ffffff" opacity="0.8" />
        </svg>
      );
    case 'tree':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="17" y="24" width="6" height="14" fill="#78350f" />
          <circle cx="20" cy="16" r="13" fill="#22c55e" />
          <circle cx="14" cy="14" r="9" fill="#16a34a" />
          <circle cx="26" cy="14" r="9" fill="#4ade80" />
        </svg>
      );
    case 'fear':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="14" cy="15" r="4.5" fill="#1e1b4b" />
          <circle cx="26" cy="15" r="4.5" fill="#1e1b4b" />
          <circle cx="15" cy="14" r="1.5" fill="#ffffff" />
          <circle cx="27" cy="14" r="1.5" fill="#ffffff" />
          <ellipse cx="20" cy="27" rx="6" ry="4" fill="#451a03" />
          <path d="M30 6 Q35 12 32 16 A 3 3 0 0 1 27 12 Z" fill="#38bdf8" />
        </svg>
      );
    case 'outdoor':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="12" r="7" fill="#fbbf24" />
          <path d="M4 34 L16 16 L24 26 L30 18 L38 34 Z" fill="#3b82f6" opacity="0.8" />
          <path d="M12 34 L20 22 L28 34 Z" fill="#22c55e" />
        </svg>
      );
    case 'footsteps':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="14" cy="24" rx="6" ry="10" fill="#f59e0b" transform="rotate(-15, 14, 24)" />
          <ellipse cx="26" cy="14" rx="6" ry="10" fill="#d97706" transform="rotate(15, 26, 14)" />
          <circle cx="10" cy="12" r="2.5" fill="#f59e0b" />
          <circle cx="15" cy="10" r="2.5" fill="#f59e0b" />
          <circle cx="28" cy="2" r="2.5" fill="#d97706" />
          <circle cx="33" cy="4" r="2.5" fill="#d97706" />
        </svg>
      );
    case 'path':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <polygon points="6,36 16,4 24,4 34,36" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="20" y1="6" x2="20" y2="12" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="20" y1="18" x2="20" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3,3" />
          <line x1="20" y1="28" x2="20" y2="34" stroke="#ffffff" strokeWidth="3" strokeDasharray="3,3" />
        </svg>
      );
    case 'stand':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="8" r="5" fill="#d97706" />
          <line x1="20" y1="13" x2="20" y2="25" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="25" x2="14" y2="36" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="25" x2="26" y2="36" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="18" x2="28" y2="18" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'bench':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="28" height="4" rx="2" fill="#78350f" />
          <rect x="6" y="18" width="28" height="4" rx="2" fill="#78350f" />
          <rect x="4" y="24" width="32" height="4" rx="2" fill="#92400e" />
          <rect x="8" y="28" width="4" height="10" fill="#334155" />
          <rect x="28" y="28" width="4" height="10" fill="#334155" />
        </svg>
      );
    case 'ear':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8 Q26 6 26 18 Q26 26 18 28 Q14 29 14 34" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M17 14 Q22 14 21 20 Q20 23 16 24" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M28 12 Q34 16 28 22" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M31 8 Q40 16 31 26" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'plant':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="24" rx="14" ry="12" fill="#16a34a" />
          <ellipse cx="12" cy="20" rx="9" ry="8" fill="#22c55e" />
          <ellipse cx="28" cy="20" rx="9" ry="8" fill="#4ade80" />
          <circle cx="20" cy="14" r="8" fill="#15803d" />
        </svg>
      );
    case 'paw':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="26" rx="9" ry="7" fill="#d97706" />
          <ellipse cx="10" cy="18" rx="3.5" ry="5" fill="#d97706" transform="rotate(-20, 10, 18)" />
          <ellipse cx="16" cy="13" rx="3.5" ry="5" fill="#d97706" transform="rotate(-8, 16, 13)" />
          <ellipse cx="24" cy="13" rx="3.5" ry="5" fill="#d97706" transform="rotate(8, 24, 13)" />
          <ellipse cx="30" cy="18" rx="3.5" ry="5" fill="#d97706" transform="rotate(20, 30, 18)" />
        </svg>
      );
    case 'cloud_shade':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="14" r="6" fill="#facc15" />
          <path d="M8 24 Q10 18 16 19 Q18 14 24 16 Q28 15 30 19 Q34 20 33 25 Q32 30 24 30 L10 30 Q6 28 8 24 Z" fill="#94a3b8" />
          <ellipse cx="20" cy="35" rx="16" ry="3" fill="#64748b" opacity="0.4" />
        </svg>
      );
    case 'beside':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="20" r="9" fill="#d97706" />
          <circle cx="27" cy="20" r="7" fill="#38bdf8" />
          <path d="M18 20 L23 20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'feather':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M8 34 Q18 26 28 10 Q32 6 34 8 Q34 14 24 24 Q16 32 8 34 Z" fill="#a855f7" />
          <line x1="8" y1="34" x2="32" y2="8" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M20 34 C20 34 6 24 6 14 C6 8 11 4 16 6 C18 7 19.5 9 20 11 C20.5 9 22 7 24 6 C29 4 34 8 34 14 C34 24 20 34 20 34 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,4 24,14 35,15 26,23 29,34 20,28 11,34 14,23 5,15 16,14" fill="#facc15" stroke="#eab308" strokeWidth="2" />
        </svg>
      );
    case 'question':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="#818cf8" />
          <text x="20" y="27" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">?</text>
        </svg>
      );
    case 'magic':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,28 28,12 32,16 16,32" fill="#8b5cf6" />
          <polygon points="28,12 32,16 36,12 32,8" fill="#fde047" />
          <circle cx="10" cy="10" r="2" fill="#facc15" />
          <circle cx="20" cy="6" r="2" fill="#facc15" />
          <circle cx="6" cy="20" r="1.5" fill="#facc15" />
        </svg>
      );
    case 'badge':
      return (
        <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="16" r="12" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <polygon points="20,8 22,13 27,13 23,16 25,21 20,18 15,21 17,16 13,13 18,13" fill="#ffffff" />
          <polygon points="14,24 10,36 17,31" fill="#dc2626" />
          <polygon points="26,24 30,36 23,31" fill="#b91c1c" />
        </svg>
      );
    default:
      return (
        <div className={`${className} bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold text-xs`}>
          Aa
        </div>
      );
  }
};
