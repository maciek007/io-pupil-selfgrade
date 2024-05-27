import {
    useForm,
    remove,
    insert,
} from '@modular-forms/react';
import { FormHeader, FormFooter, TextInput, ColorButton, InputLabel, InputError, TextAreaInput } from './formComponents';
import { maxLength, minLength } from '@modular-forms/react';

type FormCreation = {
    longQuestions: {
        label: string;
        questions: string[];
    };

    shortQuestions: {
        label: string;
        questions: string[];
    };

    multipleChoiceQuestions: {
        label: string;
        questions: string[];
    }[];

    singleChoiceQuestions: {
        label: string;
        questions: string[];
    }[];

    checkboxQuestions: {
        label: string;
        questions: string[];
    };
};

const initialValues = {
    longQuestions: {
        label: 'Długie pytania',
        questions: [''],
    },

    shortQuestions: {
        label: 'Krótkie pytania',
        questions: [],
    },

    multipleChoiceQuestions: [{
        label: 'Pytania wielokrotnego wyboru',
        questions: [],
    }],

    singleChoiceQuestions: [{
        label: 'Pytania jednokrotnego wyboru',
        questions: [],
    }],

    checkboxQuestions: {
        label: 'Pytania tak/nie',
        questions: [],
    },
}

//TODO: ADD VALIDATION

const MAX_QUESTIONS = 2;
const MIN_REQUIRED_QUESTIONS = 1;

export default function FormCreation() {
    // Create nested form
    const [FormCreation, { Form, Field, FieldArray }] = useForm<FormCreation>({
        initialValues,
    });

    return (
        <Form
            className="space-y-12 md:space-y-14 lg:space-y-16"
            onSubmit={(values) => console.log(values)}
        >
            <FormHeader of={FormCreation} heading="Tworzenie formularza" />

            <div className="space-y-5 px-8 lg:px-10">
                {/* Long Questions - Required */}
                <div className='flex-1 space-y-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`longQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    label={field.value as string}
                                    required
                                />
                            )}
                        </Field>
                    </div>
                    <div>
                        <FieldArray name={`longQuestions.questions`}
                            validate={[maxLength(MAX_QUESTIONS, `Maksymalna liczba pytań to ${MAX_QUESTIONS}`),
                            minLength(MIN_REQUIRED_QUESTIONS, `Minimalna liczba pytań to ${MIN_REQUIRED_QUESTIONS}`)
                            ]}
                        >
                            {(fieldArray) => (
                                <div className="space-y-5 px-6">
                                    {fieldArray.items.value.map((option, index) => (
                                        <div key={option} className="flex space-x-5">
                                            <Field name={`${fieldArray.name}.${index}`}>
                                                {(field, props) => (
                                                    <TextAreaInput
                                                        {...props}
                                                        className="flex-1 !p-0"
                                                        value={field.value}
                                                        error={field.error}
                                                        placeholder="Wprowadź pytanie"
                                                    />
                                                )}
                                            </Field>

                                            <ColorButton
                                                color="red"
                                                label="Delete"
                                                width="auto"
                                                onClick={() =>
                                                    remove(FormCreation, fieldArray.name, {
                                                        at: index,
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}

                                    <div className="flex flex-wrap gap-4">
                                        <ColorButton
                                            color="green"
                                            label="Dodaj pytanie"
                                            onClick={() =>
                                                insert(FormCreation, fieldArray.name, {
                                                    value: ''
                                                    ,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </div>

                {/* Short Questions */}
                <div className='flex-1 space-y-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`shortQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    label={field.value as string}
                                />
                            )}
                        </Field>
                    </div>
                    <div>
                        <FieldArray name={`shortQuestions.questions`}>
                            {(fieldArray) => (
                                <div className="space-y-5 px-6">
                                    {fieldArray.items.value.map((option, index) => (
                                        <div key={option} className="flex space-x-5">
                                            <Field name={`${fieldArray.name}.${index}`}>
                                                {(field, props) => (
                                                    <TextInput
                                                        {...props}
                                                        className="flex-1 !p-0"
                                                        value={field.value}
                                                        error={field.error}
                                                        type="text"
                                                        placeholder="Wprowadź pytanie"
                                                    />
                                                )}
                                            </Field>

                                            <ColorButton
                                                color="red"
                                                label="Delete"
                                                width="auto"
                                                onClick={() =>
                                                    remove(FormCreation, fieldArray.name, {
                                                        at: index,
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}

                                    <div className="flex flex-wrap gap-4">
                                        <ColorButton
                                            color="green"
                                            label="Dodaj pytanie"
                                            onClick={() =>
                                                insert(FormCreation, fieldArray.name, {
                                                    value: ''
                                                    ,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className='flex-1 space-y-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`checkboxQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    label={field.value as string}
                                />
                            )}
                        </Field>
                    </div>
                    <div>
                        <FieldArray name={`checkboxQuestions.questions`}>
                            {(fieldArray) => (
                                <div className="space-y-5 px-6">
                                    {fieldArray.items.value.map((option, index) => (
                                        <div key={option} className="flex space-x-5">
                                            <Field name={`${fieldArray.name}.${index}`}>
                                                {(field, props) => (
                                                    <TextInput
                                                        {...props}
                                                        className="flex-1 !p-0"
                                                        value={field.value}
                                                        error={field.error}
                                                        type="text"
                                                        placeholder="Wprowadź pytanie"
                                                    />
                                                )}
                                            </Field>

                                            <ColorButton
                                                color="red"
                                                label="Delete"
                                                width="auto"
                                                onClick={() =>
                                                    remove(FormCreation, fieldArray.name, {
                                                        at: index,
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}

                                    <div className="flex flex-wrap gap-4">
                                        <ColorButton
                                            color="green"
                                            label="Dodaj pytanie"
                                            onClick={() =>
                                                insert(FormCreation, fieldArray.name, {
                                                    value: ''
                                                    ,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                </div>
            </div>

            <FormFooter of={FormCreation} />
        </Form >
    );
}