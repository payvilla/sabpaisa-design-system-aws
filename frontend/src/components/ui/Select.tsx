import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  error,
  helperText,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  // Size classes
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  // Variant classes
  const variants = {
    default: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
    filled: 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent',
    outline: 'bg-transparent border-2 border-gray-400 dark:border-gray-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={`
              relative w-full ${sizes[size]} ${variants[variant]}
              rounded-lg shadow-sm cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              text-left transition-colors
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 dark:border-red-400' : ''}
            `}
          >
            <span className="flex items-center gap-2">
              {selectedOption?.icon && <span className="flex-shrink-0">{selectedOption.icon}</span>}
              <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {selectedOption?.label || placeholder}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
                absolute z-10 mt-2 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800
                py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                max-h-60 text-base
              "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors
                    ${active ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-200' : 'text-gray-900 dark:text-white'}
                    ${selected ? 'font-medium' : 'font-normal'}
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2">
                        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {option.label}
                        </span>
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
