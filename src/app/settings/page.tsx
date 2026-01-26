'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = () => {
        // TODO: 실제 회원탈퇴 로직 구현
        console.log('회원탈퇴 처리');
        setShowDeleteModal(false);
    };

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
                    <div className="bg-surface rounded-xl border border-border divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary transition-colors text-error">
                            <span>로그아웃</span>
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary transition-colors text-error"
                        >
                            <span>회원탈퇴</span>
                        </button>
                    </div>
                </section>
            </div>

            {/* 회원탈퇴 확인 모달 */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowDeleteModal(false)}
                    />
                    <div className="relative bg-surface rounded-2xl p-6 mx-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">회원탈퇴</h3>
                        <p className="text-muted mb-6">
                            정말 탈퇴하시겠습니까?<br />
                            탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 px-4 rounded-xl border border-border text-foreground font-medium hover:bg-surface-secondary transition-colors cursor-pointer"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="flex-1 py-3 px-4 rounded-xl bg-error text-white font-medium hover:bg-error/90 transition-colors cursor-pointer"
                            >
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
