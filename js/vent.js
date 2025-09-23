/* Авто-конвейер с 127 предметами */

const COUNT = 127;

// создаём предметы
const items = Array.from({length: COUNT}, (_, i) => {
  return {
    id: i+1,
    name: `Item ${i+1}`,
    icon: pickIcon(i),
    value: Math.floor(Math.random()*20)+1 // "доход в сек", пока случайный
  };
});

function pickIcon(i){
  const icons = ["🔧","📦","⚙️","🔩","💎","🪙","⚗️","🧪","🔮","🧰","🪵","🍃","🔥","💡","🪄"];
  return icons[i % icons.length];
}

const conveyorEl = document.getElementById("conveyor");

// сделаем несколько повторов для бесконечной ленты
const REPEAT = 5;
function buildConveyor() {
  conveyorEl.innerHTML = "";
  for (let r=0;r<REPEAT;r++){
    for (let i=0;i<items.length;i++){
      const it = items[i];
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<div class="icon">${it.icon}</div>
                       <div class="label">${it.name}</div>
                       <div class="val">+${it.value}/сек</div>`;
      conveyorEl.appendChild(div);
    }
  }
}
buildConveyor();

// авто-анимация
let posX = 0;
const speed = 1.5; // px за кадр (можно менять скорость)

function animate() {
  posX -= speed;
  // если ушли слишком далеко, сбрасываем (для бесконечной прокрутки)
  const totalWidth = conveyorEl.scrollWidth / REPEAT;
  if (Math.abs(posX) > totalWidth) {
    posX = 0;
  }
  conveyorEl.style.transform = `translateX(${posX}px)`;
  requestAnimationFrame(animate);
}
animate();

// info панель — пока выводим общий доход
const infoEl = document.getElementById("info");
function updateIncome() {
  const totalIncome = items.reduce((s,it) => s + it.value, 0);
  infoEl.textContent = `Всего ${items.length} предметов | Общий доход: ${totalIncome}/сек`;
}
updateIncome();