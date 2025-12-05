import { Tab } from '@headlessui/react';
import { ReactNode } from 'react';

export interface TabItem {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  variant?: 'line' | 'pill' | 'enclosed';
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

export default function Tabs({
  tabs,
  variant = 'line',
  defaultIndex = 0,
  onChange,
  className = '',
}: TabsProps) {
  // Variant styles
  const variantStyles = {
    line: {
      list: 'border-b border-gray-200 dark:border-gray-700',
      tab: ({ selected }: { selected: boolean }) =>
        `px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
          selected
            ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`,
      panel: 'py-4',
    },
    pill: {
      list: 'flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
      tab: ({ selected }: { selected: boolean }) =>
        `px-4 py-2 font-medium text-sm rounded-lg transition-all ${
          selected
            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`,
      panel: 'py-4',
    },
    enclosed: {
      list: 'border-b border-gray-200 dark:border-gray-700',
      tab: ({ selected }: { selected: boolean }) =>
        `px-4 py-2 font-medium text-sm transition-all border border-transparent rounded-t-lg -mb-px ${
          selected
            ? 'border-gray-200 dark:border-gray-700 border-b-white dark:border-b-gray-900 bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
        }`,
      panel: 'py-4',
    },
  };

  return (
    <Tab.Group defaultIndex={defaultIndex} onChange={onChange}>
      <div className={className}>
        <Tab.List className={`flex ${variantStyles[variant].list}`}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              disabled={tab.disabled}
              className={({ selected }) =>
                `${variantStyles[variant].tab({ selected })}
                 ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`
              }
            >
              <span className="flex items-center gap-2">
                {tab.icon && <span className="w-4 h-4 flex-shrink-0">{tab.icon}</span>}
                {tab.label}
              </span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index} className={variantStyles[variant].panel}>
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
