// Get all DOM elements
const checkBox = document.querySelector('.powerCheckbox')
const displayText = document.querySelector('.displayText')
const textDisplay = document.querySelector('.textDisplay')
const padsRow1 = document.querySelectorAll('.key1, .key2, .key3, .key4')
const padsRow2 = document.querySelectorAll('.key5, .key6, .key7, .key8')
const padsRow3 = document.querySelectorAll('.key9, .key10, .key11, .key12')
const allPads = document.querySelectorAll('.box')
const volumeButton = document.querySelectorAll('.volumePlus, .volumeLess')
const volumeValue = document.querySelector('.volumeValue')
const volumePlus = document.querySelector('.volumePlus')
const volumeLess = document.querySelector('.volumeLess')

checkBox.addEventListener('change', () => 
{
    // If the checkbox is checked we can use the drum pad, and colors appears

    if(checkBox.checked)
    {
        document.documentElement.setAttribute('data-theme', 'fire');
        textDisplay.textContent = 'Welcome'
        window.addEventListener('keydown', audioPlay)
        allPads.forEach(pads => pads.addEventListener('transitionend', scaleRemove))
    }

    // If the toggle is not checked we can't use the drum pad and no colors or audio

    else
    {
        document.documentElement.setAttribute('data-theme', 'default');
        window.removeEventListener('keydown', audioPlay)
        textDisplay.textContent = ''
    }
})
// Function that plays audio when the key is pressed

function audioPlay(event) 
{
    // Take the audio according to the keyCode

    const audio = document.querySelector(`audio[data-key='${event.keyCode}']`)

    // Take the data-id of the audio selected to display it
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    // Take the keyCode from the key pressed

    const pads = document.querySelector(`.box[data-key='${event.keyCode}']`)

    // If no audio stop the function

    if(!audio)
    {
      return;
    }
    audio.currentTime = 0
    audio.play()
    pads.classList.add('pressed')
}

// Function that remove the scale and border after the key is pressed

function scaleRemove()
{
    this.classList.remove('pressed')
}

// function clickAudio(event)
// {
//     console.log(event)
// }

// allPads.forEach(pads => pads.addEventListener('click', clickAudio))


