// takes an array and gets x random items from it, defaults to 1 item
export const getRandomItemsFromArray = <T>(arr: T[], num = 1) => {
  const res = [];
  if (arr.length < num) num = arr.length;
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};
