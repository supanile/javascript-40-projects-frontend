const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new SpeechRecognize();
const btn = document.querySelector('.record');
const langSwitch = document.querySelector('.lang-switch');
const clearTextBtn = document.querySelector('.clear-text');
const currentLang = document.querySelector('.current-lang');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const message = document.querySelector('.message');

let isThaiLanguage = true;

function toggleLanguage() {
    isThaiLanguage = !isThaiLanguage;
    recognize.lang = isThaiLanguage ? "th-TH" : "en-US";
    
    // Update UI elements
    currentLang.textContent = isThaiLanguage ? "TH" : "EN";
    title.textContent = isThaiLanguage ? "แปลงเสียงพูดเป็นข้อความ" : "Voice to Text Converter";
    subtitle.textContent = isThaiLanguage ? "Voice to Text Converter" : "แปลงเสียงพูดเป็นข้อความ";
    langSwitch.textContent = isThaiLanguage ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย";
    clearTextBtn.textContent = isThaiLanguage ? "ล้างข้อความ" : "Clear Text";
    
    // Update button text
    if (btn.classList.contains('record')) {
        btn.textContent = isThaiLanguage ? "บันทึก" : "Record";
    } else {
        btn.textContent = isThaiLanguage ? "หยุด" : "Pause";
    }
}

function recordVoice() {
    const isRecord = btn.classList.contains('record');

    if (isRecord) {
        recognize.start();
        btn.classList.remove('record');
        btn.classList.add('pause');
        btn.innerText = isThaiLanguage ? "หยุด" : "Pause";
    } else {
        recognize.stop();
        btn.classList.remove('pause');
        btn.classList.add('record');
        btn.innerText = isThaiLanguage ? "บันทึก" : "Record";
    }
}

function setVoicetoText(e) {
    message.innerText += e.results[0][0].transcript;
}

function clearText() {
    message.innerText = '';
}

function continueRecord() {
    const isPause = btn.classList.contains('pause');
    if (isPause) {
        recognize.start();
    }
}

function setUpVoice() {
    recognize.lang = "th-TH";
    btn.addEventListener('click', recordVoice);
    langSwitch.addEventListener('click', toggleLanguage);
    clearTextBtn.addEventListener('click', clearText);
    recognize.addEventListener('result', setVoicetoText);
    recognize.addEventListener('end', continueRecord);
}

setUpVoice();