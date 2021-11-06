export const asyncSort = async (arr, predict) => {
  const results = await Promise.all(arr.map(predict));
  return arr.sort((a, b) => results[index]);
};
