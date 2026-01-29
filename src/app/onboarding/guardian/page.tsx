'use client';

import { useState } from 'react';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function OnboardingGuardianPage() {
    const [guardianName, setGuardianName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const [errors, setErrors] = useState({ name: '', phone: '' });

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };

    const validateForm = () => {
        const newErrors = { name: '', phone: '' };
        let isValid = true;

        if (guardianName.trim().length === 0) {
            newErrors.name = '보호자 이름을 입력해주세요';
            isValid = false;
        }

        const phoneNumbers = phoneNumber.replace(/\D/g, '');
        if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
            newErrors.phone = '올바른 전화번호를 입력해주세요';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateForm()) {
            window.location.href = '/onboarding/complete';
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col safe-area-top safe-area-bottom">
            {/* Progress Bar */}
            <div className="px-6 pt-4">
                <div className="h-1 bg-surface-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-alive rounded-full w-2/3 transition-all duration-300" />
                </div>
                <p className="text-xs text-subtle mt-2">2 / 3</p>
            </div>

            {/* Back Button */}
            <div className="px-4 pt-2">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 -ml-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-6 pt-4">
                <div className="flex items-center gap-3 mb-2">
                    <GhostCharacter mood="happy" size="sm" animate={false} />
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            비상 연락처
                        </h1>
                        <p className="text-sm text-muted">
                            24시간 체크인이 없으면 연락드려요
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <Input
                        label="보호자 이름"
                        placeholder="예) 엄마"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        error={errors.name}
                    />

                    <Input
                        label="전화번호"
                        placeholder="010-0000-0000"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        error={errors.phone}
                    />
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-alive-light/20 rounded-xl space-y-4">
                    {/* 개인정보 보호 안내 */}
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-alive/20 rounded-full flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-alive">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-foreground font-medium">
                                개인정보는 안전하게 보호됩니다.
                            </p>
                            <p className="text-sm text-muted mt-1">
                                연락처는 암호화되어 저장되며, 체크인이 없을 때만 연락을 드려요.
                            </p>
                        </div>
                    </div>

                    {/* 보호자 동의 안내 */}
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-alive/20 rounded-full flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-alive">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-foreground font-medium">
                                보호자 동의가 필요해요.
                            </p>
                            <p className="text-sm text-muted mt-1">
                                입력하신 번호로 안내 문자가 발송되니,
                                꼭 미리 <br />동의를 구해주세요.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <label className="mt-4 flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isConsentChecked}
                        onChange={(e) => setIsConsentChecked(e.target.checked)}
                        className="w-5 h-5 rounded border-border text-alive focus:ring-alive cursor-pointer"
                    />
                    <span className="text-sm text-foreground">
                        보호자 동의를 확인했습니다 <span className="text-muted">(필수)</span>
                    </span>
                </label>
            </div>

            {/* Bottom Button */}
            <div className="px-6 pb-8">
                <Button
                    size="lg"
                    fullWidth
                    disabled={guardianName.trim().length === 0 || phoneNumber.replace(/\D/g, '').length < 10 || !isConsentChecked}
                    onClick={handleNext}
                >
                    완료
                </Button>
            </div>
        </main>
    );
}
