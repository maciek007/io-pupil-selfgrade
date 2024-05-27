import clsx from 'clsx';
import { type DefaultButtonProps, UnstyledButton } from './UnstyledButton';

type ActionButtonProps = DefaultButtonProps & {
  variant: 'primary' | 'secondary';
  label: string;
};

/**
 * Button that is used for navigation, to confirm form entries or perform
 * individual actions.
 */
export function ActionButton({ label, variant, ...props }: ActionButtonProps) {
  return (
    <UnstyledButton
      className={clsx(
        'relative flex items-center justify-center rounded-2xl px-5 py-2.5 font-medium no-underline transition-colors md:text-lg lg:rounded-2xl lg:px-6 lg:py-3 lg:text-xl',
        variant === 'primary' &&
        'bg-sky-600 text-white hover:bg-sky-600/80 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-400/80',
        variant === 'secondary' &&
        'bg-green-600/30 text-green-600 hover:bg-green-600/40 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20'
      )}
      {...props}
    >
      {label}
    </UnstyledButton>
  );
}
