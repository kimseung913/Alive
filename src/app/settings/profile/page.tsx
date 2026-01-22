'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GhostCharacter } from '@/components/character/GhostCharacter';
import { Toast } from '@/components/ui/Toast';

export default function ProfilePage() {
    const [nickname, setNickname] = useState('홍길동');
    const [showToast, setShowToast] = useState(false);
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
        setError('');
        return true;
    };

    const handleSave = () => {
        if (validateNickname(nickname)) {
            setShowToast(true);
            setTimeout(() => {
                window.location.href = '/settings';
            }, 1500);
        }
    };

    return (
        <main className="min-h-screen bg-background safe-area-top safe-area-bottom">
            {/* Header */}
            <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
                <button
                    onClick={() => window.location.href = '/settings'}
                    className="p-2 -ml-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-foreground">프로필 편집</h1>
            </header>

            <div className="px-6 py-8">
                {/* Profile Avatar - Fixed Ghost Character */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-alive-light/30 flex items-center justify-center">
                        <GhostCharacter mood="happy" size="md" animate={false} />
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    <Input
                        label="닉네임"
                        placeholder="예) 홍길동"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                            if (error) validateNickname(e.target.value);
                        }}
                        error={error}
                        showCount
                        maxLength={10}
                        hint="언제든 변경할 수 있어요"
                    />

                    {/* Account Info (Read-only) */}
                    <div>
                        <label className="text-sm font-medium text-muted mb-2 block">연결된 계정</label>
                        <div className="flex items-center gap-3 p-4 bg-surface-secondary rounded-xl">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FEE500">
                                <path d="M12 3C6.477 3 2 6.463 2 10.709c0 2.745 1.823 5.164 4.574 6.545-.202.746-.735 2.699-.841 3.108-.131.506.185.499.39.363.161-.107 2.561-1.735 3.598-2.438.741.11 1.507.168 2.279.168 5.523 0 10-3.463 10-7.746C22 6.463 17.523 3 12 3z" />
                            </svg>
                            <span className="text-foreground">카카오 계정으로 로그인됨</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-background safe-area-bottom">
                <Button
                    size="lg"
                    fullWidth
                    onClick={handleSave}
                    disabled={nickname.trim().length === 0 || nickname === '홍길동'}
                >
                    저장
                </Button>
            </div>

            {/* Toast */}
            {showToast && (
                <Toast
                    message="프로필이 저장되었어요 "
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </main>
    );
}
