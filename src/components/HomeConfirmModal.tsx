import React from 'react';

interface HomeConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const HomeConfirmModal: React.FC<HomeConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 text-center space-y-4">
        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-2xl">
          🏠
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-kr text-stone-900">
            처음 화면으로 돌아갈까요?
          </h3>
          <p className="text-sm font-kr text-stone-600">
            지금까지 읽던 내용은 사라져요.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold font-kr text-sm transition-colors active:scale-98"
          >
            계속 읽기
          </button>
          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold font-kr text-sm shadow-md transition-colors active:scale-98"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
