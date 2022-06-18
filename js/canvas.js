////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w, h) {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = w;
    gameCanvas.height = h;

    canvasW = w;
    canvasH = h;
    stage = new createjs.Stage("gameCanvas");

    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, numbersContainer, submitbutton, betContainer, txtResult, betscreen, winscreen, thumbContainer, gameContainer, bgContainer, objectsContainer, resultContainer;
var guideline, background, gameplayscreen, board, clearbutton, betbutton, wallet, credit, x50x, x30x, x20x, x10x, x5x, x3x, x2x, x1x, x05x, x01x, x15x,
    //logo,
    buttonStart, numbersData, numbersAnime, numbersDimData, guessscreen, numbersDimAnime, buttonNumber, buttonGuess, buttonClear, buttonSpeak, buttonSpeakActive, arrow1, arrow2, questionmark, triedTxt, triedShadowTxt, speechTxt, txtCredit, walletId, speechShadowTxt, resultShareTxt, resultScoreShadowTxt, resultScoreTxt, resultTitleShadowTxt, resultTitleTxt, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonReplay;

$.numbers = [];

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    numbersContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    betContainer = new createjs.Container();
    resultContainer = new createjs.Container();

    background = new createjs.Bitmap(loader.getResult('background'));

    // logo = new createjs.Bitmap(loader.getResult('logo'));
    buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
    centerReg(buttonStart);
    buttonStart.x = canvasW / 2;
    buttonStart.y = canvasH / 100 * 85;

    var _frameW = 120;
    var _frameH = 113;
    var _frame = { "regX": (_frameW / 2), "regY": (_frameH / 2), "height": _frameH, "count": 10, "width": _frameW };
    var _animations = { static: { frames: [9] } };

    numbersData = new createjs.SpriteSheet({
        "images": [loader.getResult("numbers").src],
        "frames": _frame,
        "animations": _animations
    });

    numbersAnime = new createjs.Sprite(numbersData, "static");
    numbersAnime.framerate = 20;

    var _frameW = 120;
    var _frameH = 120;
    var _frame = { "regX": (_frameW / 2), "regY": (_frameH / 2), "height": _frameH, "count": 10, "width": _frameW };
    var _animations = { static: { frames: [9] } };

    numbersDimData = new createjs.SpriteSheet({
        "images": [loader.getResult("numbersDim").src],
        "frames": _frame,
        "animations": _animations
    });

    numbersDimAnime = new createjs.Sprite(numbersDimData, "static");
    numbersDimAnime.framerate = 20;

    numbersAnime.x = -200;
    numbersDimAnime.x = -200;

    for (n = 0; n < largestNumber.toString().length; n++) {
        $.numbers['left' + n] = numbersDimAnime.clone();
        $.numbers['center' + n] = numbersAnime.clone();
        $.numbers['right' + n] = numbersDimAnime.clone();
        numbersContainer.addChild($.numbers['left' + n], $.numbers['center' + n], $.numbers['right' + n]);
    }
    buttonNumber = new createjs.Bitmap(loader.getResult('buttonNumber'));
    centerReg(buttonNumber);
    // console.log($.numbers['right0'].x);
    var keyStartX = canvasW / 100 * 6.5;
    var keyStartY = canvasH / 100 * 12;
    var keySpace = 150;
    // console.log($.numbers);
    for (n = 0; n < 10; n++) {
        $.numbers['keybg' + n] = buttonNumber.clone();
        $.numbers['keynumber' + n] = numbersAnime.clone();
        $.numbers['keynumber' + n].gotoAndStop(n);
        if (n == 3) {
            keyStartX = canvasW / 100 * 6.5;
            keyStartY = canvasH / 100 * 32;
        } else if (n == 6) {
            keyStartX = canvasW / 100 * 6.5;
            keyStartY = canvasH / 100 * 52;
        } else if (n == 9) {
            keyStartX = canvasW / 100 * 16;
            keyStartY = canvasH / 100 * 72;
        }
        $.numbers['keybg' + n].x = keyStartX
        $.numbers['keybg' + n].y = keyStartY;
        $.numbers['keynumber' + n].x = $.numbers['keybg' + n].x;
        $.numbers['keynumber' + n].y = $.numbers['keybg' + n].y - 5;
        $.numbers['keynumber' + n].scaleX = $.numbers['keynumber' + n].scaleY = 1;
        keyStartX += keySpace;
        numbersContainer.addChild($.numbers['keybg' + n], $.numbers['keynumber' + n]);

    }

    buttonGuess = new createjs.Bitmap(loader.getResult('buttonGuess'));
    centerReg(buttonGuess);
    buttonGuess.visible = false;
    buttonClear = new createjs.Bitmap(loader.getResult('buttonClear'));
    centerReg(buttonClear);
    buttonSpeak = new createjs.Bitmap(loader.getResult('buttonSpeak'));
    centerReg(buttonSpeak);
    buttonSpeakActive = new createjs.Bitmap(loader.getResult('buttonSpeakActive'));
    centerReg(buttonSpeakActive);
    gameplayscreen = new createjs.Bitmap(loader.getResult('gameplayscreen'));


    buttonGuess.x = canvasW / 1.75;
    buttonGuess.y = canvasH / 100 * 65;

    buttonSpeak.x = canvasW / 100 * 26;
    buttonSpeak.y = canvasH / 100 * 65.5;
    buttonSpeakActive.x = buttonSpeak.x;
    buttonSpeakActive.y = buttonSpeak.y;
    buttonSpeakActive.visible = false;
    buttonClear.x = canvasW / 3.92;
    buttonClear.y = canvasH / 1.4;

    arrow1 = new createjs.Bitmap(loader.getResult('arrow'));
    centerReg(arrow1);
    arrow2 = new createjs.Bitmap(loader.getResult('arrow'));
    centerReg(arrow2);

    arrow1.x = canvasW / 100 * 50;
    arrow2.x = canvasW / 100 * 80;
    arrow2.y = arrow1.y = canvasH / 100 * 38;

    questionmark = new createjs.Bitmap(loader.getResult('questionmark'));
    centerReg(questionmark);
    questionmark.x = canvasW / 1.55;
    questionmark.y = canvasH / 100 * 38;

    guessscreen = new createjs.Bitmap(loader.getResult('guessscreen'));
    centerReg(guessscreen);
    guessscreen.x = canvasW / 1.55;
    guessscreen.y = canvasH / 100 * 38;

    triedTxt = new createjs.Text();
    triedTxt.font = "40px crewniversemedium";
    triedTxt.color = "#179690";
    triedTxt.text = '00:00';
    triedTxt.textAlign = "center";
    triedTxt.textBaseline = 'alphabetic';
    triedTxt.x = canvasW / 1.55;
    triedTxt.y = canvasH / 100 * 18;

    triedShadowTxt = new createjs.Text();
    triedShadowTxt.font = "40px crewniversemedium";
    triedShadowTxt.color = "#000";
    triedShadowTxt.text = '00:00';
    triedShadowTxt.alpha = .2;
    triedShadowTxt.textAlign = "center";
    triedShadowTxt.textBaseline = 'alphabetic';
    triedShadowTxt.x = triedTxt.x + 5;
    triedShadowTxt.y = triedTxt.y + 5;

    speechTxt = new createjs.Text();
    speechTxt.font = "25px crewniversemedium";
    speechTxt.color = "#fff";
    speechTxt.text = '';
    speechTxt.textAlign = "center";
    speechTxt.textBaseline = 'alphabetic';
    speechTxt.x = canvasW / 2;
    speechTxt.y = canvasH / 100 * 55;

    speechShadowTxt = new createjs.Text();
    speechShadowTxt.font = "25px crewniversemedium";
    speechShadowTxt.color = "#000";
    speechShadowTxt.text = '';
    speechShadowTxt.alpha = .2;
    speechShadowTxt.textAlign = "center";
    speechShadowTxt.textBaseline = 'alphabetic';
    speechShadowTxt.x = speechTxt.x + 3;
    speechShadowTxt.y = speechTxt.y + 3;

    overlayBetBg = new createjs.Shape();
    overlayBetBg.graphics.beginFill('#ffffff').drawRect(0, 0, canvasW, canvasH);
    overlayBetBg.alpha = .8;

    overlayBg = new createjs.Shape();
    overlayBg.graphics.beginFill('#ffffff').drawRect(0, 0, canvasW, canvasH);
    overlayBg.alpha = .8;

    //result
    resultTitleTxt = new createjs.Text();
    resultTitleTxt.font = "80px crewniversemedium";
    resultTitleTxt.color = "#179690";
    resultTitleTxt.text = resultTitleText;
    resultTitleTxt.textAlign = "center";
    resultTitleTxt.textBaseline = 'alphabetic';
    resultTitleTxt.x = canvasW / 2;
    resultTitleTxt.y = canvasH / 100 * 23;

    resultTitleShadowTxt = new createjs.Text();
    resultTitleShadowTxt.font = "80px crewniversemedium";
    resultTitleShadowTxt.color = "#000";
    resultTitleShadowTxt.text = resultTitleText;
    resultTitleShadowTxt.alpha = .2;
    resultTitleShadowTxt.textAlign = "center";
    resultTitleShadowTxt.textBaseline = 'alphabetic';
    resultTitleShadowTxt.x = resultTitleTxt.x + 10;
    resultTitleShadowTxt.y = resultTitleTxt.y + 10;

    resultScoreTxt = new createjs.Text();
    resultScoreTxt.font = "50px crewniversemedium";
    resultScoreTxt.color = "#179690";
    resultScoreTxt.text = resultScoreDesc;
    resultScoreTxt.textAlign = "center";
    resultScoreTxt.textBaseline = 'alphabetic';

    resultScoreShadowTxt = new createjs.Text();
    resultScoreShadowTxt.font = "50px crewniversemedium";
    resultScoreShadowTxt.color = "#000";
    resultScoreShadowTxt.text = resultScoreDesc;
    resultScoreShadowTxt.alpha = .2;
    resultScoreShadowTxt.textAlign = "center";
    resultScoreShadowTxt.textBaseline = 'alphabetic';

    resultShareTxt = new createjs.Text();
    resultShareTxt.font = "30px crewniversemedium";
    resultShareTxt.color = "#179690";
    resultShareTxt.text = shareText;
    resultShareTxt.textAlign = "center";
    resultShareTxt.textBaseline = 'alphabetic';
    resultShareTxt.x = canvasW / 2;
    resultShareTxt.y = canvasH / 100 * 55;

    x50x = new createjs.Bitmap(loader.getResult('x50x'));
    x30x = new createjs.Bitmap(loader.getResult('x30x'));
    x20x = new createjs.Bitmap(loader.getResult('x20x'));
    x10x = new createjs.Bitmap(loader.getResult('x10x'));
    x5x = new createjs.Bitmap(loader.getResult('x5x'));
    x3x = new createjs.Bitmap(loader.getResult('x3x'));
    x2x = new createjs.Bitmap(loader.getResult('x2x'));
    x1x = new createjs.Bitmap(loader.getResult('x1x'));
    x05x = new createjs.Bitmap(loader.getResult('x05x'));
    x01x = new createjs.Bitmap(loader.getResult('x01x'));
    x15x = new createjs.Bitmap(loader.getResult('x15x'));
    centerReg(x50x, x30x, x20x, x10x, x5x, x3x, x2x, x1x, x05x, x01x, x15x);
    x30x.y = x20x.y = x10x.y = x5x.y = x3x.y = x2x.y = x1x.y = x05x.y = x01x.y = x15x.y = canvasH / 100 * 82;
    x01x.x = canvasW / 100 * 84.5; //100 * 84.5
    x05x.x = canvasW / 100 * 84.5; //100 * 75.5
    x1x.x = canvasW / 100 * 75.5; //100 * 66.5
    x15x.x = canvasW / 100 * 66.5;
    x2x.x = canvasW / 100 * 57; //100 * 57
    x3x.x = canvasW / 100 * 48;
    x5x.x = canvasW / 100 * 38.5;
    x10x.x = canvasW / 100 * 29.5;
    x20x.x = canvasW / 100 * 20.5;
    x30x.x = canvasW / 100 * 11;
    x50x.x = canvasW / 100 * 6.5;
    x50x.y = canvasH / 100 * 88;

    buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
    buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFacebook.x = canvasW / 100 * 42;
    buttonTwitter.x = canvasW / 2;
    buttonWhatsapp.x = canvasW / 100 * 58;
    buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH / 100 * 63;

    buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
    centerReg(buttonReplay);
    buttonReplay.x = canvasW / 2;
    buttonReplay.y = canvasH / 100 * 78;

    for (n = 0; n < 3; n++) {
        $.numbers['result' + n] = numbersAnime.clone();
        resultContainer.addChild($.numbers['result' + n]);
    }

    confirmContainer = new createjs.Container();
    optionsContainer = new createjs.Container();

    //option
    buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;
    buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
    centerReg(buttonSettings);

    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
    optionsContainer.visible = false;

    //exit
    itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
    centerReg(itemExit);
    itemExit.x = canvasW / 2;
    itemExit.y = canvasH / 2;

    buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
    centerReg(buttonConfirm);
    createHitarea(buttonConfirm)
    buttonConfirm.x = canvasW / 100 * 40;
    buttonConfirm.y = canvasH / 100 * 52;

    buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
    centerReg(buttonCancel);
    createHitarea(buttonCancel)
    buttonCancel.x = canvasW / 100 * 60;
    buttonCancel.y = canvasH / 100 * 52;

    confirmMessageTxt = new createjs.Text();
    confirmMessageTxt.font = "40px crewniversemedium";
    confirmMessageTxt.lineHeight = 65;
    confirmMessageTxt.color = "#179690";
    confirmMessageTxt.textAlign = "center";
    confirmMessageTxt.textBaseline = 'alphabetic';
    // confirmMessageTxt.text = exitMessage;
    confirmMessageTxt.x = canvasW / 2;
    confirmMessageTxt.y = canvasH / 100 * 40;

    confirmContainer.addChild(overlayBg, itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
    confirmContainer.visible = false;
    board = new createjs.Bitmap(loader.getResult('board'));
    // clearbutton = new createjs.Bitmap(loader.getResult('clearbutton'));
    // centerReg(clearbutton);
    // clearbutton.x = canvasW / 4;
    // clearbutton.y = canvasH / 1.4;    \
    betscreen = new createjs.Bitmap(loader.getResult('betscreen'));
    centerReg(betscreen);
    betscreen.x = canvasW / 2;
    betscreen.y = canvasH / 2;

    winscreen = new createjs.Bitmap(loader.getResult('winscreen'));
    centerReg(winscreen);
    winscreen.x = canvasW / 2;
    winscreen.y = canvasH / 2;

    submitbutton = new createjs.Bitmap(loader.getResult('submitbutton'));
    centerReg(submitbutton);
    submitbutton.x = canvasW / 2;
    submitbutton.y = canvasH / 1.3;

    var x = document.createElement("INPUT");
    x.setAttribute("type", "number");
    x.setAttribute("id", "betbutton");
    x.setAttribute("min", "0.05");
    x.setAttribute("step", "0.05");
    x.setAttribute("value", "0.00");
    x.setAttribute("max", "2");
    x.setAttribute("onKeyPress", "return false;");
    x.style.position = "absolute";
    x.style.left = "34.5vw";
    x.style.top = "54vh";
    x.style.textAlign = "center";
    x.style.border = "none";
    x.style.outline = "none";
    x.style.background = "transparent";
    x.style.width = "475px";
    x.style.borderRight = "50px"
    x.style.height = "65px";
    x.style.fontSize = "50px";
    x.style.caretColor = 'transparent';
    x.style.display = "none";
    document.body.appendChild(x);

    betContainer.addChild(overlayBetBg, betscreen, submitbutton);
    betContainer.visible = false;
    betbutton = new createjs.Bitmap(loader.getResult('betbutton'));
    centerReg(betbutton);
    betbutton.x = canvasW / 15.5;
    betbutton.y = canvasH / 1.4;

    walletId = new createjs.Text();
    walletId.font = "29px bold";
    walletId.color = "black";
    walletId.textAlign = "left";
    walletId.textBaseline = 'alphabetic';

    walletId.x = canvasW / 100 * 74.5;
    walletId.y = canvasH / 13;

    txtCredit = new createjs.Text();
    txtCredit.font = "31px bold";
    txtCredit.color = "black";
    txtCredit.text = 0;
    txtCredit.textAlign = "left";
    txtCredit.textBaseline = 'alphabetic';

    txtCredit.x = canvasW / 100 * 40;
    txtCredit.y = canvasH / 13;


    txtResult = new createjs.Text();
    txtResult.font = "31px bold";
    txtResult.color = "black";
    txtResult.text = 0;
    txtResult.textAlign = "center";
    txtResult.textBaseline = 'alphabetic';

    txtResult.x = canvasW / 100 * 50;
    txtResult.y = canvasH / 1.9;



    wallet = new createjs.Bitmap(loader.getResult('wallet'));
    centerReg(wallet);
    wallet.x = canvasW / 100 * 80;
    wallet.y = canvasH / 16;

    credit = new createjs.Bitmap(loader.getResult('credit'));
    centerReg(credit);
    credit.x = canvasW / 100 * 45;
    credit.y = canvasH / 16;

    if (guide) {
        guideline = new createjs.Shape();
        guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }
    mainContainer.addChild(
        //logo,
        buttonStart);
    gameContainer.addChild(gameplayscreen, numbersAnime, arrow2, arrow1, questionmark, guessscreen, x50x, x30x, x20x, x10x, x5x, x3x, x2x, x1x, x15x, x05x, board, clearbutton, betbutton, numbersContainer, buttonGuess, buttonClear, triedShadowTxt, triedTxt, speechShadowTxt, speechTxt, betContainer, credit, wallet, walletId, txtCredit);
    resultContainer.addChild(
        winscreen, txtResult,
        buttonReplay);
    if (shareEnable) {
        resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
    }

    canvasContainer.addChild(background, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage.addChild(canvasContainer);

    resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings.x = (canvasW - offset.x) - 60;
        buttonSettings.y = offset.y + 45;

        var distanceNum = 75;
        if (curPage != 'game') {
            buttonExit.visible = false;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + (distanceNum);

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);
        } else {
            buttonExit.visible = true;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + (distanceNum);

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);

            buttonExit.x = buttonSettings.x;
            buttonExit.y = buttonSettings.y + (distanceNum * 3);
        }
    }
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
    updateGame();
    stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}