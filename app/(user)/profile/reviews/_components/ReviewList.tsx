import ReviewedCard from "@/app/(user)/profile/reviews/_components/ReviewedCard";
import {Input} from "@/components/ui/input";

const ReviewList = () => {
    return (
        <div className="grid grid-cols-1 gap-2">
            <Input placeholder="Serch your review" />
            <ReviewedCard />
            <ReviewedCard />
            <ReviewedCard />
            <ReviewedCard />
            <ReviewedCard />
        </div>
    );
};

export default ReviewList;