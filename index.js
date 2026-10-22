
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Update active navigation link while scrolling
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) {
        currentSection = section.id;
      }
    });

    navItems.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection}`;
      link.classList.toggle("active", isActive);
    });
  }

  // Header background and back-to-top button
  const header = document.querySelector(".header");
  const backToTop = document.getElementById("back-to-top");

  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backToTop.classList.toggle("visible", window.scrollY > 450);
    updateActiveLink();
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Reveal elements when they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Typing animation
  const typedText = document.getElementById("typed-text");
  const words = [
    "technology.",
    "artificial intelligence.",
    "creative ideas.",
    "the future."
  ];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    typedText.textContent = words[0];
  } else {
    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        characterIndex--;
        typedText.textContent = currentWord.slice(0, characterIndex);

        if (characterIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeEffect, 400);
          return;
        }

        setTimeout(typeEffect, 45);
      } else {
        const nextWord = words[wordIndex];
        characterIndex++;
        typedText.textContent = nextWord.slice(0, characterIndex);

        if (characterIndex >= nextWord.length) {
          deleting = true;
          setTimeout(typeEffect, 1700);
          return;
        }

        setTimeout(typeEffect, 75);
      }
    }

    setTimeout(typeEffect, 1800);
  }

  // Automatically update copyright year
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Configure your real email address here
  const email = "your-email@example.com";
  const emailLink = document.getElementById("email-link");
  const contactEmail = document.getElementById("contact-email");

  emailLink.href = `mailto:${email}`;
  contactEmail.href = `mailto:${email}`;
  contactEmail.textContent = `${email} ↗`;
});
