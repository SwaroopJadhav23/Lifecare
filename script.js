const wrapper = document.querySelector(".wrapper");
const bla = document.querySelector(".bla");
const firstCardWidth = bla.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const blaChildrens = [...bla.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(bla.offsetWidth / firstCardWidth);

blaChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    bla.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

blaChildrens.slice(0, cardPerView).forEach((card) => {
  bla.insertAdjacentHTML("beforeend", card.outerHTML);
});

bla.classList.add("no-transition");
bla.scrollLeft = bla.offsetWidth;
bla.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    bla.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  bla.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = bla.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;

  bla.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  bla.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (bla.scrollLeft === 0) {
    bla.classList.add("no-transition");
    bla.scrollLeft = bla.scrollWidth - 2 * bla.offsetWidth;
    bla.classList.remove("no-transition");
  } else if (
    Math.ceil(bla.scrollLeft) ===
    bla.scrollWidth - bla.offsetWidth
  ) {
    bla.classList.add("no-transition");
    bla.scrollLeft = bla.offsetWidth;
    bla.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (bla.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

bla.addEventListener("mousedown", dragStart);
bla.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
bla.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const dropdowns = document.querySelectorAll(".dropdown");
const select = document.querySelector(".select");
const caret = document.querySelector(".caret");
const menu = document.querySelector(".menu");
const options = document.querySelectorAll(".menu li");
const selected = document.querySelectorAll(".selected");

select.addEventListener("click", () => {
  select.classList.toggle("select-clicked");
  caret.classList.toggle("caret-rotate");
  menu.classList.toggle("menu-open");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerText = option.innerText;
    select.classList.remove("select-clicked");
    caret.classList.remove("caret-rotate");
    menu.classList.remove("menu-open");
    options.forEach((option) => {
      option.classList.remove("active");
      option.classList.add("active");
    });
  });
});
 