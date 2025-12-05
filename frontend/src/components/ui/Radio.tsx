import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  description?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      variant = 'primary',
      size = 'md',
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
        radio: 'w-4 h-4',
        dot: 'w-2 h-2',
        label: 'text-sm',
        description: 'text-xs',
      },
      md: {
        radio: 'w-5 h-5',
        dot: 'w-2.5 h-2.5',
        label: 'text-base',
        description: 'text-sm',
      },
    };

    // Variant colors
    const variantColors = {
      primary: {
        checked: 'border-primary-600 dark:border-primary-500',
        dot: 'bg-primary-600 dark:bg-primary-500',
        unchecked: 'border-gray-300 dark:border-gray-600',
        focus: 'focus:ring-primary-500',
      },
      secondary: {
        checked: 'border-secondary-600 dark:border-secondary-500',
        dot: 'bg-secondary-600 dark:bg-secondary-500',
        unchecked: 'border-gray-300 dark:border-gray-600',
        focus: 'focus:ring-secondary-500',
      },
    };

    const radioColor = checked
      ? variantColors[variant].checked
      : variantColors[variant].unchecked;

    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            checked={checked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={`
              ${sizes[size].radio}
              border-2 rounded-full transition-colors
              ${radioColor}
              ${variantColors[variant].focus}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              flex items-center justify-center
            `}
            onClick={() => !disabled && props.onChange?.({ target: { checked: true } } as any)}
          >
            {checked && (
              <div
                className={`${sizes[size].dot} ${variantColors[variant].dot} rounded-full transition-transform`}
              />
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
                onClick={() => !disabled && props.onChange?.({ target: { checked: true } } as any)}
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

Radio.displayName = 'Radio';

export default Radio;
