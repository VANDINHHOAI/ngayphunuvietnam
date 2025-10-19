const title = document.getElementById('title');
const button = document.getElementById('fillButton');
const music = document.getElementById('bgMusic');
const btn = document.getElementById('envelopeBtn');
const congratulationText = document.getElementById('congratulationText');
const btnShow = document.getElementById("envelopeBtn");
const gifts = ['🎁', '💝', '🎀', '💖', '🌸'];
const clickSound = new Audio("walkman-button.mp3");
clickSound.volume = 1; 
clickSound.load();
let fillPercent = 0;
let posX = 100, posY = 100; 
let velX = 2, velY = 2;     
const marginX = 20;  
const marginY = 50;  
btnShow.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader-container");
    const mainContent = document.getElementById("main-content");

    
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
            loader.style.display = "none";
            mainContent.style.display = "flex"; 
        }, 800);
    }, 10000);
});

document.addEventListener('touchstart', () => {
    clickSound.play().catch(()=>{});
    clickSound.pause();
    clickSound.currentTime = 0;
}, { once: true }); 


button.addEventListener('click', (e) => {
    clickSound.currentTime = 0; 
    clickSound.play();

    const gift = document.createElement('div');
    gift.classList.add('gift');
    gift.textContent = gifts[Math.floor(Math.random() * gifts.length)];


    const rect = button.getBoundingClientRect();
    gift.style.left = rect.left + rect.width / 2 + 'px';
    gift.style.top  = rect.top + rect.height / 2 + 'px';


    document.body.appendChild(gift);

    setTimeout(() => gift.remove(), 1600);

    if (fillPercent < 100) {
        fillPercent += 10;
        title.style.backgroundSize = `${fillPercent}% 100%`;
    } if (fillPercent >= 100) {
        button.disabled = true;
        button.innerText = "❤️";

        fillPercent = 100;
    
        setTimeout(() => {
            title.classList.add('glow');
            music.play();
            music.loop = true;

            
            setTimeout(startFlyUp, 5000);
        }, 1000);

        function startFlyUp() {
            title.style.transition = 'none';
            void title.offsetWidth;         
            title.classList.add('fly-up');  


            setTimeout(() => {
                congratulationText.classList.add('fly-down');
                startFlowerRain();
                setTimeout(() => {
                    btnShow.style.display = "block";
                }, 3000);
            }, 5000);
        }
    }
});

function moveButton() {
    const rect = btn.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    posX += velX;
    posY += velY;


    const minX = marginX;
    const maxX = screenWidth - rect.width - marginX;
    const minY = marginY;
    const maxY = screenHeight - rect.height - marginY;


    if (posX <= minX || posX >= maxX) velX *= -1;
    if (posY <= minY || posY >= maxY) velY *= -1;

    posX = Math.max(minX, Math.min(posX, maxX));
    posY = Math.max(minY, Math.min(posY, maxY));


    btn.style.left = posX + 'px';
    btn.style.top = posY + 'px';

    // gọi lại mỗi frame
    requestAnimationFrame(moveButton);
}


const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
posX = screenWidth / 2;
posY = screenHeight / 2;

btn.style.left = posX + 'px';
btn.style.top = posY + 'px';


moveButton();

setInterval(() => {
    velX = (Math.random() * 4 - 2) || 1; 
    velY = (Math.random() * 4 - 2) || 1;
}, 2000 + Math.random() * 2000);


function startFlowerRain() {
    const flowers = [
        '🌸', '🌷', '🌹', '🌺', '💮', '🌼', '🌻', '💐', '🥀', '🪷', '🌾', '🌿','🎁', '💝', '🎀', '💖',
    ];

    const interval = setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

        flower.style.left = Math.random() * window.innerWidth + 'px';
        flower.style.fontSize = 14 + Math.random() * 26 + 'px';
        flower.style.animationDuration = 4 + Math.random() * 4 + 's';


        const wind = Math.random() < 0.5 ? '-' : '';
        flower.style.animationName = Math.random() > 0.5 ? 'fall' : 'fall2';
        flower.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.6})`;

        if (Math.random() > 0.6) {
            flower.classList.add('glow');
        }

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 8000);
    }, 1000);

}

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const popupMessage = document.getElementById("popup-message");

const messageText =
    "Nhân ngày 20/10, chúc các Bà, các Mẹ, các Cô, các Dì, các chị em\n" +
    "có thật nhiều sức khỏe, luôn xinh đẹp " +
    "vui tươi và tràn đầy năng lượng yêu đời.";



let typingDone = false;


function typePopupText(index = 0) {
    if (index >= messageText.length) {

        typingDone = true;
        closeBtn.disabled = false;
        closeBtn.classList.remove("disabled");

        return;
    }

    const char = messageText.charAt(index);

    if (char === "\n") {
        popupMessage.appendChild(document.createElement("br"));
    } else {
        const span = document.createElement("span");
        span.innerHTML = char;
        span.style.animationDelay = `${index * 0.02}s`; 
        popupMessage.appendChild(span);
    }

    const randomDelay = 35 + Math.random() * 40;

    setTimeout(() => {
        requestAnimationFrame(() => typePopupText(index + 1));
    }, randomDelay);
    }

    if (btnShow && popup) {
    btnShow.addEventListener("click", () => {
        popup.style.display = "flex";
        popupMessage.innerHTML = "";
        typingDone = false;

        btnShow.style.display = "none";

        closeBtn.disabled = true;
        closeBtn.classList.add("disabled");

        typePopupText();
    });

    closeBtn.addEventListener("click", () => {
        if (typingDone) {
            popup.style.display = "none";
            btnShow.style.display = "block";
        } 
    });
}