import { faker } from "./index";

const brands = ["Nido Cake", "Sweet Heaven", "Cake Studio", "Dream Cakes"];

export const createRandomBrand = () => {
  return faker.helpers.arrayElement(brands);
};

