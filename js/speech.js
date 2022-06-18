////////////////////////////////////////////////////////////
// SPEECH
////////////////////////////////////////////////////////////
var speechLanguage = 'en-US';

var speechSupport = false;
var speechActive = false;
var recognizer;

/*!
 * 
 * INIT - This is the function that runs to init web speech
 * 
 */
function initSpeech(){
	displaySpeechError('');
	
	window.SpeechRecognition = window.SpeechRecognition ||
							window.webkitSpeechRecognition ||
							null;
							
	if(window.SpeechRecognition === null){
		speechSupport = false;
	}else{
		speechSupport = true;
		var changeLang = getParameterValue(window.location.href, 'lang');
		if(changeLang != ''){
			speechLanguage = changeLang;	
		}
		
		recognizer = new window.SpeechRecognition();
		recognizer.continuous = true;
		recognizer.lang = speechLanguage;
		recognizer.onresult = function(event) {
			if(!gameData.paused){
			   for (var i = event.resultIndex; i < event.results.length; i++) {
				  if (event.results[i].isFinal) {
					  confirmSpeechNumber(event.results[i][0].transcript);
					  //displaySpeechError('', event.results[i][0].transcript + ' (Confidence: ' + event.results[i][0].confidence + ')');
					  displaySpeechError('', event.results[i][0].transcript);
				  } else {
					  confirmSpeechNumber(event.results[i][0].transcript);
					  displaySpeechError('', event.results[i][0].transcript);
				  }
			   }
			}
		};
		
		recognizer.onstart = function(event) {
			speechActive = true;
			displaySpeechError('start');
		};
		
		recognizer.onend = function(event) {
			if(speechActive){
				speechActive = false;
				toggleSpeech(false);
				displaySpeechError('stop');
			}else{
				displaySpeechError('activate');		
			}
		};
		
		recognizer.onerror = function(event) {
			displaySpeechError(event.message);
		};
	}
}

/*!
 * 
 * TOGGLE SPEECH - This is the function that runs to toggle speech
 * 
 */
function toggleSpeech(con){
	if(!speechSupport){
		if(con)
			displaySpeechError('notsupport');
		return;
	}
	
	if(con){
		buttonSpeakActive.visible = true;
		recognizer.start();
		displaySpeechError('activate');
	}else{
		buttonSpeakActive.visible = false;
		recognizer.stop();
	}
}

/*!
 * 
 * DISPLAY SPEECH ERROR - This is the function that runs to display speech error message
 * 
 */
function displaySpeechError(error, message){
	toggleSpeechFade('');
	
	var msg = '';
	if(error == 'activate'){
		msg = 'Allow your microphone.';
		toggleSpeechFade('delayhide');
	}else if(error == 'notsupport'){
		msg = 'Web Speech is not supported by this browser.';
		toggleSpeechFade('delayhide');
	}else if(error == 'notnumber'){
		msg = 'Say only number...';
	}else if(error == 'start'){
		msg = 'Start saying a number...';
		toggleSpeechFade('fadein');
	}else if(error == 'stop'){
		msg = 'Web speech stop.';
		toggleSpeechFade('delayhide');
	}else{
		msg = message;	
	}
	speechShadowTxt.text = msg;
	speechTxt.text = msg;
}

/*!
 * 
 * TOGGLE SPEECH FADE - This is the function that runs to toggle speech fade
 * 
 */
function toggleSpeechFade(con){
	if(con == 'delayhide'){
		speechTxt.alpha = 1;
		TweenMax.to(speechTxt, .5, {delay:3, overwrite:true, onComplete:function(){
			displaySpeechError('');
		}});
	}else if(con == 'fadein'){
		TweenMax.to(speechTxt, .5, {alpha:1, overwrite:true, onComplete:toggleSpeechFade, onCompleteParams:['fadeout']});
	}else if(con == 'fadeout'){
		TweenMax.to(speechTxt, .5, {alpha:.5, overwrite:true, onComplete:toggleSpeechFade, onCompleteParams:['fadein']});
	}else{
		TweenMax.to(speechTxt, .5, {alpha:1, overwrite:true});	
	}
}

/*!
 * 
 * CONFIRM SPEECH NUMBERS - This is the function that runs to confirm speech numbers
 * 
 */
function confirmSpeechNumber(number){
	var finalNumber = Number(number);
	if(!isNaN(finalNumber)){
		enterSpeechNumber(finalNumber);
	}else{
		displaySpeechError('notnumber');
	}
}