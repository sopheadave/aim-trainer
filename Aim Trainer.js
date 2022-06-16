
  let trainerSettings = document.getElementById("trainerSettings");
  let timerLimit = document.getElementById("timerLimit");
  let difficultyLevel = document.getElementById("difficultyLevel");
  let StartGame = document.getElementById("StartGame");
  let trainerGame = document.getElementById("trainerGame");
  let theReticle = document.getElementById("Reticle");
  let scoreBoard = document.getElementById("scoreBoard");
  let mouseHits = document.getElementById("mouseHits");
  let mouseMiss = document.getElementById("mouseMiss");
  let gameTimer = document.getElementById("gameTimer");
  let thetargetHits = document.getElementById("thetargetHits");
  let thetargetMiss = document.getElementById("thetargetMiss");
  let thetargetSize = document.getElementById("thetargetSize");
  let thereticleSize = document.getElementById("thereticleSize");
  let thetimerLimit = document.getElementById("thetimerLimit");
  let thedifficultyLevel = document.getElementById("thedifficultyLevel");
  let theaccuracy = document.getElementById("theaccuracy");
  let AimTrainertargetHits = document.getElementById("AimTrainertargetHits");
  let AimTrainerHPSscore = document.getElementById("AimTrainerHPSscore");
  let AimTrainerModal = document.getElementById("AimTrainerModal");
  let closeAimTrainerModal = document.getElementById("closeAimTrainerModal");
  let AimTrainerMainimg = document.getElementById("AimTrainerMainimg");
  let fbbutton = document.getElementById("fbbutton");
  let twbutton = document.getElementById("twbutton");
  let wabutton = document.getElementById("wabutton");
  let AimTrainermsgreset = document.getElementById("AimTrainermsgreset");
  thereticleSize.innerHTML = 100 + " px";
  var gunShotMiss = new Audio("https://joltfly.com/wp-content/uploads/2021/04/Joltfly-Aim-Trainer-Gunshot-Miss.mp3");
  var gunShotHit = new Audio("https://joltfly.com/wp-content/uploads/2021/04/Joltfly-Aim-Trainer-Gunshot-Hit.mp3");
  gunShotMiss.volume = 0;
  gunShotHit.volume = 0;
  let mHit = 0,
    mMiss = 0;

  function changeReticleColor(e) {
    document.querySelectorAll(".Reticle").forEach((Reticle) => (Reticle.style.color = e.target.value));
    theReticle.style.color = e.target.value;
  }

  function setReticleSize(val) {
    val = val > 100 ? 100 : val;
    document.querySelectorAll(".Reticle").forEach((Reticle) => {
      Reticle.style.width = val;
      Reticle.style.height = val;
      Reticle.style.top = "calc(50% - " + val / 2 + "px)";
      Reticle.style.left = "calc(50% - " + val / 2 + "px)";
    });
    theReticle.style.width = val;
    theReticle.style.height = val;
    theReticle.style.top = "calc(50% - " + val / 2 + "px)";
    theReticle.style.left = "calc(50% - " + val / 2 + "px)";
    thereticleSize.innerHTML = String(val) + "px";
  }

  function setTargetSize(val) {
    val = val > 100 ? 100 : val;
    document.querySelectorAll(".target").forEach((target) => {
      target.style.width = val + "px";
      target.style.height = val + "px";
    });
    targetSize = Number(val);
  }

  function setTargetRadius(val) {
    document.querySelectorAll(".target").forEach((target) => {
      target.style.borderRadius = val + "%";
    });
  }
  const setGameTime = (e) => (gameTime = e.target.value * 1000);
  const setGameDifficulty = (e) => (gameDifficultylvl = parseFloat(e.target.value));
  const body = document.querySelector("body");
  const target = document.getElementById("realTarget");
  const countDownLabel = document.querySelector("#countdown");
  const menu = document.querySelector(".aimtrainer-settings");
  const area = document.querySelector(".practice-area");
  const crosshair = document.querySelector("#Reticle");
  let gameTime = timerLimit.value * 1000;
  let gameDifficultylvl = parseFloat(difficultyLevel.value);
  let isColliding = false;

  function begintrainer() {
    trainerSettings.style.display = "none";
    trainerGame.style.display = "block";
    trainerGame.scrollIntoView({
      block: "center"
    });
    countDownLabel.textContent = "";
    startGame();
  }
  StartGame.onclick = begintrainer;

  function updategameDifficultylvl() {
    if (gameDifficultylvl === 1) {
      thedifficultyLevel.innerHTML = "Easy";
      return 2.0;
    } else if (gameDifficultylvl === 2) {
      thedifficultyLevel.innerHTML = "Moderate";
      return 1.0;
    } else if (gameDifficultylvl === 3) {
      thedifficultyLevel.innerHTML = "Challenging";
      return 0.5;
    } else {
      thedifficultyLevel.innerHTML = "Moderate";
      return 1.0;
    }
  }
  var startTime;

  function startGame() {
    let time = 3;
    menu.style.display = "none";
    countDownLabel.style.display = "inline";
    const countdown = setInterval(() => {
      if (time === -1) {
        clearInterval(countdown);
        mouseHits.innerHTML = "00";
        mouseMiss.innerHTML = "00";
        mHit = 0;
        mMiss = 0;
        gunShotHit.volume = 1;
        gunShotMiss.volume = 0.3;
        scoreBoard.style.display = "block";
        setTarget();
        crosshair.style.display = "block";
        area.style.display = "block";
        body.style.cursor = "none";
        countDownLabel.style.display = "none";
        checkFullScreen();
        var difflvl = updategameDifficultylvl();
        startTime = new Date().getTime();
        var duration = gameTime / 1000;
        var timerId = setInterval(function() {
          var total = (new Date().getTime() - startTime) / 1000;
          if (total < duration) {
            if (total % difflvl === 0) {
              setTarget();
            }
            gameTimer.innerHTML = total.toFixed(2);
          } else {
            clearInterval(timerId);
            gameOver();
          }
        }, 1);
      }
      countDownLabel.textContent = time;
      time--;
    }, 1000);
  }

  function resettrainer() {
    trainerGame.style.display = "none";
    trainerSettings.style.display = "flex";
  }

  function modalInitializer() {
    thetargetHits.innerHTML = mHit;
    thetargetMiss.innerHTML = mMiss;
    thetargetSize.innerHTML = targetSize + " px";
    thetimerLimit.innerHTML = (gameTime / 1000).toFixed(2) + " secs";
    AimTrainertargetHits.innerHTML = mHit;
    theaccuracy.innerHTML = ((mHit / (mHit + mMiss)) * 100).toFixed(0);
    AimTrainerHPSscore.innerHTML = (mHit / (gameTime / 1000)).toFixed(2);
    fbbutton.href = "https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjoltfly.com/aim-trainer-mouse-accuracy-test/";
    twbutton.href = "https://twitter.com/intent/tweet/?text=YaYY! I successfully hit the target " + mHit + " times with fantastic score of " + (mHit / (gameTime / 1000)).toFixed(2) + " HPS in just " + gameTime / 1000 + " seconds. Do you think you can beat my score? Try your luck! https%3A%2F%2Fjoltfly.com/aim-trainer-mouse-accuracy-test/";
    wabutton.href = "https://wa.me/?text=YaYY! I successfully hit the target " + mHit + " times with fantastic score of " + (mHit / (gameTime / 1000)).toFixed(2) + " HPS in just " + gameTime / 1000 + " seconds. Do you think you can beat my score? Try your luck at https://joltfly.com/aim-trainer-mouse-accuracy-test/";
    if ((mHit / (gameTime / 1000)) > 0 && (mHit / (gameTime / 1000)) <= 0.6) {
      AimTrainerMainimg.src = "https://joltfly.com/wp-content/uploads/2021/04/Joltfly-Aim-Trainer-Amateur-Rank.svg";
      AimTrainerAchievedRank.innerHTML = "Amateur";
    } else if ((mHit / (gameTime / 1000)) > 0.6 && (mHit / (gameTime / 1000)) <= 1.2) {
      AimTrainerMainimg.src = "https://joltfly.com/wp-content/uploads/2021/04/Joltfly-Aim-Trainer-Expert-Rank.svg";
      AimTrainerAchievedRank.innerHTML = "Expert";
    } else if ((mHit / (gameTime / 1000)) > 1.2) {
      AimTrainerMainimg.src = "https://joltfly.com/wp-content/uploads/2021/04/Joltfly-Aim-Trainer-Lord-Rank.svg";
      AimTrainerAchievedRank.innerHTML = "Lord";
    }
  }
  window.onclick = function(event) {
    if (event.target == AimTrainerModal) {
      AimTrainerModal.style.display = "none";
      trainerSettings.style.display = "flex";
    }
  };

  function AimTrainerResetbutton() {
    AimTrainerModal.style.display = "none";
    trainerSettings.style.display = "flex";
  }
  AimTrainermsgreset.onclick = AimTrainerResetbutton;
  closeAimTrainerModal.onclick = AimTrainerResetbutton;

  function gameOver() {
    modalInitializer();
    crosshair.style.display = "none";
    area.style.display = "none";
    body.style.cursor = "default";
    gunShotMiss.volume = 0;
    gunShotHit.volume = 0;
    setTimeout(function() {
      AimTrainerModal.style.display = "block";
      trainerGame.style.display = "none";
      scoreBoard.style.display = "none";
    }, 300);
  }

  function checkIsColliding() {
    const rect = target.getBoundingClientRect();
    if (rect.left + targetSize >= innerWidth / 2 && innerWidth / 2 - rect.left > 0 && rect.top + targetSize >= innerHeight / 2 && innerHeight / 2 - rect.top > 0) return true;
    else return false;
  }
  const getRand = (x, y) => {
    const randTill = (n) => Math.floor(Math.random() * n);
    return [randTill(x), randTill(y)];
  };

  function hit() {
    isColliding = false;
    setTarget();
  }
  let targetSize = 100;
  const multiplier = 0.85;
  let xLimit = innerWidth * multiplier - targetSize;
  let yLimit = innerHeight * multiplier - targetSize;
  checkFullScreen();

  function checkFullScreen() {
    xLimit = innerWidth * multiplier - targetSize;
    yLimit = innerHeight * multiplier - targetSize;
  }
  addEventListener("resize", checkFullScreen);

  function setTarget() {
    const [x, y] = getRand(xLimit, yLimit);
    target.style.left = x + "px";
    target.style.top = y + "px";
    target.classList.remove("hover");
  }
  addEventListener("mousemove", (e) => {
    area.style.left = innerWidth / 2 - e.clientX + "px";
    area.style.top = innerHeight / 2 - e.clientY + "px";
    area.style.transform = "rotateY(" + (0 + (innerWidth / 2 - e.clientX) / 40) + "deg)" + "rotateX(" + (0 - (innerHeight / 2 - e.clientY) / 40) + "deg)";
    const result = checkIsColliding();
    if (result !== isColliding) {
      target.classList.toggle("hover");
      isColliding = result;
    }
  });
  addEventListener("click", () => {
    if (isColliding) {
      mHit++;
      mouseHits.innerHTML = String(mHit).padStart(2, "0");
      gunShotHit.currentTime = 0;
      gunShotHit.play();
      hit();
    } else {
      mMiss++;
      gunShotMiss.currentTime = 0;
      gunShotMiss.play();
      mouseMiss.innerHTML = String(mMiss).padStart(2, "0");
    }
  });