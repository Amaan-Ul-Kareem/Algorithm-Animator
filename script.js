const container = document.getElementById("array");
let array = [];

function generateArray() {
  container.innerHTML = "";
  array = [];
  for (let i = 0; i < 40; i++) {
    const value = Math.floor(Math.random() * 300) + 20;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(bar1, bar2) {
  return new Promise(resolve => {
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    setTimeout(() => resolve(), 220);
  });
}

// ------------------- Bubble Sort -------------------
async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";

      if (array[j] > array[j + 1]) {
        await swap(bars[j], bars[j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      bars[j].style.background = "#1abc9c";
      bars[j + 1].style.background = "#1abc9c";
    }
    bars[array.length - i - 1].style.background = "#9b59b6";
  }
}

// ------------------- Selection Sort -------------------
async function selectionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.background = "orange";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = "red";
      await delay(50);
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.background = "#1abc9c";
        minIndex = j;
        bars[minIndex].style.background = "orange";
      } else {
        bars[j].style.background = "#1abc9c";
      }
    }
    await swap(bars[i], bars[minIndex]);
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    bars[i].style.background = "#9b59b6";
  }
}

// ------------------- Insertion Sort -------------------
async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.background = "red";

    while (j >= 0 && array[j] > key) {
      bars[j].style.background = "red";
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      await delay(60);
      bars[j].style.background = "#1abc9c";
      j--;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[i].style.background = "#9b59b6";
  }
}

// ------------------- Merge Sort -------------------
async function mergeSortHelper() {
  await mergeSort(array, 0, array.length - 1);
}

async function mergeSort(arr, l, r) {
  if (l >= r) return;
  let mid = Math.floor((l + r) / 2);
  await mergeSort(arr, l, mid);
  await mergeSort(arr, mid + 1, r);
  await merge(arr, l, mid, r);
}

async function merge(arr, l, mid, r) {
  let bars = document.getElementsByClassName("bar");
  let left = arr.slice(l, mid + 1);
  let right = arr.slice(mid + 1, r + 1);

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    bars[k].style.background = "red";
    await delay(80);
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }
    bars[k].style.background = "#9b59b6";
    k++;
  }
  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${left[i]}px`;
    bars[k].style.background = "#9b59b6";
    i++;
    k++;
    await delay(60);
  }
  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${right[j]}px`;
    bars[k].style.background = "#9b59b6";
    j++;
    k++;
    await delay(60);
  }
}

// ------------------- Quick Sort -------------------
async function quickSortHelper() {
  await quickSort(array, 0, array.length - 1);
}

async function quickSort(arr, low, high) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let bars = document.getElementsByClassName("bar");
  let pivot = arr[high];
  let i = low - 1;
  bars[high].style.background = "orange";

  for (let j = low; j < high; j++) {
    bars[j].style.background = "red";
    await delay(70);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await swap(bars[i], bars[j]);
    }
    bars[j].style.background = "#1abc9c";
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  await swap(bars[i + 1], bars[high]);
  bars[high].style.background = "#1abc9c";
  return i + 1;
}

generateArray();
