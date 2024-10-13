export const createPropertyInitialValues = {
  property: {
    name: "",
    description: "",
    imageUrl: "",
    address: "",
    city: "",
    country: "",
    longitude: 0,
    latitude: 0,
    categoryId: 0,
  },
  rooms: [
    {
      name: "",
      description: "",
      basePrice: 0,
      capacity: 0,
      imageUrl: "",
    },
  ],
  category: {
    name: "",
  },
};

export type PropertyEditFormValues = {
  property: {
    name: string;
    description: string;
    categoryId: number;
    imageUrl: string;
  };
  rooms: {
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    imageUrl: string;
  }[];
  category: string;
};
