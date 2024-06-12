import { type FormStore, reset } from '@modular-forms/react';
import { ActionButton } from './ActionButton';

type FormFooterProps = {
  of: FormStore<any, any>;
  handleFormExport: () => void;
};

/**
 * Form footer with buttons to reset and submit the form.
 */
export function FormFooter({ of: form, handleFormExport }: FormFooterProps) {
  return (
      <footer className="flex space-x-6 px-8 md:space-x-8 lg:hidden">
          <ActionButton variant="primary" label="Submit" type="submit"/>
          <ActionButton
              variant="primary"
              label="Reset"
              type="button"
              onClick={() => reset(form)}
          />
          <label
              className="relative flex items-center justify-center rounded-2xl px-5 py-2.5 font-medium no-underline transition-colors md:text-lg lg:rounded-2xl lg:px-6 lg:py-3 lg:text-xl bg-sky-600 text-white hover:bg-sky-600/80 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-400/80 my-4"
              htmlFor="import">Importuj</label>
          <ActionButton
              variant="primary"
              label="Exportuj"
              type="button"
              onClick={handleFormExport}
          />
      </footer>
  );
}
