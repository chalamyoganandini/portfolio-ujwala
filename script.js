
const typing = document.getElementById("typing");

const words = [
  "Software Developer",
  "Python Programmer",
  "Creative Thinker",
  "Future Innovator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typing.textContent = word.substring(0, charIndex);

  if (!deleting) {
    charIndex++;

    if (charIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;

    if (charIndex < 0) {
      charIndex = 0;
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 85);
}

// Floating background particles
const particles = document.getElementById("particles");

for (let i = 0; i < 30; i++) {
  const particle = document.createElement("span");

  particle.classList.add("particle");

  const size = Math.random() * 5 + 2;

  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * -8 + "s";
  particle.style.animationDuration =
    5 + Math.random() * 8 + "s";

  particles.appendChild(particle);
}

// Start typing animation
typeEffect();

// Animate sections when they enter the screen
const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(
  function(element, index) {
    element.style.transitionDelay =
      (index % 3) * 100 + "ms";

    observer.observe(element);
  }
);

// Dark and light mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
  document.body.classList.toggle("light");

  const lightMode =
    document.body.classList.contains("light");

  themeToggle.textContent = lightMode ? "🌙" : "☀️";
  themeToggle.setAttribute(
    "aria-label",
    lightMode ? "Switch to dark theme" : "Switch to light theme"
  );
});

// Back to top
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function() {
  backTop.classList.toggle(
    "visible",
    window.scrollY > 350
  );
});

backTop.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Automatically update the footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 3D card tilt effect on desktop
if (
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches
) {
  document.querySelectorAll(
    ".glass-card, .project-card"
  ).forEach(function(card) {
    card.addEventListener("mousemove", function(event) {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 5;
      const rotateY = (x - 0.5) * 5;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) ` +
        `rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", function() {
      card.style.transform = "";
    });
  });
}
