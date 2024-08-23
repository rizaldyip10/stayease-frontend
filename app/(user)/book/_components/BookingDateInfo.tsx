import FormikDatePicker from "@/components/formik/FormikDatePicker";
import {useState} from 'react';
import { Button } from "@/components/ui/button";

const BookingDateInfo = () => {
    const [edit, setEdit] = useState<boolean>(false);
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-blue-950 text-sm">Dates</h1>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-center gap-1">
                    <FormikDatePicker name="checkInDate" label="Check-in date" isEditing={edit}/>
                    -
                    <FormikDatePicker name="checkOutDate" label="Check-out date" isEditing={edit}/>
                </div>
                <Button
                    type="button"
                    variant="link"
                    onClick={() => setEdit(!edit)}
                    className="text-blue-950"
                >
                    {edit ? "Save" : "Edit"}
                </Button>
            </div>
        </div>
    );
};

export default BookingDateInfo;