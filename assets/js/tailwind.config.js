/* P3LBA — Design tokens (dipakai index.html & typography.html) */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Primary — Terakota: semangat, kepedulian perempuan, harapan
        terra: {
          50: '#FDF4EE', 100: '#FAE4D5', 200: '#F4C6A8', 300: '#EBA077',
          400: '#E07A4C', 500: '#C95F32', 600: '#B04B24', 700: '#8F3A1E',
          800: '#73301D', 900: '#5E2A1B',
        },
        // Secondary — Hijau Hutan: ketenangan, kepercayaan, pendidikan
        forest: {
          50: '#EEF7F0', 100: '#D5EDDA', 200: '#ABDAB6', 300: '#78BF89',
          400: '#47A15D', 500: '#2A8443', 600: '#1E6B35', 700: '#18552C',
          800: '#154425', 900: '#0F3320', 950: '#0A2416',
        },
        // Aksen dari logo
        bark: '#6B3410',   // cokelat figur logo
        ochre: '#C99A2E',  // oker "Perempuan"
        // Latar
        ivory: '#FCF8F1',  // putih gading
        peach: '#F7DEC6',  // krem/peach section
        ink: '#1E1A16',    // teks utama
      },
      fontFamily: {
        display: ['Prompt', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Skala tipografi P3LBA (rasio ~1.25, fluid di heading besar)
        'display': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h2': ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['clamp(1.375rem, 2.2vw, 1.75rem)', { lineHeight: '1.25', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        'lead': ['1.1875rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.6' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.18em', fontWeight: '600' }],
      },
      borderRadius: { 'xl2': '1.25rem' },
      boxShadow: { 'soft': '0 20px 50px -20px rgba(94, 42, 27, .35)' },
    },
  },
};
