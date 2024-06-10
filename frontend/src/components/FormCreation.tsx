import {
    useForm,
    remove,
    insert,
} from '@modular-forms/react';
import { FormHeader, FormFooter, TextInput, ColorButton, InputLabel, InputError, TextAreaInput } from './formComponents';
import { maxLength, minLength } from '@modular-forms/react';
import { createForm } from "../services/FormService.tsx";
import { useNavigate } from "react-router-dom";

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
            <FormHeader of={FormCreation} heading="Tworzenie formularza" />

            <div className="space-y-5">
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

                <div className='flex-1 p-1 space-y-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 py-6  dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <FieldArray name="multipleChoiceQuestions">
                        {(fieldArray) => (
                            <>
                                {fieldArray.items.value.map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex-1 space-y-5 rounded-2xl border-2 border-slate-700 bg-slate-800/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700"
                                    >
                                        <div className="flex space-x-5 px-6">
                                            <Field name={`${fieldArray.name}.${index}.label`}>
                                                {(field, props) => (
                                                    <InputLabel
                                                        {...props}
                                                        label={field.value as string}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <FieldArray name={`${fieldArray.name}.${index}.questions`}>
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
                                                value: { label: 'Pytanie wielokrotnego wyboru', questions: [] },
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

                <div className='flex-1 p-1 space-y-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 py-6  dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700'>
                    <FieldArray name="singleChoiceQuestions">
                        {(fieldArray) => (
                            <>
                                {fieldArray.items.value.map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex-1 space-y-5 rounded-2xl border-2 border-slate-700 bg-slate-800/25 py-6 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700"
                                    >
                                        <div className="flex space-x-5 px-6">
                                            <Field name={`${fieldArray.name}.${index}.label`}>
                                                {(field, props) => (
                                                    <InputLabel
                                                        {...props}
                                                        label={field.value as string}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <FieldArray name={`${fieldArray.name}.${index}.questions`}>
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
                                                value: { label: 'Pytanie jednokrotneg wyboru', questions: [] },
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


            <FormFooter of={FormCreation} />
        </Form >
    );
}