////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload() {
    toggleLoader(true);

    checkMobileEvent();

    $(window).resize(function() {
        resizeGameFunc();
    });
    resizeGameFunc();

    loader = new createjs.LoadQueue(false);
    manifest = [
        { src: 'assets/background.png', id: 'background' },
        { src: 'assets/gameplay_screen.png', id: 'gameplayscreen' },
        // { src: 'assets/logo.png', id: 'logo' },
        { src: 'assets/board.png', id: 'board' },
        { src: 'assets/wallet_id.png', id: 'wallet' },
        { src: 'assets/wallet_balance.png', id: 'credit' },
        { src: 'assets/bet_button.png', id: 'betbutton' },
        { src: 'assets/button_start.png', id: 'buttonStart' },
        { src: 'assets/number_Spritesheet4x3.png', id: 'numbers' },
        { src: 'assets/number_dim_Spritesheet4x3.png', id: 'numbersDim' },
        { src: 'assets/button_number.png', id: 'buttonNumber' },
        { src: 'assets/bet_screen.png', id: 'betscreen' },
        { src: 'assets/button_submit.png', id: 'submitbutton' },
        { src: 'assets/guess_screen.png', id: 'guessscreen' },
        { src: 'assets/button_speak.png', id: 'buttonSpeak' },
        { src: 'assets/button_speak_active.png', id: 'buttonSpeakActive' },
        { src: 'assets/button_clear.png', id: 'buttonClear' },
        { src: 'assets/button_guess.png', id: 'buttonGuess' },
        { src: 'assets/arrow.png', id: 'arrow' },
        { src: 'assets/questionmark.png', id: 'questionmark' },
        { src: 'assets/button_facebook.png', id: 'buttonFacebook' },
        { src: 'assets/button_twitter.png', id: 'buttonTwitter' },
        { src: 'assets/button_whatsapp.png', id: 'buttonWhatsapp' },
        { src: 'assets/button_replay.png', id: 'buttonReplay' },

        { src: 'assets/button_confirm.png', id: 'buttonConfirm' },
        { src: 'assets/button_cancel.png', id: 'buttonCancel' },
        { src: 'assets/item_exit.png', id: 'itemExit' },
        { src: 'assets/button_fullscreen.png', id: 'buttonFullscreen' },
        { src: 'assets/button_sound_on.png', id: 'buttonSoundOn' },
        { src: 'assets/button_sound_off.png', id: 'buttonSoundOff' },
        { src: 'assets/button_exit.png', id: 'buttonExit' },
        { src: 'assets/button_settings.png', id: 'buttonSettings' },

        { src: 'assets/50x.png', id: 'x50x' },
        { src: 'assets/30x.png', id: 'x30x' },
        { src: 'assets/20x.png', id: 'x20x' },
        { src: 'assets/1.5x.png', id: 'x15x' },
        { src: 'assets/10x.png', id: 'x10x' },
        { src: 'assets/5x.png', id: 'x5x' },
        { src: 'assets/3x.png', id: 'x3x' },
        { src: 'assets/2x.png', id: 'x2x' },
        { src: 'assets/1x.png', id: 'x1x' },
        { src: 'assets/0.5x.png', id: 'x05x' },
        { src: 'assets/0.1x.png', id: 'x01x' },
        { src: 'assets/win_screen.png', id: "winscreen" },
    ];

    if (typeof addScoreboardAssets == 'function') {
        addScoreboardAssets();
    }

    soundOn = true;
    if ($.browser.mobile || isTablet) {
        if (!enableMobileSound) {
            soundOn = false;
        }
    }

    if (soundOn) {
        manifest.push({ src: 'assets/sounds/click.ogg', id: 'soundClick' });
        manifest.push({ src: 'assets/sounds/click2.ogg', id: 'soundClick2' });
        manifest.push({ src: 'assets/sounds/click3.ogg', id: 'soundClick3' });
        manifest.push({ src: 'assets/sounds/error.ogg', id: 'soundError' });
        manifest.push({ src: 'assets/sounds/win.ogg', id: 'soundWin' });
        manifest.push({ src: 'assets/sounds/between.ogg', id: 'soundBetween' });

        createjs.Sound.alternateExtensions = ["mp3"];
        loader.installPlugin(createjs.Sound);
    }

    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
    var item = evt.item;
    //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
    console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
    $('#mainLoader span').html('Loading... ' + Math.round(loader.progress / 1 * 100));
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
    toggleLoader(false);
    initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con) {
    if (con) {
        $('#mainLoader').show();
    } else {
        $('#mainLoader').hide();
    }
}