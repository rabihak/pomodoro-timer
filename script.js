let numb = document.querySelector(".numb");
let workTime = document.querySelector(".work");
let brakeTime = document.querySelector(".brake");
const workUpButton = document.querySelector(".work-up-button");
const workDownButton = document.querySelector(".work-down-button");
const brakeUpButton = document.querySelector(".brake-up-button");
const brakeDownButton = document.querySelector(".brake-down-button");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
let i = null;

const timeChosers = () => {
    const limiter = () => {
        if (workTime.textContent < 0) {
            workTime.textContent = 0;
        }
        if (workTime.textContent > 1000) {
            workTime.textContent = 1000;
        }
        if (brakeTime.textContent < 0) {
            brakeTime.textContent = 0;
        }
        if (brakeTime.textContent > 1000) {
            brakeTime.textContent = 1000;
        }
    }
    const sync = (e) => {
        numb.textContent = e + " min";
        document.title = e + ' min left ';
    }
    workUpButton.addEventListener('click', () => {
        workTime.textContent++;
        limiter();
        sync(workTime.textContent);
    })
    workDownButton.addEventListener('click', () => {
        workTime.textContent--;
        limiter();
        sync(workTime.textContent);

    })
    brakeUpButton.addEventListener('click', () => {
        brakeTime.textContent++;
        limiter();
    })
    brakeDownButton.addEventListener('click', () => {
        brakeTime.textContent--;
        limiter();
    })
}
timeChosers();
let hideIcons = () => {
    let icon = document.querySelectorAll(".icon");
    for (let i = 0; i < 4; i++) {
        icon[i].style.display = "none";
    }
}
let displayIcons = () => {
    let icon = document.querySelectorAll(".icon");
    for (let i = 0; i < 4; i++) {
        icon[i].style.display = "block";
    }
}
let removeAnimation = () => {
    document.querySelector(".right-progress").style.removeProperty('animation');
    document.querySelector(".left-progress").style.removeProperty('animation');
}
let showAnimation = () => {
    document.querySelector(".right-progress").style.animation = " right 60s linear infinite both";
    document.querySelector(".left-progress").style.animation = " left 60s linear infinite both";
}
let updateTitle = (e) => {
    document.title = e + " min left";
}
let updateAnimationColor = (e) => {
    document.querySelector(".progress").style.background = e;
}
let initialCount = numb.textContent;
const playSound = (e) => {
    var audio = new Audio(e);
    audio.play();
}

startButton.addEventListener('click', () => {
    playSound("button-37a.mp3");
    let counter = numb.textContent;
    let co = parseInt(counter);
    updateTitle(co)
    showAnimation()

    hideIcons();
    i = setInterval(() => {
        updateAnimationColor("#ff1744");
        if (co == 0) {
            playSound("button-42.mp3");
            removeAnimation();
            clearInterval(i);

            //brake part
            showAnimation()
            let counter = brakeTime.textContent;
            let co1 = parseInt(counter);
            updateTitle(co1)
            numb.textContent = brakeTime.textContent + " min";
            updateAnimationColor("#4eb944");
            i = setInterval(() => {
                if (co1 == 0) {
                        playSound("button-42.mp3");
                    removeAnimation()
                    playSound("button-16.mp3");
                    displayIcons();
                    removeAnimation()
                    clearInterval(i);
                    let counter1 = workTime.textContent;
                    numb.textContent = workTime.textContent + "min"
                    clearInterval(i);
                } else {
                    co1--;
                    numb.textContent = co1 + " min";
                    updateTitle(co1)
                }
            },60000);            
            //brake end
            return;
        } else {
            co--;
            numb.textContent = co + " min";
            updateTitle(co)
        }
        
    },60000);
    pauseButton.addEventListener('click', () => {
        playSound("button-16.mp3");
        displayIcons();
        removeAnimation()
        clearInterval(i);

    })
    resetButton.addEventListener('click', () => {
        playSound("button-16.mp3");
        displayIcons();
        removeAnimation()
        clearInterval(i);
        let counter = workTime.textContent;
        numb.textContent = workTime.textContent + "min";
    })
})