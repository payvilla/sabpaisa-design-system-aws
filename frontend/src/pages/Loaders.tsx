import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';

// Separate component for Circular Progress to avoid hooks issues
function CircularProgressPreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-secondary-600 via-primary-600 to-primary-700 rounded-2xl overflow-hidden flex items-center justify-center">
      <div className="relative">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-12 w-auto mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="text-white text-2xl font-bold"
            key={progress}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {progress}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const loaders = [
  {
    id: 'spinner',
    name: 'Snake Spinner Loader',
    description: 'Snake game-inspired spinner with segmented dots following each other',
    useCase: 'Perfect for button loading states, page transitions, and async operations',
    component: () => {
      const segments = 12;
      const radius = 28;
      return (
        <div className="relative w-16 h-16">
          {Array.from({ length: segments }).map((_, i) => {
            const delay = (i * 0.08);
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-600"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-4px',
                  marginTop: '-4px',
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay,
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                  },
                }}
                transformTemplate={({ rotate }) =>
                  `rotate(${rotate}) translateX(${radius}px)`
                }
              />
            );
          })}
        </div>
      );
    },
    code: `import { motion } from 'framer-motion';

export default function SnakeSpinner({ size = 64, color = '#006CED', segments = 12 }) {
  const radius = size * 0.44;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {Array.from({ length: segments }).map((_, i) => {
        const delay = (i * 0.08);
        const dotSize = size * 0.125;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              left: '50%',
              top: '50%',
              marginLeft: -dotSize / 2,
              marginTop: -dotSize / 2,
              background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
            }}
            transformTemplate={({ rotate }) =>
              \`rotate(\${rotate}) translateX(\${radius}px)\`
            }
          />
        );
      })}
    </div>
  );
}`,
    props: [
      { name: 'size', type: 'number', default: '64', description: 'Size of the loader in pixels' },
      { name: 'color', type: 'string', default: '#006CED', description: 'Color of the snake segments' },
      { name: 'segments', type: 'number', default: '12', description: 'Number of snake segments' },
    ],
  },
  {
    id: 'dots',
    name: 'Bouncing Dots',
    description: 'Three dots bouncing in sequence for a playful loading effect',
    useCase: 'Ideal for message sending, chat applications, and content loading',
    component: () => (
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function BouncingDots({ color = '#006CED', dotSize = 16 }) {
  return (
    <div className="flex gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}`,
    props: [
      { name: 'color', type: 'string', default: '#006CED', description: 'Color of the dots' },
      { name: 'dotSize', type: 'number', default: '16', description: 'Size of each dot in pixels' },
    ],
  },
  {
    id: 'pulse',
    name: 'Pulse Loader',
    description: 'Expanding and fading pulse effect for subtle loading states',
    useCase: 'Great for live data updates, real-time notifications, and background processes',
    component: () => (
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function PulseLoader({ size = 64, color = '#FF8800' }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: \`linear-gradient(to bottom right, \${color}, \${color}DD)\`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}`,
    props: [
      { name: 'size', type: 'number', default: '64', description: 'Size of the pulse effect' },
      { name: 'color', type: 'string', default: '#FF8800', description: 'Color of the pulse' },
    ],
  },
  {
    id: 'progress-ring',
    name: 'Progress Ring',
    description: 'Circular progress indicator with smooth animation',
    useCase: 'Perfect for determinate loading, file uploads, and progress tracking',
    component: () => (
      <div className="relative w-16 h-16">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            className="stroke-accent-500"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function ProgressRing({ size = 64, color = '#10B981', strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}`,
    props: [
      { name: 'size', type: 'number', default: '64', description: 'Size of the ring' },
      { name: 'color', type: 'string', default: '#10B981', description: 'Stroke color' },
      { name: 'strokeWidth', type: 'number', default: '4', description: 'Width of the ring stroke' },
    ],
  },
  {
    id: 'bars',
    name: 'Animated Bars',
    description: 'Multiple bars animating in sequence for dynamic loading',
    useCase: 'Excellent for data processing, analytics loading, and dashboard updates',
    component: () => (
      <div className="flex items-end gap-2 h-16">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-3 bg-gradient-to-t from-primary-600 to-primary-400 rounded-full"
            animate={{ height: ['40%', '100%', '40%'] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function AnimatedBars({ barCount = 5, color = '#006CED', height = 64 }) {
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-full"
          style={{
            background: \`linear-gradient(to top, \${color}, \${color}AA)\`,
          }}
          animate={{ height: ['40%', '100%', '40%'] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}`,
    props: [
      { name: 'barCount', type: 'number', default: '5', description: 'Number of bars' },
      { name: 'color', type: 'string', default: '#006CED', description: 'Color of the bars' },
      { name: 'height', type: 'number', default: '64', description: 'Container height' },
    ],
  },
  {
    id: 'brand',
    name: 'SabPaisa Brand Loader',
    description: 'Custom branded loader with SabPaisa color palette',
    useCase: 'Brand-specific loader for SabPaisa applications and payment flows',
    component: () => (
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#006CED',
            borderRightColor: '#FF8800',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle Ring */}
        <motion.div
          className="absolute inset-2 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#FF8800',
            borderBottomColor: '#006CED',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Pulse */}
        <motion.div
          className="absolute inset-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #006CED, #FF8800)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function SabPaisaLoader({ size = 80 }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent rounded-full"
        style={{
          borderTopColor: '#006CED',
          borderRightColor: '#FF8800',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle Ring */}
      <motion.div
        className="absolute border-4 border-transparent rounded-full"
        style={{
          inset: size * 0.1,
          borderTopColor: '#FF8800',
          borderBottomColor: '#006CED',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: size * 0.3,
          background: 'linear-gradient(135deg, #006CED, #FF8800)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}`,
    props: [
      { name: 'size', type: 'number', default: '80', description: 'Size of the loader' },
    ],
  },
];

const splashScreens = [
  {
    id: 'fade-zoom',
    name: 'Fade & Zoom',
    description: 'Elegant fade-in with zoom effect and gradient backdrop',
    useCase: 'Perfect for app launches and initial loading screens',
    component: () => (
      <div className="relative w-full h-64 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-2xl overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-16 w-auto mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            className="h-1 bg-white/30 rounded-full mx-auto max-w-[200px]"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function FadeZoomSplash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt="SabPaisa"
          className="h-24 w-auto mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
          className="h-1 bg-white/30 rounded-full mx-auto max-w-xs"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: 'particles',
    name: 'Particle Burst',
    description: 'Logo appears with particle burst effect and glow',
    useCase: 'Dynamic splash for fintech apps and payment platforms',
    component: () => (
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative"
        >
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-16 w-auto relative z-10"
          />
          <motion.div
            className="absolute inset-0 bg-primary-500 blur-3xl opacity-50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-secondary-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 60,
                  y: Math.sin((angle * Math.PI) / 180) * 60,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </motion.div>
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function ParticleBurstSplash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="relative"
      >
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt="SabPaisa"
          className="h-24 w-auto relative z-10"
        />
        <motion.div
          className="absolute inset-0 bg-primary-500 blur-3xl opacity-50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-secondary-400 rounded-full"
              style={{ left: '50%', top: '50%' }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * 80,
                y: Math.sin((angle * Math.PI) / 180) * 80,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: 'slide-reveal',
    name: 'Slide Reveal',
    description: 'Logo slides in with layered reveal animation',
    useCase: 'Modern splash for web and mobile applications',
    component: () => (
      <div className="relative w-full h-64 bg-gradient-to-br from-accent-600 via-accent-500 to-primary-600 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="/brand/logos/Asset 2.svg"
              alt="SabPaisa"
              className="h-16 w-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function SlideRevealSplash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-accent-600 via-accent-500 to-primary-600 flex items-center justify-center">
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-24 w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="absolute bottom-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}`,
  },
  {
    id: 'circular-progress',
    name: 'Circular Progress',
    description: 'Logo with circular progress indicator and percentage',
    useCase: 'Ideal for asset loading and initialization screens',
    component: () => <CircularProgressPreview />,
    code: `import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CircularProgressSplash() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-secondary-600 via-primary-600 to-primary-700 flex items-center justify-center">
      <div className="relative">
        <svg className="w-64 h-64 transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="white"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: progress / 100 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-16 w-auto mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-white text-3xl font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'wave-morph',
    name: 'Wave Morph',
    description: 'Morphing wave effect with floating logo',
    useCase: 'Creative splash for modern fintech applications',
    component: () => (
      <div className="relative w-full h-64 bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600 rounded-2xl overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-16 w-auto relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
            style={{
              background: `linear-gradient(to top, rgba(255,255,255,${0.3 - i * 0.1}), transparent)`,
            }}
            animate={{
              y: [0, -20, 0],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function WaveMorphSplash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt="SabPaisa"
          className="h-24 w-auto relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
          style={{
            background: \`linear-gradient(to top, rgba(255,255,255,\${0.3 - i * 0.1}), transparent)\`,
          }}
          animate={{
            y: [0, -30, 0],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}`,
  },
  {
    id: 'glitch-neon',
    name: 'Glitch Neon',
    description: 'Futuristic glitch effect with neon glow',
    useCase: 'Tech-forward splash for cutting-edge fintech products',
    component: () => (
      <div className="relative w-full h-64 bg-gray-950 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative">
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa"
            className="h-16 w-auto relative z-10"
            animate={{
              filter: [
                'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))',
                'drop-shadow(0 0 20px rgba(255, 136, 0, 0.8))',
                'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/brand/logos/Asset 2.svg"
            alt=""
            className="h-16 w-auto absolute top-0 left-0 z-0 opacity-70"
            style={{ filter: 'hue-rotate(180deg)' }}
            animate={{
              x: [-2, 2, -2],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 via-accent-500/30 to-secondary-500/30 blur-xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="absolute bottom-8 left-0 right-0">
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto"
            initial={{ width: '0%' }}
            animate={{ width: '80%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>
      </div>
    ),
    code: `import { motion } from 'framer-motion';

export default function GlitchNeonSplash() {
  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="relative">
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt="SabPaisa"
          className="h-24 w-auto relative z-10"
          animate={{
            filter: [
              'drop-shadow(0 0 20px rgba(59, 130, 246, 1))',
              'drop-shadow(0 0 40px rgba(255, 136, 0, 1))',
              'drop-shadow(0 0 20px rgba(59, 130, 246, 1))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/brand/logos/Asset 2.svg"
          alt=""
          className="h-24 w-auto absolute top-0 left-0 z-0 opacity-70"
          style={{ filter: 'hue-rotate(180deg)' }}
          animate={{
            x: [-3, 3, -3],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -inset-8 bg-gradient-to-r from-primary-500/40 via-accent-500/40 to-secondary-500/40 blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute bottom-16 left-0 right-0">
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto"
          initial={{ width: '0%' }}
          animate={{ width: '90%' }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
}`,
  },
];

export default function Loaders() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'loaders' | 'splash'>('loaders');

  const copyToClipboard = (code: string, loaderId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(loaderId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4"
              >
                {viewMode === 'loaders' ? 'Loading Animations' : 'Splash Screens'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 max-w-3xl"
              >
                {viewMode === 'loaders'
                  ? 'Production-ready loading animations powered by Framer Motion. Copy, paste, and enhance your user experience with smooth, performant loaders.'
                  : 'Futuristic splash screens with SabPaisa branding. Perfect for app launches and onboarding experiences.'}
              </motion.p>
            </div>

            {/* Toggle Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/20"
            >
              <button
                onClick={() => setViewMode('loaders')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  viewMode === 'loaders'
                    ? 'bg-white text-primary-600 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Loader2 className="w-4 h-4" />
                Loaders
              </button>
              <button
                onClick={() => setViewMode('splash')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  viewMode === 'splash'
                    ? 'bg-white text-primary-600 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Splash
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Grid - Loaders or Splash Screens */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {(viewMode === 'loaders' ? loaders : splashScreens).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm">
                      <span className="font-medium">Use Case:</span>
                      <span>{item.useCase}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {/* Live Preview */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Live Preview
                  </h4>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-12 flex items-center justify-center min-h-[200px] border border-gray-200 dark:border-gray-700">
                    {item.component()}
                  </div>

                  {/* Props Table - Only for loaders */}
                  {viewMode === 'loaders' && 'props' in item && (item as any).props && Array.isArray((item as any).props) && (item as any).props.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                        Props
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                                Prop
                              </th>
                              <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                                Type
                              </th>
                              <th className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                                Default
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {((item as any).props as any[]).map((prop: any, i: number) => (
                              <tr
                                key={prop.name}
                                className={i !== ((item as any).props as any[]).length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}
                              >
                                <td className="px-4 py-3">
                                  <code className="text-primary-600 dark:text-primary-400 font-mono text-xs">
                                    {prop.name}
                                  </code>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  <code className="font-mono text-xs">{prop.type}</code>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  <code className="font-mono text-xs">{prop.default}</code>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Code Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Code
                    </h4>
                    <button
                      onClick={() => copyToClipboard(item.code, item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {copiedCode === item.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                      <span className="text-xs text-gray-400 font-mono">
                        {item.name.replace(/\s+/g, '')}.tsx
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm">
                      <code className="text-gray-100 font-mono text-xs leading-relaxed">
                        {item.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Usage Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Install Framer Motion</h3>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-sm text-primary-400 font-mono">npm install framer-motion</code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Copy the Loader Component</h3>
            <p className="text-sm">
              Click the "Copy Code" button above any loader and paste it into your project.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Use in Your Components</h3>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-sm text-secondary-400 font-mono">
                {'<SpinnerLoader size={48} color="#006CED" />'}
              </code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">4. Customize as Needed</h3>
            <p className="text-sm">
              Adjust props, colors, and animations to match your specific use case and brand guidelines.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Best Practices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                ✓
              </div>
              Do
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Use loaders for operations taking longer than 300ms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Match loader colors to your brand palette</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Provide context with loading text when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Use progress rings for determinate operations</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">
                ✗
              </div>
              Don't
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Show loaders for instant operations (&lt;300ms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Use multiple different loaders in the same view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Make loaders too large or distracting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Forget to remove loaders after completion</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
