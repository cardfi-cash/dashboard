/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#ff007a',
					foreground: '#ffffff',
					50: '#fef0f7',
					100: '#fee4f0',
					200: '#fcc8e1',
					300: '#fa9cc8',
					400: '#f660a8',
					500: '#f0348a',
					600: '#e11d70',
					700: '#c41363',
					800: '#a31354',
					900: '#8a1549',
				},
				secondary: {
					DEFAULT: '#7c3aed',
					foreground: '#ffffff',
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
				},
				accent: {
					DEFAULT: '#2563eb',
					foreground: '#ffffff',
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: '#1e1b20',
					foreground: '#8b949e',
				},
				popover: {
					DEFAULT: '#131017',
					foreground: '#f8fafc',
				},
				card: {
					DEFAULT: '#1a1625',
					foreground: '#f8fafc',
				},
				// DeFi-specific colors
				defi: {
					bg: '#0d1421',
					surface: '#131926',
					overlay: '#1a2332',
					pink: '#ff007a',
					purple: '#7c3aed',
					blue: '#2563eb',
					gradient: {
						from: '#ff007a',
						via: '#7c3aed',
						to: '#2563eb',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}