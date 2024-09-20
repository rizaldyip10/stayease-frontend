import RatingStar from "@/components/RatingStar";
import {FC} from "react";
import EditState from "@/app/(user)/profile/reviews/_components/EditState";

interface ReviewSectionProps {
    isEditState: boolean
}

const ReviewSection: FC<ReviewSectionProps> = ({ isEditState }) => {
    return (
        <div className="w-full xl:w-1/2 flex flex-col gap-y-2 pl-2">
            {
                isEditState ?
                    <EditState /> :
                    <>
                        <RatingStar rating={4} />
                        <p className="w-full text-wrap text-blue-950 text-sm">House comfort, equipments for necessary needs is there</p>
                    </>
            }
        </div>
    );
};

export default ReviewSection;