////////////////////////////////////////////////////////////
// GAME v1.4
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var triedText = '[NUMBER] TURNS'; //game score description
var textCredit = "[NUMBER]"; //credit text display
var txtResult = "Amount Won : [NUMBER]";
var smallestNumber = 1; //smallest number (no negative number)
var largestNumber = 1000; //largest number (no negative number)
var betamount = 0;
var resultTitleText = 'BEST SCORE:'; //text for result title
var resultScoreDesc = 'TURNS'; //text for game score desc

// var exitMessage = 'Are you sure you want\nto quit the game?'; //quit game message

//Social share, [SCORE] will replace with game score
var shareEnable = false; //toggle share
var shareText = 'share your score'; //text for share instruction
var shareTitle = 'Highscore on Guess Number Game is [SCORE] turns'; //social share score title
var shareMessage = '[SCORE] turns is mine new highscore on Guess Number Game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var playerData = { turns: 0 };
var gameData = { guessStart: 0, guessEnd: 0, guessNumber: 0, guessArray: [], correctNumber: 0, paused: false };

function Notify(text) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(text);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(text);
            }
        });
    }
}


/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton() {
    initSpeech();
    const getProvider = () => {
        if ("solana" in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
                return provider;
            }
        }
        Notify("Please setup wallet")
        window.open("https://phantom.app/", "_blank");
    };
    getProvider();
    buttonStart.cursor = "pointer";
    const phantomWallet = new PhantomWallet();
    buttonStart.addEventListener("click", function(evt) {
        if (!phantomWallet.isConnected) {
            phantomWallet.connectWallet()
                .then(x => {
                    if (x) {
                        phantomWallet.getBalance().then(x => {
                            myStr = phantomWallet.walletPubkey()
                            walletId.text = myStr.substr(0, 4) + '******' + myStr.substr(myStr.length - 4, myStr.length);
                            txtCredit.text = Number(textCredit.replace('[NUMBER]', x / solanaWeb3.LAMPORTS_PER_SOL)).toFixed(12);
                            playSound('soundClick');
                            goPage('game');
                            Notify("Fetched Balance from Wallet");
                        }).catch(err => {
                            // console.log(err);
                            Notify("Not able to fetch Balance from Wallet, Please refresh the page")
                        });
                    }
                })
        } else {
            phantomWallet.getBalance().then(x => {
                myStr = phantomWallet.walletPubkey()
                walletId.text = myStr.substr(0, 4) + '******' + myStr.substr(myStr.length - 4, myStr.length);
                txtCredit.text = Number(textCredit.replace('[NUMBER]', x / solanaWeb3.LAMPORTS_PER_SOL)).toFixed(12);
                playSound('soundClick');
                goPage('game');
                Notify("Fetched Balance from Wallet");
            }).catch(err => {
                // console.log(err);
                Notify("Not able to fetch Balance from Wallet, Please refresh the page")
            });
        }
    });

    for (n = 0; n < 10; n++) {
        var number = (n + 1);
        number = number == 10 ? 0 : number;
        $.numbers['keybg' + n].clickNum = number;
        $.numbers['keybg' + n].cursor = "pointer";
        $.numbers['keybg' + n].addEventListener("click", function(evt) {
            playSound('soundClick2');
            enterNumber(evt.target.clickNum);
        });
    }

    buttonClear.cursor = "pointer";
    buttonClear.addEventListener("click", function(evt) {
        playSound('soundClick3');
        clearNumber();
    });

    buttonGuess.cursor = "pointer";
    buttonGuess.addEventListener("click", function(evt) {
        playSound('soundClick3');
        checkNumber();
    });

    buttonSpeak.cursor = "pointer";
    buttonSpeak.addEventListener("click", function(evt) {
        playSound('soundClick3');
        toggleSpeech(true);
    });

    buttonSpeakActive.cursor = "pointer";
    buttonSpeakActive.addEventListener("click", function(evt) {
        playSound('soundClick3');
        toggleSpeech(false);
    });

    buttonReplay.cursor = "pointer";
    buttonReplay.addEventListener("click", function(evt) {
        playSound('soundClick');
        goPage('main');
    });
    buttonFacebook.cursor = "pointer";
    buttonFacebook.addEventListener("click", function(evt) {
        share('facebook');
    });
    buttonTwitter.cursor = "pointer";
    buttonTwitter.addEventListener("click", function(evt) {
        share('twitter');
    });
    buttonWhatsapp.cursor = "pointer";
    buttonWhatsapp.addEventListener("click", function(evt) {
        share('whatsapp');
    });

    //confirm
    buttonConfirm.cursor = "pointer";
    buttonConfirm.addEventListener("click", function(evt) {
        playSound('soundClick');
        toggleConfirm(false);
        stopGame(true);
        goPage('main');
    });

    buttonCancel.cursor = "pointer";
    buttonCancel.addEventListener("click", function(evt) {
        playSound('soundClick');
        toggleConfirm(false);
    });

    itemExit.addEventListener("click", function(evt) {});

    //options
    buttonSoundOff.cursor = "pointer";
    buttonSoundOff.addEventListener("click", function(evt) {
        toggleGameMute(true);
    });

    buttonSoundOn.cursor = "pointer";
    buttonSoundOn.addEventListener("click", function(evt) {
        toggleGameMute(false);
    });

    buttonFullscreen.cursor = "pointer";
    buttonFullscreen.addEventListener("click", function(evt) {
        toggleFullScreen();
    });

    buttonSettings.cursor = "pointer";
    buttonSettings.addEventListener("click", function(evt) {
        toggleOption();
    });

    buttonExit.cursor = "pointer";
    buttonExit.addEventListener("click", function(evt) {
        toggleConfirm(true);
        toggleOption();
        betContainer.visible = false;
        document.getElementById("betbutton").style.display = "none";

    });

    betbutton.cursor = "pointer";
    betbutton.addEventListener("click", function(evt) {
        betContainer.visible = true
        document.getElementById("betbutton").style.display = "block";
    })
    submitbutton.cursor = "pointer";
    submitbutton.addEventListener("click", function(evt) {
        // console.log(document.getElementById("betbutton").value);
        const bet = document.getElementById("betbutton").value;
        betamount = bet;
        if (bet > 0) {
            crestetransaction(bet);
            document.getElementById("gif").style.display = "block";
        }
    })
}
let transbet = {};
async function crestetransaction(bet) {
    const phantomWallet = cryptoUtils.phantomWallet;

    await phantomWallet.requestTransaction(Number(bet)).then(result => {
        {
            transbet = {
                "walletID": phantomWallet.wallet_pubkey,
                "gameName": "Guess Number Game",
                "userTransactionID": result,
                "typeOfPlay": "SOL",
                "betAmount": bet,
                "correctNumber": gameData.correctNumber,
            };
            Notify("Transaction Successful");
            document.getElementById("gif").style.display = "none";
            document.getElementById("betbutton").style.display = "none"
            buttonGuess.visible = true;
            betContainer.visible = false;
            betbutton.visible = false;
        }
    }).catch((err) => {
        Notify("Please Approve Transaction");
        document.getElementById("gif").style.display = "none";
        buttonGuess.visible = false;
    });
}
/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage = ''
var postData = {};
var winAmount;

function goPage(page) {
    curPage = page;

    mainContainer.visible = false;
    gameContainer.visible = false;
    resultContainer.visible = false;

    var targetContainer = ''
    switch (page) {
        case 'main':
            targetContainer = mainContainer;
            x50x.visible = true;
            x30x.visible = true;
            x20x.visible = true;
            x10x.visible = true;
            x5x.visible = true;
            x3x.visible = true;
            x2x.visible = true;
            x1x.visible = true;
            x05x.visible = true;
            x15x.visible = true;
            betbutton.visible = true;
            break;

        case 'game':
            targetContainer = gameContainer;
            startGame();
            break;

        case 'result':
            targetContainer = resultContainer;
            playSound('soundEnd');
            updateResultNumbers(playerData.turns);
            // console.log(playerData.turns);
            switch (playerData.turns) {
                case 1:
                    txtResult.text = winAmount = 50 * betamount;
                    break;
                case 2:
                    txtResult.text = winAmount = 30 * betamount;
                    break;
                case 3:
                    txtResult.text = winAmount = 20 * betamount;
                    break;
                case 4:
                    txtResult.text = winAmount = 10 * betamount;
                    break;
                case 5:
                    txtResult.text = winAmount = 5 * betamount;
                    break;
                case 6:
                    txtResult.text = winAmount = 3 * betamount;
                    break;
                case 7:
                    txtResult.text = winAmount = 2 * betamount;
                    break;
                case 8:
                    txtResult.text = winAmount = 1.5 * betamount;
                    break;
                case 9:
                    txtResult.text = winAmount = 1.5 * betamount;
                    break;
                case 10:
                    txtResult.text = winAmount = 1 * betamount;
                    break;
                case 11:
                    txtResult.text = winAmount = 1 * betamount;
                    break;
                case 12:
                    txtResult.text = winAmount = 0.5 * betamount;
                    break;
                case 13:
                    txtResult.text = winAmount = 0.5 * betamount;
                    break;
                default:
                    txtResult.text = winAmount = 0 * betamount;
            }
            postData = {
                ...transbet,
                "turns": playerData.turns,
                "amountWon": winAmount,
                "amountLost": winAmount != 0 ? 0 : transbet["betAmount"],
                "gameResult": winAmount > 0 ? "WIN" : "LOSS",
                'amountPaid': (winAmount - (winAmount * 0.015)),
            }
            axios.post(`${DB_URL}/api/numberGame`, {
                ...postData
            });
            stopGame();
            saveGame(playerData.turns);
            break;
    }

    targetContainer.alpha = 0;
    targetContainer.visible = true;
    $(targetContainer)
        .clearQueue()
        .stop(true, true)
        .animate({ alpha: 1 }, 500);

    resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame() {
    questionmark.visible = true;
    guessscreen.visible = false;
    gameData.guessStart = smallestNumber;
    gameData.guessEnd = largestNumber;
    gameData.guessArray = [];
    gameData.guessNumber = 0;
    playerData.turns = 0;
    gameData.paused = false;

    updateTurns();
    generateNumber();

    updateNumbers('left', gameData.guessStart);
    updateNumbers('center', '');
    updateNumbers('right', gameData.guessEnd);
}

/*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame() {
    TweenMax.killAll(false, true, false);
    toggleSpeech(false);
}

/*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score) {
    if (typeof toggleScoreboardSave == 'function') {
        $.scoreData.score = score;
        if (typeof type != 'undefined') {
            $.scoreData.type = type;
        }
        toggleScoreboardSave(true);
    }

    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          // console.log(result);
      }
    });*/
}

/*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame() {

}

/*!
 * 
 * GENERATE NUMBERS - This is the function that runs to generate random numbers
 * 
 */
function generateNumber() {
    gameData.correctNumber = Math.floor(Math.random() * (gameData.guessEnd - 1));
    gameData.correctNumber += 1;
}

/*!
 * 
 * ENTER NUMBERS - This is the function that runs to enter numbers
 * 
 */
function enterNumber(num) {
    if (gameData.paused) {
        return;
    }

    var finalNumber = '';
    for (g = 0; g < gameData.guessArray.length; g++) {
        finalNumber = finalNumber + gameData.guessArray[g];
    }
    finalNumber = finalNumber + num;
    finalNumber = finalNumber == '' ? 0 : finalNumber;
    finalNumber = Number(finalNumber);

    if (finalNumber < gameData.guessEnd) {
        gameData.guessArray.push(num);

        if (gameData.guessArray.length > 0) {
            questionmark.visible = false;
            guessscreen.visible = true;
        } else {
            questionmark.visible = true;
            guessscreen.visible = false;
        }

        gameData.guessNumber = finalNumber;
        updateNumbers('center', finalNumber);
    }
}

/*!
 * 
 * ENTER SPEECH NUMBERS - This is the function that runs to enter speech numbers
 * 
 */
function enterSpeechNumber(num) {
    var finalNumber = num;
    //if(finalNumber < gameData.guessEnd){
    questionmark.visible = false;
    guessscreen.visible = true;
    gameData.guessNumber = finalNumber;
    updateNumbers('center', finalNumber);
    checkNumber();
    //}
}

/*!
 * 
 * CLEAR NUMBERS - This is the function that runs to clear numbers
 * 
 */
function clearNumber() {
    if (gameData.paused) {
        return;
    }

    questionmark.visible = true;
    guessscreen.visible = false;
    gameData.guessArray = [];
    updateNumbers('center', '');
}

/*!
 * 
 * CHECK NUMBERS - This is the function that runs to check numbers
 * 
 */
function checkNumber() {
    if (gameData.paused) {
        return;
    }

    if (questionmark.visible) {
        return;
    }

    if (gameData.guessNumber <= gameData.guessStart || gameData.guessNumber >= gameData.guessEnd) {
        playSound('soundError');
        clearNumber();
        return;
    }

    playerData.turns++;
    updateTurns();
    // console.log(playerData.turns);
    switch (playerData.turns) {
        case 1:
            x50x.visible = false;
            break;
        case 2:
            x30x.visible = false;
            break;
        case 3:
            x20x.visible = false;
            break;
        case 4:
            x10x.visible = false;
            break;
        case 5:
            x5x.visible = false;
            break;
        case 6:
            x3x.visible = false;
            break;
        case 7:
            x2x.visible = false;
            break;
        case 9:
            x15x.visible = false;
            break;
        case 11:
            x1x.visible = false;
            break;
        case 13:
            x05x.visible = false;
            break;
        default:
            // code block
    }

    if (gameData.guessNumber == gameData.correctNumber) {
        gameData.paused = true;
        endGame();
        return;
    }

    if (gameData.guessNumber > gameData.correctNumber) {
        TweenMax.to(gameData, 1, {
            guessEnd: gameData.guessNumber,
            overwrite: true,
            onUpdate: function() {
                updateNumbers('right', Math.floor(gameData.guessEnd));
            }
        });
    } else {
        TweenMax.to(gameData, 1, {
            guessStart: gameData.guessNumber,
            overwrite: true,
            onUpdate: function() {
                updateNumbers('left', Math.floor(gameData.guessStart));
            }
        });
    }
    playSound('soundBetween');
    clearNumber();
}

/*!
 * 
 * UPDATE GAME NUMBERS - This is the function that runs to update game numbers
 * 
 */
function updateNumbers(side, num) {
    var textSpace = 140;
    var position_arr = [{ x: canvasW / 100 * 40, y: canvasH / 100 * 38, range: 250 },
        { x: canvasW / 1.55, y: canvasH / 100 * 38, range: 260 },
        { x: canvasW / 100 * 90, y: canvasH / 100 * 38, range: 250 }
    ];

    var posNum = 0;
    if (side == 'center') {
        posNum = 1;
    } else if (side == 'right') {
        posNum = 2;
    }

    var numString = num.toString();
    var maxLength = num.toString().length;

    var total = 0;
    var startX = 0;
    var scaleNum = 1;

    for (s = 0; s < 100; s++) {
        total = (maxLength * textSpace) * scaleNum;
        startX = position_arr[posNum].x - (total / 2);
        startX += (textSpace / 2) * scaleNum;

        if (total > position_arr[posNum].range) {
            scaleNum -= .1;
        } else {
            s = 100;
        }
    }

    for (k = 0; k < largestNumber.toString().length; k++) {
        if (k < maxLength) {
            var frameNum = numString.substring(k, k + 1);
            frameNum = Number(frameNum) - 1;
            frameNum = frameNum == -1 ? 9 : frameNum;

            $.numbers[side + k].gotoAndStop(frameNum);
            $.numbers[side + k].scaleX = $.numbers[side + k].scaleY = scaleNum;
            $.numbers[side + k].visible = true;

            $.numbers[side + k].x = startX;
            $.numbers[side + k].y = position_arr[posNum].y;
            startX += textSpace * scaleNum;
        } else {
            $.numbers[side + k].visible = false;
        }
    }
}

/*!
 * 
 * UPDATE RESULT NUMBERS - This is the function that runs to update result numbers
 * 
 */
function updateResultNumbers(num) {
    var textSpace = 140;
    var position_arr = [{ x: canvasW / 2, y: canvasH / 100 * 38 }];

    var side = 'result';
    var posNum = 0;
    var numString = num.toString();
    var maxLength = num.toString().length;

    var scaleNum = 1;
    var total = (maxLength * textSpace) * scaleNum;
    var startX = position_arr[posNum].x - (total / 2);
    startX += (textSpace / 2) * scaleNum;

    for (k = 0; k < 3; k++) {
        if (k < maxLength) {
            var frameNum = numString.substring(k, k + 1);
            frameNum = Number(frameNum) - 1;
            frameNum = frameNum == -1 ? 9 : frameNum;

            $.numbers[side + k].gotoAndStop(frameNum);
            $.numbers[side + k].visible = true;
            $.numbers[side + k].x = startX;
            $.numbers[side + k].y = position_arr[posNum].y;
            startX += textSpace * scaleNum;
        } else {
            $.numbers[side + k].visible = false;
        }
    }

    resultScoreTxt.x = startX + (textSpace / 3);
    resultScoreTxt.y = canvasH / 100 * 40;
    resultScoreShadowTxt.x = resultScoreTxt.x + 5;
    resultScoreShadowTxt.y = resultScoreTxt.y + 5;
}

/*!
 * 
 * UPDATE TURNS - This is the function that runs to update turns
 * 
 */
function updateTurns() {
    triedTxt.text = triedShadowTxt.text = triedText.replace('[NUMBER]', playerData.turns);
}

/*!
 * 
 * END GAME - This is the function that runs to end game
 * 
 */
function endGame() {
    for (k = 0; k < largestNumber.toString().length; k++) {
        var targetNumber = $.numbers['center' + k];
        if (targetNumber.visible) {
            var scaleNum = targetNumber.scaleX + .1;
            TweenMax.to(targetNumber, .5, { scaleX: scaleNum, scaleY: scaleNum, overwrite: true });
        }
    }

    playSound('soundWin');
    TweenMax.to(triedTxt, 3, {
        overwrite: true,
        onComplete: function() {
            goPage('result');
        }
    });
}


/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function toggleConfirm(con) {
    confirmContainer.visible = con;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption() {
    if (optionsContainer.visible) {
        optionsContainer.visible = false;
    } else {
        optionsContainer.visible = true;
    }
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con) {
    buttonSoundOff.visible = false;
    buttonSoundOn.visible = false;
    toggleMute(con);
    if (con) {
        buttonSoundOn.visible = true;
    } else {
        buttonSoundOff.visible = true;
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action) {
    gtag('event', 'click', { 'event_category': 'share', 'event_label': action });

    var loc = location.href
    loc = loc.substring(0, loc.lastIndexOf("/") + 1);
    var title = '';
    var text = '';
    title = shareTitle.replace("[SCORE]", playerData.turns);
    text = shareMessage.replace("[SCORE]", playerData.turns);
    var shareurl = '';

    if (action == 'twitter') {
        shareurl = 'https://twitter.com/intent/tweet?url=' + loc + '&text=' + text;
    } else if (action == 'facebook') {
        shareurl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(loc + 'share.php?desc=' + text + '&title=' + title + '&url=' + loc + '&thumb=' + loc + 'share.jpg&width=590&height=300');
    } else if (action == 'google') {
        shareurl = 'https://plus.google.com/share?url=' + loc;
    } else if (action == 'whatsapp') {
        shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
    }

    window.open(shareurl);
}