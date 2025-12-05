import { Check, Minus } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  description?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  indeterminate?: boolean;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      variant = 'primary',
      size = 'md',
      indeterminate = false,
      error,
      disabled,
      checked,
      className = '',
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizes = {
      sm: {
        checkbox: 'w-4 h-4',
        icon: 'w-3 h-3',
        label: 'text-sm',
        description: 'text-xs',
      },
      md: {
        checkbox: 'w-5 h-5',
        icon: 'w-4 h-4',
        label: 'text-base',
        description: 'text-sm',
      },
    };

    // Variant colors
    const variantColors = {
      primary: {
        checked: 'bg-primary-600 border-primary-600 dark:bg-primary-500 dark:border-primary-500',
        unchecked: 'border-gray-300 dark:border-gray-600',
        focus: 'focus:ring-primary-500',
      },
      secondary: {
        checked: 'bg-secondary-600 border-secondary-600 dark:bg-secondary-500 dark:border-secondary-500',
        unchecked: 'border-gray-300 dark:border-gray-600',
        focus: 'focus:ring-secondary-500',
      },
    };

    const isChecked = indeterminate ? true : checked;
    const checkboxColor = isChecked
      ? variantColors[variant].checked
      : variantColors[variant].unchecked;

    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={`
              ${sizes[size].checkbox}
              border-2 rounded transition-colors
              ${checkboxColor}
              ${variantColors[variant].focus}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              flex items-center justify-center
            `}
            onClick={() => !disabled && props.onChange?.({ target: { checked: !isChecked } } as any)}
          >
            {indeterminate ? (
              <Minus className={`${sizes[size].icon} text-white`} strokeWidth={3} />
            ) : (
              isChecked && <Check className={`${sizes[size].icon} text-white`} strokeWidth={3} />
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                className={`
                  ${sizes[size].label} font-medium text-gray-900 dark:text-white
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onClick={() => !disabled && props.onChange?.({ target: { checked: !isChecked } } as any)}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={`${sizes[size].description} text-gray-600 dark:text-gray-400 ${
                  disabled ? 'opacity-50' : ''
                }`}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
