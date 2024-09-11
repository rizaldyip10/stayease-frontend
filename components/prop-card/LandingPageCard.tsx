import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface LandingPageCardProps {
  className?: string;
  imageUrl: string;
  name: string;
  address: string;
  price: number;
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({
  className,
  name,
  address,
  price,
  imageUrl,
}) => {
  return (
    <div
      className={`${className} card max-w-[376px] max-h-[528px] rounded-t-lg`}
    >
      <Card>
        <CardHeader>
          <Image src={imageUrl} alt={name} height={376} width={376} />
          {/*<CardDescription>Card Description</CardDescription>*/}
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-5 tracking-wide">{name}</CardTitle>
          <p className="font-light">{address}</p>
        </CardContent>
        <CardFooter>
          <p>
            <span className="font-bold">Rp </span>
            {price}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPageCard;
