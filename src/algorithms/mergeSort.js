import { playBeep } from "../utils/sound";

export const mergeSort = async (
  array,
  setArray,
  speed,
  setComparisons
) => {
  let arr = [...array];
  await mergeSortHelper(arr, 0, arr.length - 1, setArray, speed, setComparisons);
};

const mergeSortHelper = async (arr, l, r, setArray, speed, setComparisons) => {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);

  await mergeSortHelper(arr, l, m, setArray, speed, setComparisons);
  await mergeSortHelper(arr, m + 1, r, setArray, speed, setComparisons);
  await merge(arr, l, m, r, setArray, speed, setComparisons);
};

const merge = async (arr, l, m, r, setArray, speed, setComparisons) => {
  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);
  let i = 0,
    j = 0,
    k = l;

  while (i < left.length && j < right.length) {
    setComparisons((c) => c + 1);
    playBeep(400);

    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];

    setArray([...arr]);
    await sleep(speed);
  }

  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];

  setArray([...arr]);
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
