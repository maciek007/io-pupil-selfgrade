import { reset, type FormStore } from '@modular-forms/react';
import { ActionButton } from './ActionButton';

type FormHeaderProps = {
  of: FormStore<any, any>;
  heading: string;
  handleFormImport: () => void;
};

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export function FormHeader({ of: form, heading, handleFormImport }: FormHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 lg:px-10">
      <h1 className="text-2xl text-grey-200 dark:text-grey-200 md:text-3xl lg:text-4xl mr-4">
        {heading}
      </h1>
        <div className="hidden lg:flex lg:space-x-8">
            <ActionButton
                variant="secondary"
                label="Reset"
                type="button"
                onClick={() => reset(form)}
            />
            <ActionButton
                variant="secondary"
                label="Importuj"
                type="button"
                onClick={handleFormImport}
                />
            <ActionButton variant="primary" label="Prześlij" type="submit"/>
        </div>
    </header>
  );
}
