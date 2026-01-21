import { playBeep } from "../utils/sound";

export const insertionSort = async (
  array,
  setArray,
  speed,
  setComparisons,
  setSwaps
) => {
  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      setComparisons((c) => c + 1);
      playBeep(400);

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        setSwaps((s) => s + 1);
        playBeep(700);
        j--;
        setArray([...arr]);
        await sleep(speed);
      } else break;
    }
    arr[j + 1] = key;
    setArray([...arr]);
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
