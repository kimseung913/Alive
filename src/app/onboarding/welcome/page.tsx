'use client';

import { useState } from 'react';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function OnboardingWelcomePage() {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const validateNickname = (value: string) => {
        if (value.length === 0) {
            setError('닉네임을 입력해주세요');
            return false;
        }
        if (value.length > 10) {
            setError('닉네임은 10자 이하로 입력해주세요');
            return false;
        }
        if (!/^[가-힣a-zA-Z0-9\s]+$/.test(value)) {
            setError('한글, 영문, 숫자만 입력할 수 있어요');
            return false;
        }
        if (value.trim().length === 0) {
            setError('공백만으로는 닉네임을 만들 수 없어요');
            return false;
        }
        setError('');
        return true;
    };

    const handleNext = () => {
        if (validateNickname(nickname)) {
            // Navigate to next step
            window.location.href = '/onboarding/guardian';
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col safe-area-top safe-area-bottom">
            {/* Progress Bar */}
            <div className="px-6 pt-4">
                <div className="h-1 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-alive rounded-full w-1/3 transition-all duration-300" />
                </div>
                <p className="text-xs text-subtle mt-2">1 / 3</p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <GhostCharacter mood="happy" size="lg" animate={true} />

                <h1 className="mt-6 text-2xl font-bold text-foreground text-center">
                    환영합니다!
                </h1>

                <p className="mt-2 text-muted text-center">
                    긴급 알림에 표시될 이름을 입력해주세요.
                </p>

                <div className="w-full max-w-sm mt-8">
                    <Input
                        label="이름"
                        placeholder="예) 홍길동"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                            if (error) validateNickname(e.target.value);
                        }}
                        error={error}
                        showCount
                        maxLength={10}
                        hint="위급한 순간, 보호자에게 이 이름으로 알림이 가요." />
                </div>
            </div>

            {/* Bottom Button */}
            <div className="px-6 pb-8">
                <Button
                    size="lg"
                    fullWidth
                    disabled={nickname.trim().length === 0}
                    onClick={handleNext}
                >
                    다음
                </Button>
            </div>
        </main>
    );
}
