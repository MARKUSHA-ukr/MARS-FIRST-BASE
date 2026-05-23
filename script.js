
const glitchChars = "ABCDEF0123456789#%&@?$!X";

//GLITCH TEXT
function decodeText(element, finalValue = element.dataset.value || element.innerText, speed = 30) {
    if (element.glitchInterval) clearInterval(element.glitchInterval);
    if (!element.dataset.value) element.dataset.value = finalValue;

    let iteration = 0;
    
    element.glitchInterval = setInterval(() => {
        element.textContent = finalValue
            .split("")
            .map((letter, index) => {
                if (finalValue[index] === " ") return " ";
                if (index < iteration) return finalValue[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join("");

        if (iteration >= finalValue.length) {
            clearInterval(element.glitchInterval);
        }

        iteration += 1 / 3;
    }, speed);
}

//МОНІТОРИНГ РЕСУРСІВ 
const techItems = document.querySelectorAll('.tech p');
const baseStats = [
    { label: "Oxygen", value: 98.40, unit: "%" },
    { label: "Water", value: 12450, unit: "L" },
    { label: "Energy", value: 89.20, unit: "kW" },
    { label: "Control", value: 0.02, unit: "ms delay" }
];

function updateSystemStats() {
    techItems.forEach((item, i) => {
        if (!baseStats[i]) return;

        const fluctuation = (Math.random() * 0.4 - 0.2);
        const newValue = (baseStats[i].value + fluctuation).toFixed(2);
        
        item.innerHTML = `${baseStats[i].label} — ${newValue} ${baseStats[i].unit}`;
        item.style.color = newValue < baseStats[i].value ? '#ff7300' : 'white';
    });
}

// ЕФЕКТ ДРУКУ 
const subTitle = document.querySelector('.pidzagolowok');
let subTitleText = "";
let textPosition = 0;

if (subTitle) {
    subTitleText = subTitle.innerHTML; 
    subTitle.innerHTML = ''; 
    subTitle.style.opacity = '1'; 
}

function typeWriter() {
    if (!subTitle || textPosition >= subTitleText.length) return;

    if (subTitleText.substring(textPosition, textPosition + 4) === '<br>') {
        subTitle.innerHTML += '<br>';
        textPosition += 4;
    } else {
        subTitle.innerHTML += subTitleText.charAt(textPosition);
        textPosition++;
    }
    setTimeout(typeWriter, 40);
}

// ТАЙМЕР ЗВОРОТНОГО ВІДЛІКУ
const apecText = document.querySelector('.p_apec');
const targetDate = new Date('January 1, 2028 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (apecText) {
        apecText.textContent = `MISSION STATUS: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

//ЗАПУСК ПРИ ЗАВАНТАЖЕННІ
window.addEventListener('load', () => {
    typeWriter();
    updateCountdown();
    updateSystemStats();

    
    const timelinePs = document.querySelectorAll('.timeline p');
    timelinePs.forEach(p => {
        decodeText(p);
        p.addEventListener("mouseover", () => decodeText(p));
    });

    setInterval(updateCountdown, 1000); 
    setInterval(updateSystemStats, 2000); 
    setInterval(() => {
        const img = document.querySelector('.img_infa4');
        if (img) {
            img.style.filter = "hue-rotate(60deg) brightness(1.4) contrast(1.2)";
            img.style.transform = "scale(1.01)";
            setTimeout(() => {
                img.style.filter = "none";
                img.style.transform = "scale(1)";
            }, 150);
        }
    }, 6000); 
});

//модальне вікно
const vikno = document.getElementById('vikno_overlay');
const overlay = vikno;

const hreshchyk = document.querySelector('.modal-hreshchyk');
const menuBtn = document.querySelector('.menu_item[data-modal="about"]');

menuBtn.addEventListener('click', function(e) {
  e.preventDefault();
  vikno.classList.add('active');
});

vikno.addEventListener('click', function(e) {
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

hreshchyk.addEventListener('click', function() {
  vikno.classList.remove('active');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    overlay.classList.remove('active');
  }
});
