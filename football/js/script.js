window.onload = () => {
  const cardsContainer = document.getElementById("cards-container");
  const slotsContainer = document.getElementById("slots-container");
  const openButton = document.getElementById("open-button");

  const frontImages = Array.from({ length: 12 }, (_, i) => ({
    img: `images/front${i + 1}.avif`
  }));

  const backImage = 'images/back.avif';

  // 设置打开后的固定顺序（按索引）
  const finalRevealOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const cardElements = [];
  const cardPlaceholders = Array(12).fill(null);
  let dropCount = 0;

  function createCards() {
    frontImages.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.draggable = true;
      card.id = `card-${index}`;
      card.dataset.index = index;

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-front";
      front.innerHTML = `<img src="${item.img}">`;

      const back = document.createElement("div");
      back.className = "card-back";
      back.innerHTML = `<img src="${backImage}">`;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      cardsContainer.appendChild(card);

      // 初始动画
      setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.opacity = 1;
      }, 200 * index);

      card.ondragstart = e => {
        e.dataTransfer.setData("text/plain", card.id);
      };

      cardElements.push(card);
      cardPlaceholders[index] = card;
    });
  }

  function flipAllToBack() {
    cardElements.forEach((card, i) => {
      setTimeout(() => card.classList.add("flipped"), i * 100);
    });
  }

  async function shuffleAnimation(times = 3) {
    for (let t = 0; t < times; t++) {
      const cards = cardsContainer.querySelectorAll('.card');
      const positions = Array.from(cards).map(card => {
        const rect = card.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
      });

      const indices = [...Array(cards.length).keys()];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      cards.forEach((card, i) => {
        const deltaX = positions[indices[i]].left - positions[i].left;
        const deltaY = positions[indices[i]].top - positions[i].top;
        card.style.transition = "transform 0.5s";
        card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      await new Promise(res => setTimeout(res, 600));
      cards.forEach(card => {
        card.style.transition = "none";
        card.style.transform = "scale(1)";
      });
    }
  }

  function createSlots() {
    for (let i = 0; i < 12; i++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.ondragover = e => e.preventDefault();

      slot.ondrop = function (e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const card = document.getElementById(id);
        if (!card || this.hasChildNodes()) return;

        const index = parseInt(card.dataset.index);
        cardPlaceholders[index] = null;

        cardsContainer.removeChild(card);

        this.appendChild(card);
        card.style.position = 'static';
        card.draggable = false;

        dropCount++;
        if (dropCount === 12) {
          openButton.style.display = "inline-block";
        }
      };

      slotsContainer.appendChild(slot);
      setTimeout(() => slot.classList.add('appear'), 300 * i);
    }
  }

  function flipSlotsToFixedOrder() {
    const slots = Array.from(document.querySelectorAll('.slot'));
    slots.forEach(slot => (slot.innerHTML = ''));

    finalRevealOrder.forEach((imgIndex, i) => {
      const card = document.createElement("div");
      card.className = "card flipped";
      card.style.position = "static";
      card.style.transform = "scale(1)";
      card.style.opacity = 1;

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-front";
      front.innerHTML = `<img src="${frontImages[imgIndex].img}">`;

      const back = document.createElement("div");
      back.className = "card-back";
      back.innerHTML = `<img src="${backImage}">`;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      slots[i].appendChild(card);

      setTimeout(() => {
        card.classList.remove("flipped");
      }, i * 300);
    });
  }

  // 启动流程
  createCards();

  setTimeout(() => {
    flipAllToBack();

    setTimeout(async () => {
      await shuffleAnimation(3);
      createSlots();
    }, 2500);
  }, 5000);

  // 打开按钮逻辑
  openButton.onclick = () => {
    flipSlotsToFixedOrder();
    openButton.disabled = true;
    openButton.style.opacity = 0.5;
    openButton.style.cursor = "default";
  };
};
