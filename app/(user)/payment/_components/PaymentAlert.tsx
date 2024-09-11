import {TriangleAlert} from "lucide-react";

const PaymentAlert = () => {
    return (
        <div className="w-full p-5 flex gap-4 border border-yellow-800 bg-yellow-200 rounded-md items-center">
            <TriangleAlert className="text-yellow-800 w-32 h-32 md:w-10 md:h-10" />
            <div className="text-wrap">
                <p className="text-sm text-yellow-800">
                    If you accidentally close this page, you can see this information in your order section on your profile page. You can also upload your payment proof from there
                </p>
            </div>
        </div>
    );
};

export default PaymentAlert;