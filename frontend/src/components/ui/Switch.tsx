import { Switch as HeadlessSwitch } from '@headlessui/react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  description,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: SwitchProps) {
  // Size classes
  const switchSizes = {
    sm: {
      container: 'h-5 w-9',
      button: 'h-4 w-4',
      translate: checked ? 'translate-x-4' : 'translate-x-0',
    },
    md: {
      container: 'h-6 w-11',
      button: 'h-5 w-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0',
    },
  };

  // Variant colors
  const variantColors = {
    primary: checked
      ? 'bg-primary-600 dark:bg-primary-500'
      : 'bg-gray-300 dark:bg-gray-600',
    secondary: checked
      ? 'bg-secondary-600 dark:bg-secondary-500'
      : 'bg-gray-300 dark:bg-gray-600',
  };

  const labelSizes = {
    sm: 'text-sm',
    md: 'text-base',
  };

  return (
    <HeadlessSwitch.Group>
      <div className={`flex items-center gap-3 ${className}`}>
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            relative inline-flex ${switchSizes[size].container} items-center rounded-full
            ${variantColors[variant]}
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            dark:focus:ring-offset-gray-900
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span
            className={`
              ${switchSizes[size].button}
              inline-block transform rounded-full bg-white shadow-lg ring-0
              transition duration-200 ease-in-out
              ${switchSizes[size].translate}
            `}
          />
        </HeadlessSwitch>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <HeadlessSwitch.Label
                className={`
                  ${labelSizes[size]} font-medium text-gray-900 dark:text-white
                  ${disabled ? 'opacity-50' : 'cursor-pointer'}
                `}
              >
                {label}
              </HeadlessSwitch.Label>
            )}
            {description && (
              <HeadlessSwitch.Description
                className={`text-xs text-gray-600 dark:text-gray-400 ${
                  disabled ? 'opacity-50' : ''
                }`}
              >
                {description}
              </HeadlessSwitch.Description>
            )}
          </div>
        )}
      </div>
    </HeadlessSwitch.Group>
  );
}
