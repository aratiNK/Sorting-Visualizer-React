import { playBeep } from "../utils/sound";

export const quickSort = async (
  array,
  setArray,
  speed,
  setComparisons,
  setSwaps
) => {
  let arr = [...array];
  await quickSortHelper(arr, 0, arr.length - 1, setArray, speed, setComparisons, setSwaps);
};

const quickSortHelper = async (
  arr,
  low,
  high,
  setArray,
  speed,
  setComparisons,
  setSwaps
) => {
  if (low < high) {
    const pi = await partition(arr, low, high, setArray, speed, setComparisons, setSwaps);
    await quickSortHelper(arr, low, pi - 1, setArray, speed, setComparisons, setSwaps);
    await quickSortHelper(arr, pi + 1, high, setArray, speed, setComparisons, setSwaps);
  }
};

const partition = async (
  arr,
  low,
  high,
  setArray,
  speed,
  setComparisons,
  setSwaps
) => {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    setComparisons((c) => c + 1);
    playBeep(400);

    if (arr[j] < pivot) {
      i++;
      setSwaps((s) => s + 1);
      playBeep(700);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }
  }

  setSwaps((s) => s + 1);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  await sleep(speed);

  return i + 1;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
