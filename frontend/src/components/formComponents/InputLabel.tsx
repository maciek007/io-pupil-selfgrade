import clsx from 'clsx';
import { LegacyRef } from 'react';

type InputLabelProps = {
  name: string;
  label?: string;
  required?: boolean;
  margin?: 'none';
  ref?: LegacyRef<HTMLLabelElement>
};

/**
 * Input label for a form field.
 */
export function InputLabel({ name, label, required, margin, ref }: InputLabelProps) {
  return (
    <>
      {label && (
        <label
          className={clsx(
            'inline-block font-medium md:text-lg lg:text-xl',
            !margin && 'mb-4 lg:mb-5'
          )}
          htmlFor={name}
          ref={ref}
        >
          {label}{' '}
          {required && (
            <span className="ml-1 text-red-600 dark:text-red-400">*</span>
          )}
        </label>
      )}
    </>
  );
}
