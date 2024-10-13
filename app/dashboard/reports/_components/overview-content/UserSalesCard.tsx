import {BookingDataType} from "@/constants/Booking";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface UserSalesCardProps {
    trx: BookingDataType;
}

const UserSalesCard: FC<UserSalesCardProps> = ({ trx }) => {
    return (
        <div className="flex items-center">

            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{`${ trx.user?.firstName } ${ trx.user?.lastName }`}</p>
                <p className="text-sm text-muted-foreground">
                    { trx.user?.email }
                </p>
            </div>
            <div className="ml-auto font-medium">+{currencyFormatter(trx.totalPrice)}</div>
        </div>
    );
};

export default UserSalesCard;