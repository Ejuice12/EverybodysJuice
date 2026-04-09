import React from 'react';

export const COLORS = {
  bg: '#000000',
  orangeFrom: '#FF6B00',
  orangeTo: '#FFB347',
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.6)',
} as const;

export const ORANGE_GRADIENT = 'linear-gradient(135deg, #FF6B00, #FFB347)';

export const GLASS_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: 24,
};

export const ORANGE_TEXT_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, #FF6B00, #FFB347)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// NB International font family string — use everywhere
export const NB = "'NB International', sans-serif";
