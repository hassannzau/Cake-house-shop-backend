import { faker } from "./index";

const categories = [
  "Birthday Cakes",
  "Wedding Cakes",
  "Cupcakes",
  "Chocolate Cakes",
  "Kids Cakes",
];

export const createRandomCategory = () => {
  return faker.helpers.arrayElement(categories);
};
