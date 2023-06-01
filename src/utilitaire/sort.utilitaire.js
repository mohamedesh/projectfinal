export const sortArrayById = (array) => {
  return [...array].sort((a, b) => a.id - b.id);
};
export const sortArrayByCategorieId = (array) => {
  return [...array].sort((a, b) => a.categorieId - b.categorieId);
};
