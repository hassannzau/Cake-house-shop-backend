import { faker } from "./index";

const colors = ["Chocolate", "Vanilla", "Strawberry", "Red Velvet", "Caramel"];

export const createRandomColor = () => {
  return faker.helpers.arrayElement(colors);
};
