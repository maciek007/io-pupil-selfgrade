import {
    useForm,
    remove,
    insert,
    required,
    minLength,
    maxLength,
} from '@modular-forms/react';
import {createForm, handleFormImport} from "../services/FormService.tsx";
import {FormHeader, FormFooter, TextInput, ColorButton, InputLabel, TextAreaInput} from './formComponents';
import {useNavigate} from 'react-router-dom';


type FormCreation = {
    longQuestions: {
        label: string;
        questions: string[];
    };

    shortQuestions: {
        label: string;
        questions: string[];
    };

    multipleSelectionQuestions: {
        label: string;
        questions: {
            question: string;
            options: string[];
        }[]
    };

    singleSelectionQuestions: {
        label: string;
        questions: {
            question: string;
            options: string[];
        }[]
    };

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

    multipleSelectionQuestions: {
        label: 'Pytanie wielokrotnego wyboru',
        questions: [{
            question: '',
            options: ['']
        }]
    },

    singleSelectionQuestions: {
        label: 'Pytanie jednokrotnego wyboru',
        questions: [{
            question: '',
            options: ['']
        }]
    },

    checkboxQuestions: {
        label: 'Pytania tak/nie',
        questions: [],
    },
}

//TODO: ADD VALIDATION

const MIN_REQUIRED_QUESTIONS = 1;
const MAX_QUESTIONS = 3;

export default function FormCreation() {
    // Create nested form
    const [FormCreation, {Form, Field, FieldArray}] = useForm<FormCreation>({
        initialValues,
    });

    const navigate = useNavigate();

    const handleSubmit = (values: FormCreation) => {
        createForm(values).then(() => {
            navigate("/class");
        }).catch(() => {
            alert("Błąd przy tworzeniu formularza");
        });
    };

    return (
        <Form
            className="space-y-12 md:space-y-14 lg:space-y-16"
            onSubmit={(values) => handleSubmit(values)}
        >
            <FormHeader handleFormImport={handleFormImport} of={FormCreation} heading="Tworzenie formularza"/>

            <div className="space-y-5">
                {/* Long Questions - Required */}
                <div
                    className='flex-1 space-y-5 rounded-2xl border-2 border-slate-400 bg-slate-100/25 py-6 hover:border-slate-100 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`longQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    ref={null}
                                    label={field.value as unknown as string}
                                    required
                                />
                            )}
                        </Field>
                    </div>
                    <div>
                        <FieldArray name={`longQuestions.questions`}
                                    validate={[required('To pole jest wymagane'), minLength(MIN_REQUIRED_QUESTIONS, `Wymagane jest co najmniej ${MIN_REQUIRED_QUESTIONS} pytanie`), maxLength(MAX_QUESTIONS, `Maksymalna liczba pytań to ${MAX_QUESTIONS}`)]}
                        >
                            {(fieldArray) => (
                                <>
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
                                                    label="Usuń"
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
                                    {fieldArray.error && fieldArray.error.toString().length > 0 &&
                                        <div className="space-y-5 px-6 mt-4">
                                            <div
                                                className='flex-1 p-1 space-y-5 font-semibold text-slate-50 rounded-2xl border-2 border-red-400 bg-red-600/90 hover:border-red-200 py-6  dark:border-red-700 dark:bg-red-700/75 dark:hover:border-red-600'>
                                                {fieldArray.error}
                                            </div>
                                        </div>
                                    }
                                </>
                            )}
                        </FieldArray>
                    </div>
                </div>

                {/* Short Questions */}
                <div
                    className='flex-1 space-y-5 rounded-2xl border-2 border-slate-400 bg-slate-100/25 py-6 hover:border-slate-100 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`shortQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    ref={null}
                                    label={field.value as unknown as string}
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
                                                label="Usuń"
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

                {/* Multiselection */}

                <div
                    className='flex-1 p-1 space-y-5 rounded-2xl border-2 border-slate-400 bg-slate-100/25 py-6  dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <FieldArray name="multipleSelectionQuestions.questions">
                        {(fieldArray) => (
                            <>
                                {fieldArray.items.value.map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex-1 space-y-5 rounded-2xl border-2 border-slate-700 bg-slate-800/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700"
                                    >
                                        <div className="flex space-x-5 px-6">
                                            <Field name="multipleSelectionQuestions.label">
                                                {(field, props) => (
                                                    <InputLabel
                                                        {...props}
                                                        ref={null}
                                                        label={field.value as unknown as string}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <div className="space-y-5 px-6">
                                            <Field name={`${fieldArray.name}.${index}.question`}>
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
                                        </div>

                                        <FieldArray name={`${fieldArray.name}.${index}.options`}>
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
                                                                        placeholder="Wprowadź opcję"
                                                                    />
                                                                )}
                                                            </Field>

                                                            <ColorButton
                                                                color="red"
                                                                label="Usuń"
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
                                                            label="Dodaj opcję"
                                                            onClick={() =>
                                                                insert(FormCreation, fieldArray.name, {
                                                                    value: '',
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}


                                        </FieldArray>
                                    </div>
                                ))}

                                <div className="flex flex-wrap gap-4">
                                    <ColorButton
                                        color="green"
                                        label="Dodaj pytanie wielokrotnego wyboru"
                                        onClick={() =>
                                            insert(FormCreation, fieldArray.name, {
                                                value: {
                                                    question: '',
                                                    options: []
                                                },
                                            })
                                        }
                                    />

                                    <ColorButton
                                        color="red"
                                        label="Usuń pytanie wielokrotnego wyboru"
                                        width="auto"
                                        onClick={() =>
                                            remove(FormCreation, fieldArray.name, {
                                                // remove last item
                                                at: 0,
                                            })
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </FieldArray>
                </div>

                {/* Single selection */}

                <div
                    className='flex-1 p-1 space-y-5 rounded-2xl border-2 border-slate-400 bg-slate-100/25 py-6  dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <FieldArray name="singleSelectionQuestions.questions">
                        {(fieldArray) => (
                            <>
                                {fieldArray.items.value.map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex-1 space-y-5 rounded-2xl border-2 border-slate-700 bg-slate-800/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700"
                                    >
                                        <div className="flex space-x-5 px-6">
                                            <Field name='singleSelectionQuestions.label'>
                                                {(field, props) => (
                                                    <InputLabel
                                                        {...props}
                                                        ref={null}
                                                        label={field.value as unknown as string}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="space-y-5 px-6">
                                            <Field name={`${fieldArray.name}.${index}.question`}>
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
                                        </div>

                                        <FieldArray name={`${fieldArray.name}.${index}.options`}>
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
                                                                        placeholder="Wprowadź opcję"
                                                                    />
                                                                )}
                                                            </Field>

                                                            <ColorButton
                                                                color="red"
                                                                label="Usuń"
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
                                                            label="Dodaj opcję"
                                                            onClick={() =>
                                                                insert(FormCreation, fieldArray.name, {
                                                                    value: '',
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}


                                        </FieldArray>
                                    </div>
                                ))}

                                <div className="flex flex-wrap gap-4">
                                    <ColorButton
                                        color="green"
                                        label="Dodaj pytanie jednokrotneg wyboru"
                                        onClick={() =>
                                            insert(FormCreation, fieldArray.name, {
                                                value: {
                                                    question: '',
                                                    options: []
                                                },
                                            })
                                        }
                                    />

                                    <ColorButton
                                        color="red"
                                        label="Usuń pytanie jednokrotneg wyboru"
                                        width="auto"
                                        onClick={() =>
                                            remove(FormCreation, fieldArray.name, {
                                                // remove last item
                                                at: 0,
                                            })
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </FieldArray>
                </div>

                {/* Checkboxes */}
                <div
                    className='flex-1 space-y-5 rounded-2xl border-2 border-slate-400 bg-slate-100/25 py-6 hover:border-slate-100 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <div className="flex space-x-5 px-6">
                        <Field name={`checkboxQuestions.label`}>
                            {(field, props) => (
                                <InputLabel
                                    {...props}
                                    ref={null}
                                    label={field.value as unknown as string}
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
                                                label="Usuń"
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


            <FormFooter of={FormCreation}/>
        </Form>
    );
}