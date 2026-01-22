'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Toast } from '@/components/ui/Toast';

export default function Home() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Dev: Test mode state
  const [isTestMode, setIsTestMode] = useState(false);

  // Calculate seconds until next midnight
  const getSecondsToMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  };

  const [timeRemaining, setTimeRemaining] = useState(getSecondsToMidnight());
  const [showToast, setShowToast] = useState(false);
  const [characterMood, setCharacterMood] = useState<'happy' | 'satisfied' | 'worried' | 'celebrating' | 'panic'>('happy');

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (isTestMode) {
        setTimeRemaining((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      } else {
        const seconds = getSecondsToMidnight();
        setTimeRemaining(seconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestMode]);

  // Dev: Test trigger
  const [clickCount, setClickCount] = useState(0);
  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setIsTestMode(true);
        setTimeRemaining(5); // 5 seconds before expiration
        setClickCount(0); // Reset count
        return 0; // return something to satisfy setClickCount type if inferred
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
  const isEmergency = timeRemaining === 0 && !isCheckedIn;

  // Dynamic ghost mood based on time
  useEffect(() => {
    if (isEmergency) setCharacterMood('panic');
    else if (isCheckedIn) setCharacterMood('satisfied');
    else if (characterMood === 'celebrating') {/* keep celebrating */ }
    else {
      const hours = Math.floor(timeRemaining / 3600);
      if (hours < 1) setCharacterMood('worried');
      else if (hours < 12) setCharacterMood('satisfied');
      else setCharacterMood('happy');
    }
  }, [timeRemaining, isCheckedIn, isEmergency]);

  // Get status message
  const getStatusMessage = () => {
    if (isEmergency) return '보호자에게 구조 요청이 전송되었습니다!';
    if (isCheckedIn) {
      return '오늘도 무사히 안녕하세요 ';
    }
    const hours = Math.floor(timeRemaining / 3600);
    if (hours < 1) return '체크인 안 하면 정말 데리러 갈지도 몰라. 서둘러줘!';
    if (hours < 12) return '오늘 하루도 무사한지 궁금해.';
    return '오늘도 함께해주셔서 감사해요 ';
  };

  // Handle recovery check-in
  const handleCheckin = () => {
    setIsCheckedIn(true);
    setCharacterMood('celebrating');
    setShowToast(true);

    // Reset to satisfied after celebration
    setTimeout(() => {
      setCharacterMood('satisfied');
    }, 2000);

    if (isTestMode) {
      setIsTestMode(false); // Exit test mode on recovery
      setTimeRemaining(getSecondsToMidnight()); // Sync back to real time
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
          <GhostCharacter mood={characterMood === 'panic' ? 'worried' : characterMood} size="lg" animate={!isCheckedIn || isEmergency} />
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

        {/* Check-in Button */}
        <div className="mt-10">
          {isCheckedIn ? (
            <div className="w-32 h-32 flex flex-col items-center justify-center rounded-full bg-surface-secondary border-2 border-border">
              <svg className="w-8 h-8 text-alive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-muted mt-1">오늘 완료</span>
            </div>
          ) : (
            <Button
              circular
              size="lg"
              onClick={handleCheckin}
              className={isEmergency ? 'bg-white text-error hover:bg-white/90' : ''}
            >
              살았니?
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Section - Emergency Button or Guardian Access */}
      <div className="px-6 pb-8">
        {isEmergency ? (
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleCheckin}
            className="bg-white text-error hover:bg-white/90 font-bold animate-pulse shadow-lg"
          >
            저 살아있어요! (긴급 해제)
          </Button>
        ) : (
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
          message={isEmergency ? "긴급 상황이 해제되었습니다. 안전해서 다행이에요!" : "체크인 완료! 오늘도 안전하세요 "}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  );
}
