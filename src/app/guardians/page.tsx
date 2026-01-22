'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Guardian {
    id: string;
    name: string;
    phone: string;
}

export default function GuardiansPage() {
    const [guardians, setGuardians] = useState<Guardian[]>([
        { id: '1', name: '엄마', phone: '010-1234-5678' }
    ]);
    const [showAddSheet, setShowAddSheet] = useState(false);
    const [editingGuardian, setEditingGuardian] = useState<Guardian | null>(null);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };

    const handleSave = () => {
        if (editingGuardian) {
            setGuardians(guardians.map(g =>
                g.id === editingGuardian.id
                    ? { ...g, name: newName, phone: newPhone }
                    : g
            ));
        } else {
            setGuardians([...guardians, {
                id: Date.now().toString(),
                name: newName,
                phone: newPhone
            }]);
        }
        closeSheet();
    };

    const handleDelete = (id: string) => {
        if (guardians.length <= 1) {
            alert('최소 1명의 보호자가 필요해요');
            return;
        }
        if (confirm('정말 삭제하시겠어요?')) {
            setGuardians(guardians.filter(g => g.id !== id));
        }
    };

    const openEditSheet = (guardian: Guardian) => {
        setEditingGuardian(guardian);
        setNewName(guardian.name);
        setNewPhone(guardian.phone);
        setShowAddSheet(true);
    };

    const openAddSheet = () => {
        setEditingGuardian(null);
        setNewName('');
        setNewPhone('');
        setShowAddSheet(true);
    };

    const closeSheet = () => {
        setShowAddSheet(false);
        setEditingGuardian(null);
        setNewName('');
        setNewPhone('');
    };

    return (
        <main className="min-h-screen bg-background safe-area-top safe-area-bottom">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="p-2 -ml-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-foreground">보호자 관리</h1>
                </div>
                <button
                    onClick={openAddSheet}
                    className="p-2 text-alive hover:text-alive-dark transition-colors cursor-pointer touch-target"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </button>
            </header>

            {/* Guardian List */}
            <div className="px-6 py-4">
                <div className="space-y-3">
                    {guardians.map((guardian) => (
                        <div
                            key={guardian.id}
                            className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-alive-light/30 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-alive">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{guardian.name}</p>
                                    <p className="text-sm text-muted">{guardian.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEditSheet(guardian)}
                                    className="p-2 text-muted hover:text-foreground transition-colors cursor-pointer touch-target"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(guardian.id)}
                                    className="p-2 text-muted hover:text-error transition-colors cursor-pointer touch-target"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <p className="mt-6 text-sm text-muted text-center">
                    체크인이 없으면 보호자에게 알림을 보내요
                </p>
            </div>

            {/* Bottom Sheet */}
            {showAddSheet && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeSheet}
                    />

                    {/* Sheet */}
                    <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl p-6 safe-area-bottom animate-slide-up">
                        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6" />

                        <h2 className="text-xl font-bold text-foreground mb-6">
                            {editingGuardian ? '보호자 수정' : '보호자 추가'}
                        </h2>

                        <div className="space-y-4">
                            <Input
                                label="이름"
                                placeholder="예) 엄마"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <Input
                                label="전화번호"
                                placeholder="010-0000-0000"
                                type="tel"
                                value={newPhone}
                                onChange={(e) => setNewPhone(formatPhoneNumber(e.target.value))}
                            />
                        </div>

                        <div className="flex gap-3 mt-8">
                            <Button variant="secondary" fullWidth onClick={closeSheet}>
                                취소
                            </Button>
                            <Button
                                fullWidth
                                onClick={handleSave}
                                disabled={!newName.trim() || newPhone.replace(/\D/g, '').length < 10}
                            >
                                저장
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </main>
    );
}
