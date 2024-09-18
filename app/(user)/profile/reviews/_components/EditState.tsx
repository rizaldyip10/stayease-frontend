"use client";

import * as yup from "yup";
import {FC} from "react";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";
import StarInput from "@/components/formik/StarInput";
import FormikInput from "@/components/formik/FormikInput";

interface EditStateProps {
    rating?: number;
    comment?: string;
}

const EditState: FC<EditStateProps> = ({ rating, comment }) => {
    const reviewSchema = yup.object().shape({
        rating: yup.number().min(1, "Unable to give rating below 1").max(5, "Unable to give rating above 5").required("Rating required"),
        comment: yup.string().min(3, "Min 3 characters").matches(whiteSpaceRegex, "Please enter valid review").required(),
    });

    const initialValue = {
        rating: rating || 0,
        comment: comment || "",
    }

    const handleEditReview = async (value: FormikValues) => {
        try {
            console.log(value)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik
            initialValues={initialValue}
            validationSchema={reviewSchema}
            onSubmit={async (value) => {
                await handleEditReview(value);
            }}
        >
            {
                () => (
                    <Form className="w-full grid grid-cols-1 gap-y-2">
                        <StarInput />
                        <FormikInput className="w-full" name="comment" label="How's your stay?" />
                        <Button
                            variant="link"
                            type="submit"
                            className="w-max p-0"
                        >
                            Submit
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
};

export default EditState;