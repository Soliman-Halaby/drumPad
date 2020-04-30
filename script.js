// Get all DOM elements
const checkBox = document.querySelector('.powerCheckbox')
const displayText = document.querySelector('.displayText')
const textDisplay = document.querySelector('.textDisplay')
const padsRow1 = document.querySelectorAll('.key1, .key2, .key3, .key4')
const padsRow2 = document.querySelectorAll('.key5, .key6, .key7, .key8')
const padsRow3 = document.querySelectorAll('.key9, .key10, .key11, .key12')
const allPads = document.querySelectorAll('.box')
const volumeInput = document.querySelector('.volumeInput')
const volumeDisplay = document.querySelector('.volumeDisplay')


// volumeInput.addEventListener('click', () => 
// {
//     console.log(volumeInput.value)
//     audio.volume = volumeInput.value
// })

checkBox.addEventListener('change', () => 
{
    // If the checkbox is checked we can use the drum pad, and colors appears

    if(checkBox.checked)
    {
        volumeDisplay.textContent = Math.floor(volumeInput.value * 100)
        document.documentElement.setAttribute('data-theme', 'fire');
        textDisplay.textContent = 'Welcome'
        window.addEventListener('keydown', audioPlay)
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].addEventListener('click', clickAudio)
        }
        allPads.forEach(pads => pads.addEventListener('transitionend', scaleRemove))
        volumeInput.addEventListener('mousemove', () =>
        {
            volumeDisplay.textContent = Math.floor(volumeInput.value * 100)
        })
    }

    // If the toggle is not checked we can't use the drum pad and no colors or audio

    else
    {
        volumeDisplay.textContent = ""
        document.documentElement.setAttribute('data-theme', 'default');
        textDisplay.textContent = ''
        window.removeEventListener('keydown', audioPlay)
        for (let i = 0; i < allPads.length; i++) 
        {
            allPads[i].removeEventListener('click', clickAudio)
        }
        volumeInput.addEventListener('mousemove', () =>
        {
            volumeDisplay.textContent = ""
        })
    }
})
// Function that plays audio when the key is pressed

function audioPlay(event) 
{
    // Take the audio according to the keyCode

    const audio = document.querySelector(`audio[data-key='${event.keyCode}']`)
    if(!audio)
    {
      return;
    }
    
    // Take the data-id of the audio selected to display it
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    // Take the keyCode from the key pressed

    const pads = document.querySelector(`.box[data-key='${event.keyCode}']`)
    audio.volume = volumeInput.value
    // If no audio stop the function

    audio.currentTime = 0
    audio.play()
    pads.classList.add('pressed')
}

// Function to play audio on click

function clickAudio(event) {

    // Take the elements depending on the click

    const padsName = event.srcElement.className;
    const padsClass = document.querySelector(`.box[class='${padsName}']`)
    const padsKey = padsClass.getAttribute("data-key")

    // Take each pad, and add the class pressed if clicked 
    
    const pads = document.querySelector(`.box[data-key='${padsKey}']`)
    pads.classList.add('pressed')
    const audio = document.querySelector(`audio[data-key='${padsKey}']`)
    if(!audio) {
      return;
    }
    audio.volume = volumeInput.value
    const nameAudio = audio.getAttribute('data-id')
    textDisplay.textContent = nameAudio

    audio.currentTime = 0
    audio.play()
}

// Function that remove the scale and border after the key is pressed

function scaleRemove()
{
    this.classList.remove('pressed')
}
