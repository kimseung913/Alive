'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [notificationEnabled, setNotificationEnabled] = useState(true);

    return (
        <main className="min-h-screen bg-background safe-area-top safe-area-bottom">
            {/* Header */}
            <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
                <button
                    onClick={() => window.location.href = '/'}
                    className="p-2 -ml-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                    aria-label="뒤로가기"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-foreground">설정</h1>
            </header>

            <div className="px-6 py-4 space-y-6">
                {/* Profile Section */}
                <section>
                    <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">프로필</h2>
                    <button
                        onClick={() => window.location.href = '/settings/profile'}
                        className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-border cursor-pointer hover:bg-surface-secondary transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-alive-light/30 flex items-center justify-center">
                                <span className="text-xl"></span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-foreground">홍길동</p>
                                <p className="text-sm text-muted">프로필 편집</p>
                            </div>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </section>

                {/* App Settings */}
                <section>
                    <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">앱 설정</h2>
                    <div className="bg-surface rounded-xl border border-border divide-y divide-border">
                        {/* Notification Toggle */}
                        <div className="flex items-center justify-between p-4">
                            <div>
                                <p className="font-medium text-foreground">푸시 알림</p>
                                <p className="text-sm text-muted">체크인 리마인더 알림 받기</p>
                            </div>
                            <button
                                onClick={() => setNotificationEnabled(!notificationEnabled)}
                                className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${notificationEnabled ? 'bg-alive' : 'bg-border'
                                    }`}
                                role="switch"
                                aria-checked={notificationEnabled}
                            >
                                <div
                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${notificationEnabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Information */}
                <section>
                    <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">정보</h2>
                    <div className="bg-surface rounded-xl border border-border divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary transition-colors">
                            <span className="text-foreground">이용약관</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary transition-colors">
                            <span className="text-foreground">개인정보처리방침</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                        <div className="flex items-center justify-between p-4">
                            <span className="text-foreground">버전</span>
                            <span className="text-muted">1.0.0</span>
                        </div>
                    </div>
                </section>

                {/* Account */}
                <section>
                    <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">계정</h2>
                    <div className="bg-surface rounded-xl border border-border">
                        <button className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary transition-colors text-error">
                            <span>로그아웃</span>
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
