// Typed animation
const roles = ["DevOps Engineer", "Cloud Architect", "Backend Developer"];
let ri = 0,
  ci = 0,
  deleting = false;
const el = document.getElementById("typed-role");
function type() {
  const role = roles[ri];
  if (!deleting) {
    el.textContent = role.slice(0, ++ci);
    if (ci === role.length) {
      setTimeout(() => {
        deleting = true;
        type();
      }, 2400);
      return;
    }
  } else {
    el.textContent = role.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 40 : 85);
}
type();

// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.borderBottomColor =
    window.scrollY > 40 ? "#1e2d45" : "transparent";
});

// Mobile menu
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");
btn.addEventListener("click", () => {
  const open = !menu.classList.contains("hidden");
  menu.classList.toggle("hidden", open);
  menu.classList.toggle("flex", !open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
  }),
);

// Scroll reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 70);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  msg.textContent = "✓ Message sent! I'll get back to you soon.";
  msg.classList.remove("hidden");
  e.target.reset();
  setTimeout(() => msg.classList.add("hidden"), 5000);
}
