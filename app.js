let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let winnerMsgContainer= document.querySelector(".winning-msg");
let winPara = document.querySelector("#win");

// to track the turn of the player >> either X will play first or O >> generally turns alternate each time 

let turnO = true;  // playerX and playerO

// winning patterns >> 8 winning pattern >> 3 horizonatal, 3 vertical, 2 diagonal 
// >> we will use arrays to store them 

// 1D array
// let arr = ["apple", "banana", "litchi"];

// 2D array  >> arrays in array 
// let arr2 = [["apple", "banana"], ["potato", "onion"], ["pants", "shirt"]];
// console.log(arr2);
// console.log(arr2[0]);
// console.log(arr2[0][1]);    // banana

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winnerMsgContainer.classList.add("hide");
};

let count = 0;
// button click krne prrr kuch hona chahiye
boxes.forEach((box) => {
    box.addEventListener("click", () => {
           count++;
        // console.log("box was clicked");
        // box.innerText = "Abcd"; 
        // if (turnO === true)  = if (turnO) both have same mean 
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "#fca311"; // Change the color of X here
            turnO = true;
        }
        box.disabled = true;   // jab kisi button prr dobara click krte hea tou value phr change ho jati hea >>> aik barr jo value store ho gai wo change na ho iss liye use kiya hea
        checkWinner();
    });
});


const disableBoxes = () => { // jesy hi pehla winner aa jaye agy game na chale
    for(let box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => { // jesy hi game reset ho tou sare boxes enable ho jaye
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Reset the color when the game is reset
    }
};


const showWinner = (winner) => {
    winPara.innerText = `Congragulations, Winner is ${winner}`;
    winnerMsgContainer.classList.remove("hide");
    disableBoxes();
};

// to track at each turn if there is some pattern forming or someone is winning the game 
const checkWinner = () => {

    // winner kon hea jo b teen positions prr same element hea 

    for (let pattern of winPatterns) {

    //    console.log(pattern); 
    //    to find the value/ element/ X/O at each position 0, 1, 2, 3... chole pehle hum individual index nikal lete hea 
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // agr teeno positions prr same value hoi tou he or she must be a winner 
    // mgr pehle yeh check krna pary ga k koi box khali tou nhi 

    if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
           // console.log("winner", pos1Val);   // pos1Val is winner
            showWinner(pos1Val);
        } else if (count === 9) {
            drawGame();
        }
    }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


const drawGame = () => {
    // console.log("draw") 
    winPara.innerText = `OOps game is draw, play again!`;
    winnerMsgContainer.classList.remove("hide");
}