export const selectionSort = async (array, setArray, speed) => {
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    setArray([...arr]);
    await sleep(speed);
  }
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
