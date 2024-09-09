import {FC, PropsWithChildren} from "react";
import {cn} from "@/lib/utils";

interface TagProps extends PropsWithChildren {
    className?: string;
}

const Tag: FC<TagProps> = ({ children, className }) => {
    return (
        <div className={cn("bg-green-400 text-green-900 px-4 py-1 w-max rounded-2xl", className)}>
            { children }
        </div>
    );
};

export default Tag;