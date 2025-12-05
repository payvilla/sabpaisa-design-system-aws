import { NavLink } from 'react-router-dom';
import {
  Palette,
  Type,
  Box,
  Layers,
  Ruler,
  Workflow,
  Home,
  BookOpen,
  BookMarked,
  Lightbulb,
  Code2,
  Paintbrush,
  Smartphone,
  Wrench,
  BookText,
  Loader2,
  LayoutGrid,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Brand Guidelines', href: '/brand-guidelines', icon: BookOpen },
  { name: 'Colors', href: '/colors', icon: Palette },
  { name: 'Typography', href: '/typography', icon: Type },
  { name: 'Components', href: '/components', icon: Box },
  { name: 'Spacing', href: '/spacing', icon: Ruler },
  { name: 'Patterns', href: '/patterns', icon: Workflow },
  { name: 'Icons', href: '/icons', icon: Layers },
  { name: 'Loaders', href: '/loaders', icon: Loader2 },
  { name: 'Templates', href: '/templates', icon: LayoutGrid },
  { name: 'Examples', href: '/examples', icon: Lightbulb },
  { name: 'Playground', href: '/playground', icon: Code2 },
  { name: 'Utilities & Hooks', href: '/utilities', icon: Wrench },
  { name: 'Documentation', href: '/documentation', icon: BookText },
  { name: 'Theme Customizer', href: '/theme-customizer', icon: Paintbrush },
  { name: 'Device Preview', href: '/device-preview', icon: Smartphone },
  { name: 'Integration Guide', href: '/integration-guide', icon: BookMarked },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800
                      border-r border-gray-700 overflow-y-auto z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/brand/logos/Asset 2.svg"
            alt="SabPaisa Logo"
            className="h-8 w-auto"
          />
          <p className="text-gray-400 tracking-wide text-center" style={{ fontSize: '11px' }}>
            Product Design Engine
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
               ${
                 isActive
                   ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                   : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
               }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700 bg-gray-900/50">
        <div className="text-xs text-gray-400 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-300">Version 2.0.0</span>
          </div>
          <div className="pt-2 border-t border-gray-700">
            <p className="text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} SabPaisa
            </p>
            <p className="text-gray-600 text-[10px] mt-1">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
