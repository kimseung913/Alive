'use client';

import Image from 'next/image';

type CharacterMood = 'happy' | 'satisfied' | 'worried' | 'celebrating';

interface GhostCharacterProps {
    mood?: CharacterMood;
    size?: 'sm' | 'md' | 'lg';
    animate?: boolean;
    className?: string;
}

export function GhostCharacter({
    mood = 'happy',
    size = 'md',
    animate = true,
    className = ''
}: GhostCharacterProps) {
    const sizeMap = {
        sm: { width: 48, height: 58 },
        md: { width: 80, height: 96 },
        lg: { width: 120, height: 144 },
    };

    const { width, height } = sizeMap[size];

    // For now, use a placeholder SVG until the actual character image is added
    return (
        <div
            className={`
        relative inline-flex items-center justify-center
        ${animate ? 'animate-float' : ''}
        ${className}
      `}
            style={{ width, height }}
        >
            {/* Placeholder Ghost SVG - Replace with actual character image */}
            <svg
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Gat (Korean Hat) */}
                <ellipse cx="50" cy="25" rx="35" ry="8" fill="#343A40" opacity="0.9" />
                <path
                    d="M30 25 L35 10 L65 10 L70 25"
                    fill="#343A40"
                    opacity="0.9"
                />
                <rect x="35" y="5" width="30" height="8" rx="2" fill="#343A40" />

                {/* Ghost Body */}
                <path
                    d="M25 45 C25 30 35 25 50 25 C65 25 75 30 75 45 L75 100 
             C75 100 70 95 65 100 C60 105 55 95 50 100 
             C45 105 40 95 35 100 C30 105 25 95 25 100 Z"
                    fill="#51CF66"
                />
                <path
                    d="M30 45 C30 35 38 30 50 30 C62 30 70 35 70 45 L70 95"
                    fill="#8CE99A"
                    opacity="0.5"
                />

                {/* Face based on mood */}
                {mood === 'happy' && (
                    <>
                        {/* Closed happy eyes */}
                        <path d="M35 55 Q40 50 45 55" stroke="#495057" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M55 55 Q60 50 65 55" stroke="#495057" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        {/* Smile */}
                        <path d="M40 70 Q50 78 60 70" stroke="#495057" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Blush */}
                        <circle cx="32" cy="62" r="5" fill="#FFB8B8" opacity="0.6" />
                        <circle cx="68" cy="62" r="5" fill="#FFB8B8" opacity="0.6" />
                    </>
                )}

                {mood === 'satisfied' && (
                    <>
                        {/* Very closed happy eyes */}
                        <path d="M33 52 Q40 48 47 52" stroke="#495057" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M53 52 Q60 48 67 52" stroke="#495057" strokeWidth="3" fill="none" strokeLinecap="round" />
                        {/* Big smile */}
                        <path d="M38 68 Q50 80 62 68" stroke="#495057" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        {/* Blush */}
                        <circle cx="30" cy="60" r="6" fill="#FFB8B8" opacity="0.7" />
                        <circle cx="70" cy="60" r="6" fill="#FFB8B8" opacity="0.7" />
                    </>
                )}

                {mood === 'worried' && (
                    <>
                        {/* Worried eyes */}
                        <circle cx="40" cy="52" r="4" fill="#495057" />
                        <circle cx="60" cy="52" r="4" fill="#495057" />
                        {/* Worried mouth */}
                        <path d="M42 72 Q50 68 58 72" stroke="#495057" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Sweat drop */}
                        <path d="M72 45 Q75 50 72 55 Q69 50 72 45" fill="#74C0FC" />
                    </>
                )}

                {mood === 'celebrating' && (
                    <>
                        {/* Star eyes */}
                        <text x="35" y="58" fontSize="12" fill="#495057">★</text>
                        <text x="55" y="58" fontSize="12" fill="#495057">★</text>
                        {/* Open smile */}
                        <ellipse cx="50" cy="72" rx="8" ry="5" fill="#495057" />
                        {/* Blush */}
                        <circle cx="30" cy="62" r="5" fill="#FFB8B8" opacity="0.8" />
                        <circle cx="70" cy="62" r="5" fill="#FFB8B8" opacity="0.8" />
                    </>
                )}

                {/* Hanbok collar detail */}
                <path
                    d="M42 85 L50 95 L58 85"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
