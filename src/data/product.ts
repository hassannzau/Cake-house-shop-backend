import { faker } from "./index";
import { createRandomBrand } from "./brand";
import { createRandomCategory } from "./category";
import { createRandomColor } from "./color";
import { createFakeImage } from "./image";
import { SIZES } from "./size";

export interface Product {
  id: number;
  title: string;
  category: string;
  color: string;
  price: number;
  discountedPrice: number;
  rating: number;
  images: string[];
  brand: string;
  sizes: { id: number; label: string }[];
}

export const createRandomProduct = (): Product => {
  const price = faker.number.int({ min: 20, max: 120 });
  const discount = faker.number.int({ min: 5, max: 30 });

  return {
    id: faker.number.int(),
    title: faker.commerce.productName(),
    category: createRandomCategory(),
    color: createRandomColor(),
    brand: createRandomBrand(),
    price: price,
    discountedPrice: price - discount,
    rating: faker.number.float({
      min: 3,
      max: 5,
      fractionDigits: 1,
    }),

    sizes: faker.helpers.arrayElements(SIZES).sort((a, b) => a.id - b.id),

    images: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () =>
      createFakeImage(255, 310),
    ),
  };
};

export const PRODUCTS = Array.from({ length: 10 }, () => createRandomProduct());
