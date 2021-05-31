var humanMarks = 0;
var robotmarks = 0;

function rpsGame(choice) {
  var humanChoice, botChoice;
  humanChoice = choice.id;
  botChoice = numberToChoice(randomToRpsInt());
  console.log(humanChoice, botChoice);

  var results = decideWinner(humanChoice, botChoice);
  var message = finalMessage(results);

  rpsFrontend(humanChoice, botChoice, message);
}

function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissor"][number];
}

function decideWinner(humanChoice, botChoice) {
  var rpsDataBase = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };

  var yourScore = rpsDataBase[humanChoice][botChoice];
  var botScore = rpsDataBase[botChoice][humanChoice];

  return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
  if (yourScore === 0) {
    robotmarks += 1;
    return { Message: "YOU LOST", color: "red" };
  } else if (yourScore === 0.5) {
    return { Message: "YOU TIED", color: "yellow" };
  } else {
    humanMarks += 1;
    return { Message: "YOU WON", color: "green" };
  }
}

function rpsFrontend(humanChoice, botChoice, message) {
  console.log(humanChoice);
  var imagesDatabse = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var msgDiv = document.createElement("div");
  var resetBtn = document.createElement("button");

  humanDiv.innerHTML =
    "<p>you choosed</p><img src='" +
    imagesDatabse[humanChoice] +
    "' height=150px weight=150px style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1);'>";
  document.getElementById("flex-box-rps-div").appendChild(humanDiv);

  botDiv.innerHTML =
    "<p>computer choosed</p> <img src='" +
    imagesDatabse[botChoice] +
    "' height=150px weight=150px style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1);'>";
  document.getElementById("flex-box-rps-div").appendChild(botDiv);

  msgDiv.innerHTML =
    "<h1 style='color:" +
    message["color"] +
    "; font-size:60px; padding:20px;'>" +
    message["Message"] +
    "</h1>";
  document.getElementById("flexbox-results").appendChild(msgDiv);

  resetBtn.innerHTML = "Play Again";
  resetBtn.setAttribute("onclick", "reloadPage()");
  resetBtn.setAttribute("class", "btn btn-success");
  resetBtn.setAttribute("style", "margin:10px;");
  document.getElementById("flexbox-results").appendChild(resetBtn);
}

function reloadPage() {
  location.reload();
}
