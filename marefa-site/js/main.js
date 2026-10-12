// Navigation: the hamburger shows/hides the links on small screens.
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");

function setNav(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
}
burger.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => {
  if (e.target.closest(".links a")) setNav(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNav(false);
});

// Portfolio filter: hide cards that don't match, then re-number the layout positions.
const tabs = document.querySelector(".tabs");
const cards = [...document.querySelectorAll(".card")];

function filter(cat) {
  let i = 0;
  cards.forEach((card) => {
    const show = cat === "all" || card.dataset.cat === cat;
    card.hidden = !show;
    if (show) card.dataset.pos = i++ % 5;
  });
  tabs
    .querySelectorAll("button")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));
}
tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) filter(b.dataset.cat);
});

// Scroll reveal: add .in once an element is on screen (CSS does the animation).
const items = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}

// Footer year stays current.
document.getElementById("year").textContent = new Date().getFullYear();
