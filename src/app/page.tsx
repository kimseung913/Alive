'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Toast } from '@/components/ui/Toast';

// 24시간을 초 단위로 (86400초)
const TIMER_DURATION_SECONDS = 24 * 60 * 60;

// 로컬 스토리지 키
const TIMER_START_KEY = 'alive_timer_start';

export default function Home() {
  // Dev: Test mode state
  const [isTestMode, setIsTestMode] = useState(false);

  // 타이머 시작 시각 (localStorage에서 로드)
  const getStoredTimerStart = useCallback(() => {
    if (typeof window === 'undefined') return Date.now();
    const stored = localStorage.getItem(TIMER_START_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    // 최초 실행: 현재 시각 저장
    const now = Date.now();
    localStorage.setItem(TIMER_START_KEY, now.toString());
    return now;
  }, []);

  // 남은 시간 계산
  const calculateRemainingTime = useCallback(() => {
    const timerStart = getStoredTimerStart();
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    return Math.max(0, TIMER_DURATION_SECONDS - elapsed);
  }, [getStoredTimerStart]);

  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION_SECONDS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [characterMood, setCharacterMood] = useState<'happy' | 'worried' | 'celebrating' | 'panic'>('happy');

  // 컴포넌트 마운트 시 실제 남은 시간으로 초기화
  useEffect(() => {
    if (!isTestMode) {
      setTimeRemaining(calculateRemainingTime());
    }
  }, [calculateRemainingTime, isTestMode]);

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (isTestMode) {
        setTimeRemaining((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      } else {
        setTimeRemaining(calculateRemainingTime());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestMode, calculateRemainingTime]);

  // Dev: Test trigger
  const [clickCount, setClickCount] = useState(0);
  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setIsTestMode(true);
        setTimeRemaining(5); // 5 seconds before expiration
        setClickCount(0);
        return 0;
      }
      return newCount;
    });
  };

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Emergency State Check
  const isEmergency = timeRemaining === 0;

  // Dynamic ghost mood based on time
  useEffect(() => {
    if (isEmergency) setCharacterMood('panic');
    else if (characterMood === 'celebrating') {/* keep celebrating */ }
    else {
      const hours = Math.floor(timeRemaining / 3600);
      if (hours < 1) setCharacterMood('worried');
      else setCharacterMood('happy');
    }
  }, [timeRemaining, isEmergency, characterMood]);

  // Get status message
  const getStatusMessage = () => {
    if (isEmergency) return '보호자에게 구조 요청이 전송되었습니다!';
    const hours = Math.floor(timeRemaining / 3600);
    if (hours < 1) return '체크인 안 하면 정말 데리러 갈지도 몰라. 서둘러줘!';
    if (hours < 12) return '오늘 하루도 무사한지 궁금해.';
    return '오늘도 함께해주셔서 감사해요 ';
  };

  // Handle check-in: 24시간으로 리셋
  const handleCheckin = () => {
    // 타이머 시작 시각을 현재 시각으로 갱신 → 24시간 리셋
    const now = Date.now();
    localStorage.setItem(TIMER_START_KEY, now.toString());

    // UI 업데이트
    setTimeRemaining(TIMER_DURATION_SECONDS);
    setCharacterMood('celebrating');
    setToastMessage(isEmergency ? "긴급 상황이 해제되었습니다. 안전해서 다행이에요!" : "체크인 완료! 24시간이 리셋되었습니다 ");
    setShowToast(true);

    // Reset to happy after celebration
    setTimeout(() => {
      setCharacterMood('happy');
    }, 2000);

    if (isTestMode) {
      setIsTestMode(false);
    }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center relative safe-area-top safe-area-bottom transition-colors duration-500 ${isEmergency ? 'bg-error' : 'bg-background'}`}>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <h1
          className={`text-xl font-bold cursor-pointer select-none active:scale-95 transition-transform ${isEmergency ? 'text-white' : 'text-foreground'}`}
          onClick={handleTitleClick}
        >
          살았니?
        </h1>
        <button
          onClick={() => window.location.href = '/settings'}
          className={`p-2 -mr-2 transition-colors cursor-pointer touch-target ${isEmergency ? 'text-white/80 hover:text-white' : 'text-muted hover:text-foreground'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Character */}
        <div className={`transition-transform duration-500 ${characterMood === 'celebrating' ? 'animate-success-pop' : ''}`}>
          <GhostCharacter mood={characterMood === 'panic' ? 'worried' : characterMood} size="lg" animate={isEmergency || characterMood === 'worried'} />
        </div>

        {/* Timer */}
        <div className="mt-6 text-center">
          <p className={`text-5xl md:text-6xl font-bold font-mono tracking-tight ${isEmergency ? 'text-white' : 'text-alive'}`}>
            {formatTime(timeRemaining)}
          </p>
          <p className={`mt-3 ${isEmergency ? 'text-white/90 font-bold' : 'text-muted'}`}>
            {getStatusMessage()}
          </p>
        </div>

        {/* Check-in Button - 항상 활성화 (24시간 리셋) */}
        <div className="mt-10 flex flex-col items-center">
          <Button
            circular
            size="lg"
            onClick={handleCheckin}
            className={isEmergency ? 'bg-white !text-error hover:bg-white/90' : ''}
          >
            {isEmergency ? '긴급해제' : '살았니?'}
          </Button>
          {/* 긴급모드일 때 버튼 아래 "저 살아있어요" 텍스트 표시 */}
          {isEmergency && (
            <p className="mt-4 text-white/90 text-lg font-medium">
              저 살아있어요
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section - Guardian Access (긴급모드가 아닐 때만 표시) */}
      <div className="px-6 pb-8">
        {!isEmergency && (
          <button
            onClick={() => window.location.href = '/guardians'}
            className="w-full py-4 flex items-center justify-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-sm">보호자 연락처 관리</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  );
}
