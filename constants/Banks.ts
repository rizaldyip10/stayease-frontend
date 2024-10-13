import bca from "@/assets/images/bca.png";
import bni from "@/assets/images/bni.png";
import cimb from "@/assets/images/cimb.png";
import {StaticImageData} from "next/image";

type BankType = {
    id: string;
    label: string;
    image: StaticImageData;
}

export const banks: BankType[] = [
    { id: "bca", label: "Bank BCA", image: bca },
    { id: "bni", label: "Bank BNI", image: bni },
    { id: "cimb", label: "CIMB Niaga", image: cimb },
]