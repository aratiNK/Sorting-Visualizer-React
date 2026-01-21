import { playBeep } from "../utils/sound";

export const bubbleSort = async (
  array,
  setArray,
  speed,
  setComparisons,
  setSwaps
) => {
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setComparisons((c) => c + 1);
      playBeep(400);

      if (arr[j] > arr[j + 1]) {
        setSwaps((s) => s + 1);
        playBeep(700);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
