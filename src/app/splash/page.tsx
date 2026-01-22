'use client';

import { useEffect } from 'react';
import { GhostCharacter } from '@/components/character/GhostCharacter';

export default function SplashPage() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center safe-area-top safe-area-bottom">
            {/* Character with float animation */}
            <div className="mb-6">
                <GhostCharacter mood="happy" size="lg" animate={true} />
            </div>

            {/* Logo Text */}
            <h1 className="text-4xl font-bold text-foreground mb-2">
                살았니?
            </h1>

            {/* Slogan */}
            <p className="text-lg text-muted">
                무소식이 희소식이다
            </p>

            {/* Loading indicator */}
            <div className="mt-12">
                <div className="w-8 h-8 border-3 border-alive border-t-transparent rounded-full animate-spin" />
            </div>
        </main>
    );
}
