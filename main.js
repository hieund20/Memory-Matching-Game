const canvas = document.getElementById("canvas");
const blockValues = [
  {
    value: 1,
    backgroundColor: "red",
    isOpen: false,
    isHide: false,
  },
  {
    value: 1,
    backgroundColor: "red",
    isOpen: false,
    isHide: false,
  },
  {
    value: 2,
    backgroundColor: "green",
    isOpen: false,
    isHide: false,
  },
  {
    value: 2,
    backgroundColor: "green",
    isOpen: false,
    isHide: false,
  },
  {
    value: 3,
    backgroundColor: "blue",
    isOpen: false,
    isHide: false,
  },
  {
    value: 3,
    backgroundColor: "blue",
    isOpen: false,
    isHide: false,
  },
  {
    value: 4,
    backgroundColor: "gray",
    isOpen: false,
    isHide: false,
  },
  {
    value: 4,
    backgroundColor: "gray",
    isOpen: false,
    isHide: false,
  },
  {
    value: 5,
    backgroundColor: "orange",
    isOpen: false,
    isHide: false,
  },
  {
    value: 5,
    backgroundColor: "orange",
    isOpen: false,
    isHide: false,
  },
  {
    value: 6,
    backgroundColor: "yellow",
    isOpen: false,
    isHide: false,
  },
  {
    value: 6,
    backgroundColor: "yellow",
    isOpen: false,
    isHide: false,
  },
  {
    value: 7,
    backgroundColor: "pink",
    isOpen: false,
    isHide: false,
  },
  {
    value: 7,
    backgroundColor: "pink",
    isOpen: false,
    isHide: false,
  },
  {
    value: 8,
    backgroundColor: "purple",
    isOpen: false,
    isHide: false,
  },
  {
    value: 8,
    backgroundColor: "purple",
    isOpen: false,
    isHide: false,
  },
];
const turns = [];
let isStart = false;
const responsive = window.matchMedia("(min-width: 768px)");
let countDownTimer;

const blocks = document.createElement("div");
blocks.className = "blocks-container";
blocks.style.display = "grid";
blocks.style.gridTemplateColumns = "auto auto auto auto";
blocks.style.gap = "7px";
blocks.style.maxWidth = "420px";
blocks.style.margin = "0 auto";

const draw = () => {
  blockValues
    .sort(() => Math.random() - 0.5)
    .forEach((el, index) => {
      const block = document.createElement("div");
      block.style.width = "100%";
      block.style.height = responsive.matches ? "100px" : "80px";
      block.style.border = "1px solid black";
      block.style.borderRadius = "4px";
      block.style.cursor = "pointer";
      block.id = `block-${index}`;

      blockValues[index].isHide = false;
      blockValues[index].isOpen = false;

      if (isStart) {
        block.addEventListener("click", () => {
          if (el.isOpen || turns.length == 2) return;

          block.style.backgroundColor = el.backgroundColor;
          blockValues[index].isOpen = true;

          turns.push({ ...el, index });

          if (turns.length === 2) {
            checkSameBlockAndHide();
          }
        });
      }

      blocks.appendChild(block);
    });

  canvas.appendChild(blocks);
};

draw();

const removeBlocks = () => {
  blockValues.forEach((_, index) => {
    const block = document.getElementById(`block-${index}`);
    block.remove();
  });
};

const countDown = document.getElementById("timer");
countDown.innerText = 100;

const startButton = document.getElementById("start-btn");
startButton.style.padding = "16px";
startButton.style.cursor = "pointer";
startButton.style.width = "100%";
startButton.style.maxWidth = "420px";
startButton.style.marginTop = "16px";

startButton.addEventListener("click", () => {
  isStart = true;
  startButton.disabled = true;
  removeBlocks();
  draw();

  clearInterval(countDownTimer);
  countDown.innerText = 100;

  countDownTimer = setInterval(() => {
    if (!isStart) return;
    countDown.innerText -= 1;

    if (checkFinish()) {
      alert("Finished!");
      clearInterval(countDownTimer);
      isStart = false;
      startButton.disabled = false;
      removeBlocks();
      draw();
      return;
    }

    if (Number.parseInt(countDown.innerText) === 0) {
      clearInterval(countDownTimer);
      alert("Time's up");
      isStart = false;
      startButton.disabled = false;
      removeBlocks();
      draw();
    }
  }, 1000);
});

const checkSameBlockAndHide = () => {
  if (turns.length < 2) return;

  const [first, second] = turns;

  if (first.value === second.value) {
    setTimeout(() => {
      document.getElementById(`block-${first.index}`).style.visibility =
        "hidden";
      document.getElementById(`block-${second.index}`).style.visibility =
        "hidden";
    }, 500);
    blockValues[first.index].isHide = true;
    blockValues[second.index].isHide = true;
  } else {
    setTimeout(() => {
      document.getElementById(`block-${first.index}`).style.backgroundColor =
        "white";
      document.getElementById(`block-${second.index}`).style.backgroundColor =
        "white";
    }, 500);
    blockValues[first.index].isOpen = false;
    blockValues[second.index].isOpen = false;
  }

  turns.splice(0, turns.length);
};

const checkFinish = () => {
  for (let i = 0; i < blockValues.length; i++) {
    if (!blockValues[i].isHide) {
      return false;
    }
  }
  return true;
};
