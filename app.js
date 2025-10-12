const title = document.getElementById('title');
const button = document.getElementById('fillButton');
const music = document.getElementById('bgMusic');
const btn = document.getElementById('envelopeBtn');
const congratulationText = document.getElementById('congratulationText');
const btnShow = document.getElementById("envelopeBtn");
const gifts = ['🎁', '💝', '🎀', '💖', '🌸'];
let fillPercent = 0;
let posX = 100, posY = 100; // vị trí ban đầu
let velX = 2, velY = 2;     // vận tốc ban đầu
const marginX = 20;  // khoảng cách mép trái/phải
const marginY = 50;  // khoảng cách mép trên/dưới
btnShow.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader-container");
    const mainContent = document.getElementById("main-content");

    // Ẩn loader sau 10 giây (thời gian animation)
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
        loader.style.display = "none";
        mainContent.style.display = "flex"; // Hiện nội dung trang
        }, 800);
    }, 10000);
});


button.addEventListener('click', (e) => {
    const gift = document.createElement('div');
    gift.classList.add('gift');
    gift.textContent = gifts[Math.floor(Math.random() * gifts.length)];

    // tính vị trí ngẫu nhiên quanh nút cho sinh động
    const offsetX = (Math.random() - 0.5) * 100; // lệch trái/phải
    gift.style.left = `${e.target.offsetLeft + e.target.offsetWidth / 2 + offsetX}px`;

    // thêm vào trang
    document.body.appendChild(gift);

    // xoá sau khi animation kết thúc
    setTimeout(() => gift.remove(), 1600);

    if (fillPercent < 100) {
        fillPercent += 10;
        title.style.backgroundSize = `${fillPercent}% 100%`;
    } if (fillPercent >= 100) {
        button.disabled = true;
        button.innerText = "❤️";

        fillPercent = 100;
    
        setTimeout(() => {
            // Bắt đầu hiệu ứng sáng + nhạc
            title.classList.add('glow');
            music.play();
            music.loop = true;

            // Sau 5 giây => chữ bay lên
            setTimeout(startFlyUp, 5000);
        }, 1000);

        function startFlyUp() {
            title.style.transition = 'none'; // tắt transition cũ
            void title.offsetWidth;          // ép reflow
            title.classList.add('fly-up');   // bay lên

            // Sau 5 giây kể từ khi bay lên => hiện chữ khác
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

    // cập nhật vị trí
    posX += velX;
    posY += velY;

    // vùng giới hạn
    const minX = marginX;
    const maxX = screenWidth - rect.width - marginX;
    const minY = marginY;
    const maxY = screenHeight - rect.height - marginY;

    // chạm biên -> đổi hướng
    if (posX <= minX || posX >= maxX) velX *= -1;
    if (posY <= minY || posY >= maxY) velY *= -1;

    // giữ vị trí trong vùng hợp lệ
    posX = Math.max(minX, Math.min(posX, maxX));
    posY = Math.max(minY, Math.min(posY, maxY));

    // áp dụng vị trí mới
    btn.style.left = posX + 'px';
    btn.style.top = posY + 'px';

    // gọi lại mỗi frame
    requestAnimationFrame(moveButton);
}

// Đặt vị trí ban đầu ở giữa vùng giới hạn
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
posX = screenWidth / 2;
posY = screenHeight / 2;

btn.style.left = posX + 'px';
btn.style.top = posY + 'px';

// Bắt đầu di chuyển
moveButton();

// Đổi hướng ngẫu nhiên mỗi 2–4 giây
setInterval(() => {
    velX = (Math.random() * 4 - 2) || 1; // tránh 0
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

        // gió thổi ngẫu nhiên
        const wind = Math.random() < 0.5 ? '-' : '';
        flower.style.animationName = Math.random() > 0.5 ? 'fall' : 'fall2';
        flower.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.6})`;

        if (Math.random() > 0.6) {
            flower.classList.add('glow');
        }

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 8000);
    }, 1000);

    // setTimeout(() => clearInterval(interval), 100000);
}

// ========= Hiển thị popup và đánh chữ bên trong =========
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const popupMessage = document.getElementById("popup-message");

const messageText =
    "Nhân ngày 20/10, chúc các Bà, các Mẹ, các Cô, các Dì, các chị em\n" +
    "có thật nhiều sức khỏe, luôn xinh đẹp " +
    "vui tươi và tràn đầy năng lượng yêu đời.";



let typingDone = false;

// --- Hiệu ứng đánh chữ mượt + tự nhiên --- //
function typePopupText(index = 0) {
    if (index >= messageText.length) {
        // ✅ Hoàn tất đánh chữ
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
        span.style.animationDelay = `${index * 0.02}s`; // tạo cảm giác nhịp đều
        popupMessage.appendChild(span);
    }

    const randomDelay = 35 + Math.random() * 40;

    setTimeout(() => {
        requestAnimationFrame(() => typePopupText(index + 1));
    }, randomDelay);
    }

    // --- Mở popup và chạy hiệu ứng --- //
    if (btnShow && popup) {
    btnShow.addEventListener("click", () => {
        popup.style.display = "flex";
        popupMessage.innerHTML = "";
        typingDone = false;

        btnShow.style.display = "none";

        // 🔒 Vô hiệu hóa nút tắt trong khi đang đánh chữ
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
