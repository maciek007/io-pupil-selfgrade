import { reset, type FormStore } from '@modular-forms/react';
import { ActionButton } from './ActionButton';

type FormHeaderProps = {
  of: FormStore<any, any>;
  heading: string;
  handleFormImport: (event:Event) => void;
  handleFormExport: () => void;
};

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export function FormHeader({ of: form, heading, handleFormImport, handleFormExport }: FormHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 lg:px-10">
      <h1 className="text-2xl text-grey-200 dark:text-grey-200 md:text-3xl lg:text-4xl mr-4">
        {heading}
      </h1>
        <div className="hidden lg:flex lg:space-x-8">
            <ActionButton
                variant="primary"
                label="Reset"
                type="button"
                onClick={() => reset(form)}
            />
            <input
                type="file"
                accept=".json"
                onChange={handleFormImport}
                name="import"
                id="import"
                hidden
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
            <ActionButton variant="primary" label="Prześlij" type="submit"/>
        </div>
    </header>
  );
}
