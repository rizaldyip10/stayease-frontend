import { Field, FieldProps, useFormikContext, ErrorMessage } from 'formik';
import { useState } from 'react';

const RatingInput = () => {
    const { setFieldValue } = useFormikContext();
    const [hover, setHover] = useState<number>(0);

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='w-full flex gap-2'>
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                        <label key={index}>
                            <Field name="rating">
                                {({ field }: FieldProps) => (
                                    <>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            {...field}
                                            value={currentRating}
                                            checked={currentRating === field.value}
                                            onChange={() => setFieldValue('rating', currentRating)}
                                        />
                                        <span
                                            className='cursor-pointer text-2xl'
                                            style={{
                                                color: currentRating <= (hover || field.value) ? "#ffc107" : "#e4e5e9",
                                            }}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={() => setFieldValue('rating', currentRating)}
                                        >
                                            &#9733;
                                        </span>
                                    </>
                                )}
                            </Field>
                        </label>
                    );
                })}
            </div>
            <ErrorMessage name="rating" component="div" className='text-error text-sm' />
        </div>
    );
};

export default RatingInput;