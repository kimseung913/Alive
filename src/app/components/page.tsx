'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import { GhostCharacter } from '@/components/character/GhostCharacter';

export default function ComponentsPage() {
    const [inputValue, setInputValue] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

    return (
        <main className="min-h-screen bg-background safe-area-top safe-area-bottom">
            {/* Header */}
            <header className="flex items-center gap-4 px-4 py-4 border-b border-border sticky top-0 bg-background z-10">
                <button
                    onClick={() => window.location.href = '/'}
                    className="p-2 -ml-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-foreground">컴포넌트 가이드</h1>
            </header>

            <div className="px-6 py-8 space-y-12 pb-24">

                {/* Color Palette */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">🎨 컬러 팔레트</h2>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="space-y-2">
                            <div className="h-16 rounded-xl bg-alive" />
                            <p className="text-xs text-muted text-center">Alive Green</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-16 rounded-xl bg-alive-light" />
                            <p className="text-xs text-muted text-center">Alive Light</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-16 rounded-xl bg-error" />
                            <p className="text-xs text-muted text-center">Error</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-16 rounded-xl bg-warning" />
                            <p className="text-xs text-muted text-center">Warning</p>
                        </div>
                    </div>
                </section>

                {/* Ghost Character */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">👻 K-Ghost 캐릭터</h2>

                    <h3 className="text-sm font-medium text-muted mb-3">Moods</h3>
                    <div className="flex items-end gap-6 mb-6">
                        <div className="text-center">
                            <GhostCharacter mood="happy" size="md" />
                            <p className="text-xs text-muted mt-2">happy</p>
                        </div>
                        <div className="text-center">
                            <GhostCharacter mood="happy" size="md" />
                            <p className="text-xs text-muted mt-2">happy</p>
                        </div>
                        <div className="text-center">
                            <GhostCharacter mood="worried" size="md" />
                            <p className="text-xs text-muted mt-2">worried</p>
                        </div>
                        <div className="text-center">
                            <GhostCharacter mood="celebrating" size="md" />
                            <p className="text-xs text-muted mt-2">celebrating</p>
                        </div>
                    </div>

                    <h3 className="text-sm font-medium text-muted mb-3">Sizes</h3>
                    <div className="flex items-end gap-6">
                        <div className="text-center">
                            <GhostCharacter mood="happy" size="sm" />
                            <p className="text-xs text-muted mt-2">sm (48px)</p>
                        </div>
                        <div className="text-center">
                            <GhostCharacter mood="happy" size="md" />
                            <p className="text-xs text-muted mt-2">md (80px)</p>
                        </div>
                        <div className="text-center">
                            <GhostCharacter mood="happy" size="lg" animate />
                            <p className="text-xs text-muted mt-2">lg (120px) + animate</p>
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">🔘 버튼</h2>

                    <h3 className="text-sm font-medium text-muted mb-3">Variants</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="text">Text</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>

                    <h3 className="text-sm font-medium text-muted mb-3">Sizes</h3>
                    <div className="flex items-center gap-3 mb-6">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                    </div>

                    <h3 className="text-sm font-medium text-muted mb-3">States</h3>
                    <div className="flex items-center gap-3 mb-6">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button loading>Loading</Button>
                    </div>

                    <h3 className="text-sm font-medium text-muted mb-3">Circular (Check-in Button)</h3>
                    <div className="flex justify-center">
                        <Button circular size="xl">살았니?</Button>
                    </div>
                </section>

                {/* Input */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">📝 Input</h2>
                    <div className="space-y-4 max-w-sm">
                        <Input
                            label="기본 Input"
                            placeholder="placeholder"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Input
                            label="Hint 있는 Input"
                            placeholder="placeholder"
                            hint="도움말 텍스트입니다"
                        />
                        <Input
                            label="Character Count"
                            placeholder="placeholder"
                            showCount
                            maxLength={10}
                        />
                        <Input
                            label="Error 상태"
                            placeholder="placeholder"
                            error="오류 메시지입니다"
                        />
                    </div>
                </section>

                {/* Toast */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">🍞 Toast</h2>
                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => { setToastType('success'); setShowToast(true); }}
                        >
                            Success
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => { setToastType('error'); setShowToast(true); }}
                        >
                            Error
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => { setToastType('info'); setShowToast(true); }}
                        >
                            Info
                        </Button>
                    </div>
                </section>

                {/* Typography */}
                <section>
                    <h2 className="text-lg font-bold text-foreground mb-4">🔤 Typography</h2>
                    <div className="space-y-3">
                        <p className="text-4xl font-bold text-foreground">Heading 1 (4xl bold)</p>
                        <p className="text-2xl font-bold text-foreground">Heading 2 (2xl bold)</p>
                        <p className="text-xl font-bold text-foreground">Heading 3 (xl bold)</p>
                        <p className="text-lg font-medium text-foreground">Body Large (lg medium)</p>
                        <p className="text-base text-foreground">Body (base)</p>
                        <p className="text-sm text-muted">Caption (sm muted)</p>
                        <p className="text-xs text-subtle">Small (xs subtle)</p>
                    </div>
                </section>

            </div>

            {/* Toast */}
            {showToast && (
                <Toast
                    message={
                        toastType === 'success' ? '성공 메시지입니다' :
                            toastType === 'error' ? '오류가 발생했습니다' : '정보 메시지입니다'
                    }
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </main>
    );
}
