export const brandValues = [
  {
    id: 'customer-centricity',
    icon: 'Users',
    title: 'Customer Centricity',
    description: 'The core value of the organization is customer-centricity, ensuring that customer needs and satisfaction are always prioritized in decision-making.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'inclusivity',
    icon: 'Heart',
    title: 'Inclusivity',
    description: 'Committed to creating an inclusive environment where everyone feels valued and respected, fostering diversity in all aspects of business.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'discipline',
    icon: 'Target',
    title: 'Discipline',
    description: 'Maintaining high standards of discipline in operations, ensuring consistency, reliability, and excellence in service delivery.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'integrity',
    icon: 'Shield',
    title: 'Integrity',
    description: 'Operating with unwavering integrity and transparency, building trust through honest and ethical business practices.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'accountability',
    icon: 'CheckCircle',
    title: 'Accountability',
    description: 'Taking responsibility for actions and outcomes, ensuring accountability at all levels of the organization.',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

export const brandColors = {
  primary: [
    { name: 'Blue', hex: '#006CED', usage: 'Primary brand color for CTAs, navigation, and key interactive elements', pantone: 'PANTONE 2728 C' },
    { name: 'Orange', hex: '#FF8800', usage: 'Secondary accent for highlights, warnings, and call-to-action emphasis', pantone: 'PANTONE 1505 C' },
    { name: 'Navy', hex: '#002E8B', usage: 'Dark theme backgrounds, headers, and professional contexts', pantone: 'PANTONE 2758 C' },
    { name: 'Dark Gray', hex: '#212121', usage: 'Body text, primary text content, and dark UI elements', pantone: 'PANTONE Black 6 C' },
  ],
  secondary: [
    { name: 'Light Blue', hex: '#4D98F2', usage: 'Hover states and lighter interactive elements' },
    { name: 'Light Orange', hex: '#FFAC4D', usage: 'Lighter accent and notification backgrounds' },
    { name: 'Medium Gray', hex: '#666666', usage: 'Secondary text and subtle UI elements' },
    { name: 'Light Gray', hex: '#E5E5E5', usage: 'Borders, dividers, and background accents' },
    { name: 'Off White', hex: '#F5F5F5', usage: 'Page backgrounds and cards' },
  ],
};

export const brandTypography = {
  heading: {
    family: 'Neusharp Bold',
    usage: 'For headings, titles, and marketing materials that need strong visual impact',
    weights: ['Bold'],
    example: 'Empowering Digital Payments',
    characteristics: 'Modern, bold, attention-grabbing',
  },
  body: {
    family: 'Sofia Pro',
    usage: 'For body text, communications, and general content across all platforms',
    weights: ['Regular', 'Medium', 'Semibold', 'Bold'],
    example: 'Making payments accessible, secure, and seamless for everyone.',
    characteristics: 'Clean, readable, professional',
  },
};

export const logoGuidelines = {
  meaning: {
    title: 'Logo Symbolism',
    description: 'The SabPaisa logo combines the letter "S" with a transaction symbol, representing secure and seamless payment processing. The dual pill shapes connected by a triangle symbolize the flow of transactions between parties.',
  },
  spacing: {
    title: 'Clear Space',
    rule: '100px x 100px ratio for clear space around logo',
    description: 'Always maintain adequate clear space around the logo equal to the height of the logo symbol. This ensures the logo has breathing room and maintains visual impact.',
  },
  minimumSize: {
    print: '20mm',
    digital: '64px',
    description: 'Never reproduce the logo smaller than these minimum sizes to maintain legibility and brand recognition.',
  },
  dos: [
    'Use the official logo files provided in the brand kit',
    'Use on light backgrounds for the blue logo variant',
    'Use on dark backgrounds for the white logo variant',
    'Maintain the specified clear space around the logo',
    'Use approved color variants only',
    'Ensure sufficient contrast with the background',
  ],
  donts: [
    'Do not stretch, distort, or alter the logo proportions',
    'Do not change the logo colors or gradient',
    'Do not add effects, shadows, or outlines to the logo',
    'Do not use the logo on busy or patterned backgrounds',
    'Do not rotate or angle the logo',
    'Do not separate or rearrange logo elements',
    'Do not place the logo too close to other visual elements',
  ],
};

export const missionVision = {
  vision: {
    title: 'Our Vision',
    content: 'To ensure payment processing is accessible, secure, and seamless for everyone, everywhere. We envision a future where digital payments empower individuals and businesses to thrive in the digital economy.',
    highlight: '100% Digital | 100% Inclusive | 100% Freedom',
  },
  mission: {
    title: 'Our Mission',
    content: 'To provide innovative, reliable, and secure payment solutions that enable businesses to grow and customers to transact with confidence. We are committed to making digital payments accessible to all segments of society.',
  },
  tagline: '100% Digital | 100% Inclusive | 100% Freedom',
};

export const usageGuidelines = {
  applications: [
    {
      title: 'Digital Platforms',
      description: 'Website, mobile apps, web applications, and digital interfaces',
      colors: ['Blue (#006CED)', 'White (#FFFFFF)'],
      typography: 'Sofia Pro for UI elements, Neusharp Bold for headings',
    },
    {
      title: 'Marketing Materials',
      description: 'Brochures, flyers, presentations, and promotional content',
      colors: ['Blue (#006CED)', 'Orange (#FF8800)', 'Navy (#002E8B)'],
      typography: 'Neusharp Bold for headlines, Sofia Pro for body text',
    },
    {
      title: 'Business Documents',
      description: 'Letterheads, business cards, invoices, and official documents',
      colors: ['Navy (#002E8B)', 'Dark Gray (#212121)'],
      typography: 'Sofia Pro throughout for professional appearance',
    },
  ],
  backgrounds: {
    approved: [
      { name: 'White', hex: '#FFFFFF', logoVariant: 'Blue logo' },
      { name: 'Off White', hex: '#F5F5F5', logoVariant: 'Blue logo' },
      { name: 'Light Gray', hex: '#E5E5E5', logoVariant: 'Blue logo' },
      { name: 'Navy', hex: '#002E8B', logoVariant: 'White logo' },
      { name: 'Dark Gray', hex: '#212121', logoVariant: 'White logo' },
    ],
    restricted: [
      'Busy patterns or images',
      'Low contrast colors',
      'Gradients or complex backgrounds',
      'Colors too similar to brand colors',
    ],
  },
};

export const logoAssets = {
  primary: {
    svg: [
      {
        name: 'Primary Logo - Blue',
        filename: 'Asset 1.svg',
        variant: 'Full Logo - Blue on Light',
        format: 'SVG' as const,
        background: 'light' as const,
        description: 'Primary brand logo for light backgrounds',
      },
      {
        name: 'Primary Logo - White',
        filename: 'Asset 2.svg',
        variant: 'Full Logo - White on Dark',
        format: 'SVG' as const,
        background: 'dark' as const,
        description: 'Primary brand logo for dark backgrounds',
      },
      {
        name: 'Primary Logo - Blue Alt',
        filename: 'Asset 3.svg',
        variant: 'Alternative Blue Variant',
        format: 'SVG' as const,
        background: 'light' as const,
        description: 'Alternative blue logo variant',
      },
      {
        name: 'Primary Logo - Icon',
        filename: 'Asset 4.svg',
        variant: 'Icon Only - Blue',
        format: 'SVG' as const,
        background: 'light' as const,
        description: 'Icon-only version for compact spaces',
      },
      {
        name: 'Primary Logo - Stacked',
        filename: 'Asset 5.svg',
        variant: 'Stacked Layout',
        format: 'SVG' as const,
        background: 'light' as const,
        description: 'Stacked layout for vertical spaces',
      },
      {
        name: 'Primary Logo - Horizontal',
        filename: 'Asset 6.svg',
        variant: 'Horizontal Layout',
        format: 'SVG' as const,
        background: 'light' as const,
        description: 'Horizontal layout for wide spaces',
      },
    ],
    png: [
      {
        name: 'Primary Logo PNG - Variant 1',
        filename: 'Asset 7@4x.png',
        variant: 'High Resolution PNG',
        format: 'PNG' as const,
        background: 'light' as const,
        description: '4x resolution for print and large displays',
      },
      {
        name: 'Primary Logo PNG - Variant 2',
        filename: 'Asset 8@4x.png',
        variant: 'High Resolution PNG',
        format: 'PNG' as const,
        background: 'light' as const,
        description: '4x resolution for print and large displays',
      },
      {
        name: 'Primary Logo PNG - Variant 3',
        filename: 'Asset 9@4x.png',
        variant: 'High Resolution PNG',
        format: 'PNG' as const,
        background: 'light' as const,
        description: '4x resolution for print and large displays',
      },
      {
        name: 'Primary Logo PNG - Variant 4',
        filename: 'Asset 10@4x.png',
        variant: 'High Resolution PNG',
        format: 'PNG' as const,
        background: 'light' as const,
        description: '4x resolution for print and large displays',
      },
      {
        name: 'Primary Logo PNG - Variant 5',
        filename: 'Asset 11@4x.png',
        variant: 'High Resolution PNG',
        format: 'PNG' as const,
        background: 'light' as const,
        description: '4x resolution for print and large displays',
      },
    ],
  },
  secondary: {
    svg: [
      {
        name: 'Secondary Logo - Variant 1',
        filename: 'Group 46306.svg',
        variant: 'Secondary Brand Mark',
        format: 'SVG' as const,
        background: 'gradient' as const,
        description: 'Secondary logo mark for supporting materials',
      },
      {
        name: 'Secondary Logo - Variant 2',
        filename: 'Group 46307.svg',
        variant: 'Secondary Brand Mark',
        format: 'SVG' as const,
        background: 'gradient' as const,
        description: 'Secondary logo mark for supporting materials',
      },
      {
        name: 'Secondary Logo - Variant 3',
        filename: 'Group 46308.svg',
        variant: 'Secondary Brand Mark',
        format: 'SVG' as const,
        background: 'gradient' as const,
        description: 'Secondary logo mark for supporting materials',
      },
    ],
    png: [
      {
        name: 'Secondary Logo - Blue',
        filename: 'For Blue@4x.png',
        variant: 'For Blue Backgrounds',
        format: 'PNG' as const,
        background: 'gradient' as const,
        description: 'Optimized for blue background usage',
      },
      {
        name: 'Secondary Logo - For Dark Blue BG',
        filename: 'For Dark Blue@4x.png',
        variant: 'For Dark Blue Backgrounds (Light Logo)',
        format: 'PNG' as const,
        background: 'dark' as const,
        description: 'Light colored logo optimized for dark blue background usage',
      },
      {
        name: 'Secondary Logo - Orange',
        filename: 'For Orange@4x.png',
        variant: 'For Orange Backgrounds',
        format: 'PNG' as const,
        background: 'gradient' as const,
        description: 'Optimized for orange background usage',
      },
      {
        name: 'Secondary Logo - For White BG',
        filename: 'For White@4x.png',
        variant: 'For White Backgrounds',
        format: 'PNG' as const,
        background: 'light' as const,
        description: 'Dark colored logo optimized for white background usage',
      },
    ],
  },
};

export const brandAssets = {
  logos: [
    {
      name: 'Primary Logo (Blue)',
      file: 'sabpaisa-logo.svg',
      formats: ['SVG', 'PNG'],
      sizes: ['512x512', '256x256', '128x128', '64x64'],
      usage: 'Use on light backgrounds (white, off-white, light gray)',
    },
    {
      name: 'Logo (White)',
      file: 'sabpaisa-logo-white.svg',
      formats: ['SVG', 'PNG'],
      sizes: ['512x512', '256x256', '128x128', '64x64'],
      usage: 'Use on dark backgrounds (navy, dark gray, black)',
    },
    {
      name: 'Icon Only (Blue)',
      file: 'sabpaisa-icon.svg',
      formats: ['SVG', 'PNG'],
      sizes: ['512x512', '256x256', '128x128', '64x64'],
      usage: 'For app icons, favicons, and small spaces',
    },
  ],
  colors: [
    {
      name: 'CSS Variables',
      file: 'sabpaisa-colors.css',
      description: 'Ready-to-use CSS custom properties for web projects',
    },
    {
      name: 'JSON Format',
      file: 'sabpaisa-colors.json',
      description: 'Structured color data for JavaScript/TypeScript projects',
    },
    {
      name: 'Sketch Palette',
      file: 'sabpaisa-colors.sketchpalette',
      description: 'Color palette for Sketch design tool',
    },
    {
      name: 'Figma Tokens',
      file: 'sabpaisa-colors-figma.json',
      description: 'Design tokens for Figma projects',
    },
  ],
  typography: [
    {
      name: 'Typography Specs (JSON)',
      file: 'sabpaisa-typography.json',
      description: 'Complete typography specifications including font families, sizes, and weights',
    },
    {
      name: 'Typography CSS',
      file: 'sabpaisa-typography.css',
      description: 'CSS utility classes for typography',
    },
    {
      name: 'Font Files',
      file: 'sabpaisa-fonts.zip',
      description: 'Neusharp Bold and Sofia Pro font files (TTF, WOFF, WOFF2)',
    },
  ],
  documentation: [
    {
      name: 'Brand Guidelines PDF',
      file: 'SabPaisa-Brand-Guidelines.pdf',
      description: 'Complete brand guidelines documentation',
      size: '~2MB',
    },
  ],
};
