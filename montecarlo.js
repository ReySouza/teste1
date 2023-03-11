// User inputs
const numNeedles = prompt("Enter the number of needles:");
const needleLength = prompt("Enter the length of the needle (in units):");
const numBoards = prompt("Enter the number of boards:");

// Constants
const floor = [];
const boards = [];

// Create the boards and set their positions
for (let i = 0; i <= numBoards; i++) {
  boards.push(i * (1 / (numBoards + 1)));
  floor.push((i / (numBoards + 1)) - (needleLength / 2));
}

// BuffonSimulation class
class BuffonSimulation {
  constructor() {
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  tossNeedle() {
    const needleObject = new DefinirAgulha(null, null, null, needleLength);
    this.listOfNeedleObjects.push(needleObject);
    const xCoordinates = [needleObject.endPoints[0][0], needleObject.endPoints[1][0]];
    const yCoordinates = [needleObject.endPoints[0][1], needleObject.endPoints[1][1]];

    for (let board = 0; board <= numBoards; board++) {
      if (needleObject.intersectWithY(floor[board])) {
        this.numberOfIntersections += 1;
      }
    }
  }

  runSimulation() {
    for (let i = 0; i < numNeedles; i++) {
      this.tossNeedle();
    }
  }

  calculatePi() {
    const piEstimate = (2 * numNeedles * needleLength) / (this.numberOfIntersections * boards[boards.length - 1]);
    return piEstimate;
  }
}

// Create a BuffonSimulation instance and run the simulation
const buffon = new BuffonSimulation();
buffon.runSimulation();

// Calculate the estimated value of pi
const piEstimate = buffon.calculatePi();
console.log("Estimated value of pi: " + piEstimate);

// Plot the simulation results using Plotly
const data = [
  {
    x: boards,
    y: floor,
    type: "scatter",
    name: "Floor",
    mode: "lines",
  },
];

for (let i = 0; i < buffon.listOfNeedleObjects.length; i++) {
  const needle = buffon.listOfNeedleObjects[i];
  const x = [needle.endPoints[0][0], needle.endPoints[1][0]];
  const y = [needle.endPoints[0][1], needle.endPoints[1][1]];
  const needleData = {
    x: x,
    y: y,
    type: "scatter",
    name: "Needle " + (i + 1),
    mode: "lines",
  };
  data.push(needleData);
}

const layout = {
  xaxis: {
    title: "Board position",
    range: [0, 1],
  },
  yaxis: {
    title: "Floor position",
    range: [-0.5, 0.5],
  },
  title: {
    text: "Buffon's Needle Simulation",
  },
};

Plotly.newPlot("plot", data, layout);
