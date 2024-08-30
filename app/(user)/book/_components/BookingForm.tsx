"use client";

import * as yup from "yup";
import UserStayingDataForm from "@/app/(user)/book/_components/UserStayingDataForm";
import SpecialRequest from "@/app/(user)/book/_components/SpecialRequest";
import PaymentMethodForm from "@/app/(user)/book/_components/PaymentMethodForm";
import CancellationPolicy from "@/app/(user)/book/_components/CancellationPolicy";
import axiosFn from "@/utils/AxiosFn";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {useRouter} from "next/navigation";

const BookingForm = () => {
    const router = useRouter();
<<<<<<< HEAD
=======

>>>>>>> 431ce81d2af909b7fb2735508fb4ad35f064ec26
    const bookingSchema = yup.object().shape({
        checkInDate: yup.date().required("Please enter valid check-in date"),
        checkOutDate: yup.date().required("Please enter valid check-out date"),
        totalAdults: yup.number().min(1, "There has to be a guest").required("Please enter guest number"),
        totalChildren:  yup.number().nullable(),
        totalInfants:  yup.number().nullable(),
        checkInTime: yup.date().nullable(),
        checkOutTime: yup.date().nullable(),
        nonSmokingRoom: yup.boolean(),
        other: yup.string().min(3, "Please enter valid request").matches(whiteSpaceRegex, "Please enter valid request").nullable(),
        paymentMethod: yup.string().required("Please select payment method"),
        bank: yup.string().nullable(),
    });

    const initialValues: FormikValues = {
        checkInDate: null,
        checkOutDate: null,
        totalAdults: 1,
        totalChildren: null,
        totalInfants: null,
        checkInTime: null,
        checkOutTime: null,
        other: null,
        nonSmokingRoom: false,
        paymentMethod: "manual_transfer",
        bank: null,
    };

    const handleBooking = async (value: FormikValues) => {
        try {
            const bookingItem = {
                checkInDate: value.checkInDate,
                checkOutDate: value.checkOutDate,
                totalAdults: value.totalAdults,
                totalChildren: value?.totalChildren,
                totalInfants: value?.totalInfants,
            }

            const bookingRequest = {
                checkInTime: value?.checkInTime,
                checkOutTime: value?.checkOutTime,
                nonSmoking: value?.nonSmokingRoom,
                other: value?.other,
            }

            const valueToSent = {
                booking: { bookingItem, bookingRequest },
                amount: 1500000,
                paymentMethod: value.paymentMethod,
                bank: value?.bank,
            }

            const { data } = await axiosFn.post("/transactions/1", valueToSent);
            console.log(data);
            router.push(value.paymentMethod == "manual_transfer" ? "/payment/manual-transfer" : "/payment/bank-va");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <Formik
                initialValues={initialValues}
                validationSchema={bookingSchema}
                onSubmit={async (value) => {
                    await handleBooking(value);
                }}
            >
                {(formik) => (
                    <Form className="w-full flex flex-col gap-5">
                        <UserStayingDataForm/>
                        <SpecialRequest/>
                        <PaymentMethodForm/>
                        <CancellationPolicy/>
                        <Button
                            type="submit"
                            className="bg-blue-950 text-white"
                            onClick={() => console.log("Button clicked")}
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