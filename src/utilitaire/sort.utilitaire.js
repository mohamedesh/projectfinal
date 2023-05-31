export const SortArrayById = (array) => {
  return [...array].sort((a, b) => a.id - b.id);
};
