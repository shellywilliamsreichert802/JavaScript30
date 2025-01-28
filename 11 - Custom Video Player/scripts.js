/* Get Our Elements - selecting elements from the page*/
const player = document.querySelector('.player');
const video = player. querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build our first functions */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    //or
    // const method = ;
    // video[video.paused ? 'play' : 'pause']();
    //use terniary operatro to play otherwise pause then bc method name is in string call it video access the method name then call it ();  

    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'; //this is bound to video itself. If this.pause true then play icon otherwishe pause icon 
    console.log(icon);
    // toggle.textContent = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip) //parseFloat converts string to number
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress() {
    // video[this.name] = this.value;
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis =`${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e);
}

/* Hook up the event listeners */
// Play/pause when the toggle button is clicked
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//first checks mousedodwn if true goes to scrub if false won't run the scrub 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//CHALLENGE - add button when clicked to make fullscreen 