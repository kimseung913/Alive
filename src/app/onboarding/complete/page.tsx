'use client';

import { useEffect, useState } from 'react';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Button } from '@/components/ui/Button';

export default function OnboardingCompletePage() {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Trigger celebration animation after mount
        setTimeout(() => setShowConfetti(true), 300);
    }, []);

    const handleStart = () => {
        window.location.href = '/';
    };

    return (
        <main className="min-h-screen bg-background flex flex-col safe-area-top safe-area-bottom relative overflow-hidden">
            {/* Progress Bar */}
            <div className="px-6 pt-4">
                <div className="h-1 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-alive rounded-full w-full transition-all duration-300" />
                </div>
                <p className="text-xs text-subtle mt-2">3 / 3</p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Celebration Effect */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 rounded-full animate-bounce"
                                style={{
                                    backgroundColor: ['#8B4557', '#FFB8B8', '#74C0FC', '#FFA94D'][i % 4],
                                    left: `${10 + (i * 7)}%`,
                                    top: `${15 + (i % 3) * 10}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${1 + (i % 3) * 0.3}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className={`transition-all duration-500 ${showConfetti ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <GhostCharacter mood="celebrating" size="lg" animate={true} />
                </div>

                <h1 className={`mt-6 text-2xl font-bold text-foreground text-center transition-all duration-500 delay-200 ${showConfetti ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    준비 완료!
                </h1>

                <p className={`mt-2 text-muted text-center transition-all duration-500 delay-300 ${showConfetti ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    이제부터 매일 한 번<br />
                    <span className="text-alive font-semibold">"살았니?"</span> 버튼을 눌러주세요
                </p>

                {/* Summary Card */}
                <div className={`mt-8 w-full max-w-sm bg-surface rounded-2xl p-5 shadow-sm border border-border transition-all duration-500 delay-400 ${showConfetti ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h3 className="font-semibold text-foreground mb-3">설정 요약</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted">체크인 주기</span>
                            <span className="text-foreground font-medium">매일 (24시간)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted">알림 채널</span>
                            <span className="text-foreground font-medium">카카오톡 → SMS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className={`px-6 pb-8 transition-all duration-500 delay-500 ${showConfetti ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Button
                    size="lg"
                    fullWidth
                    onClick={handleStart}
                >
                    시작하기
                </Button>
            </div>
        </main>
    );
}
