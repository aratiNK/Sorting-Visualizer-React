import React, { useEffect, useState } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { setMute } from "./utils/sound";
import StatsGraph from "./components/StatsGraph";

const complexityMap = {
  Bubble: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
  Selection: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
  Insertion: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
  Merge: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
  Quick: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" },
};

function App() {
  const [muted, setMuted] = useState(false);
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(60);
  const [algo, setAlgo] = useState("Bubble");
  const [color, setColor] = useState("#20c997");
  const [isSorting, setIsSorting] = useState(false);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line
  }, [size]);

  const generateArray = () => {
    if (isSorting) return;
    const temp = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 300) + 40
    );
    setArray(temp);
    setComparisons(0);
    setSwaps(0);
  };

  const startSort = async () => {
    setComparisons(0);
    setSwaps(0);
    setIsSorting(true);

    if (algo === "Bubble")
      await bubbleSort(array, setArray, speed, setComparisons, setSwaps);
    else if (algo === "Selection")
      await selectionSort(array, setArray, speed, setComparisons, setSwaps);
    else if (algo === "Insertion")
      await insertionSort(array, setArray, speed, setComparisons, setSwaps);
    else if (algo === "Merge")
      await mergeSort(array, setArray, speed, setComparisons);
    else if (algo === "Quick")
      await quickSort(array, setArray, speed, setComparisons, setSwaps);

    setIsSorting(false);
  };

  return (
    <div className="app-bg">
      {/* HEADER */}
      <div className="hero-header text-center">
        <h1 className="app-title">Sorting Visualizer</h1>
        <p>Visualize - Compare - Understand Algorithms</p>
      </div>

      <div className="container">
        {/* CONTROLS */}
        <div className="card shadow p-3 mb-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <select
                className="form-select"
                value={algo}
                disabled={isSorting}
                onChange={(e) => setAlgo(e.target.value)}
              >
                <option>Bubble</option>
                <option>Selection</option>
                <option>Insertion</option>
                <option>Merge</option>
                <option>Quick</option>
              </select>
            </div>

            <div className="col-md-2">
              <input
                type="color"
                value={color}
                disabled={isSorting}
                onChange={(e) => setColor(e.target.value)}
                className="form-control form-control-color"
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                onClick={startSort}
                disabled={isSorting}
              >
                Start Sorting
              </button>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-secondary w-100"
                onClick={generateArray}
                disabled={isSorting}
              >
                New Array
              </button>
            </div>

            <div className="col-md-2">
              <button
                className={`btn ${
                  muted ? "btn-danger" : "btn-outline-dark"
                } w-100`}
                onClick={() => {
                  setMuted(!muted);
                  setMute(!muted);
                }}
              >
                {muted ? "Muted" : "Sound"}
              </button>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label>Array Size</label>
              <input
                type="range"
                min="10"
                max="100"
                value={size}
                disabled={isSorting}
                onChange={(e) => setSize(Number(e.target.value))}
                className="form-range"
              />
            </div>
            <div className="col">
              <label>Speed</label>
              <input
                type="range"
                min="10"
                max="200"
                value={speed}
                disabled={isSorting}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="form-range"
              />
            </div>
          </div>
        </div>

        {/* COMPLEXITY */}
        <div className="alert alert-info text-center mb-3">
          <strong>{algo} Sort</strong> | Best: {complexityMap[algo].best} | Avg:{" "}
          {complexityMap[algo].avg} | Worst: {complexityMap[algo].worst}
        </div>

        {/* DASHBOARD */}
        <div className="row">
          {/* LEFT PANEL */}
          <div className="col-md-4">
            <div className="stats-box mb-3">
              <div className="stat-item">
                <i className="fa-solid fa-code-compare"></i>
                <span>Comparisons</span>
                <strong>{comparisons}</strong>
              </div>

              <div className="stat-item">
                <i className="fa-solid fa-arrows-rotate"></i>
                <span>Swaps</span>
                <strong>{swaps}</strong>
              </div>
            </div>

            <div className="card shadow p-2">
              <h6 className="text-center fw-bold mb-2">
                Algorithm Performance
              </h6>
              <StatsGraph
                comparisons={comparisons}
                swaps={swaps}
                algo={algo}
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-md-8">
            <div className="bars-container">
              {array.map((value, idx) => (
                <div
                  key={idx}
                  className="bar"
                  style={{
                    height: `${value}px`,
                    width: `${600 / size}px`,
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer text-center mt-4">
          <h4>Turning Algorithms into Experiences</h4>
         
        </footer>
      </div>
    </div>
  );
}

export default App;
