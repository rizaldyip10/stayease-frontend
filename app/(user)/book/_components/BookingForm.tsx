"use client";

import * as yup from "yup";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";

const BookingForm = () => {
    const bookingSchema = yup.object().shape({
        checkInDate: yup.date().required("Please enter valid check-in date"),
        checkOutDate: yup.date().required("Please enter valid check-out date"),
        totalGuest: yup.number().min(1, "There has to be a guest").required("Please enter guest number"),
        paymentMethod: yup.string().required("Please select payment method"),
    });

    const handleBooking = (value: FormikValues) => {
        console.log(value)
    };

    const initialValues: FormikValues = {
        checkInDate: null,
        checkOutDate: null,
        totalGuest: 1,
        paymentMethod: "ATM/Bank Transfer",
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <Formik
                initialValues={initialValues}
                validationSchema={bookingSchema}
                onSubmit={(value) => {
                    handleBooking(value);
                }}
            >
                {() => (
                    <Form className="w-full flex flex-col gap-2">
                        <div>
                            User Staying Data Form
                        </div>
                        <div>
                            Special Request Form
                        </div>
                        <div>
                            Payment Method Form
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-950 text-white"
                        >
                            Pay and Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;