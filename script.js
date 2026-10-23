
/* ==========================================
   FABIAN PROFILE
   Navigation, Theme & Scroll Effects
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const navLinks = document.querySelectorAll(".nav-link");
  const revealElements = document.querySelectorAll(".reveal");
  const yearElement = document.getElementById("year");

  // 1. UPDATE COPYRIGHT YEAR
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. DARK MODE TOGGLE
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");
      const icon = themeToggle.querySelector(".theme-icon");

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"
      );

      themeToggle.setAttribute(
        "title",
        isDark ? "Tema terang" : "Tema gelap"
      );

      // Switch between sun and moon icons
      if (icon) {
        icon.innerHTML = isDark
          ? `
            <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"/>
          `
          : `
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
          `;
      }
    });
  }

  // 3. MOBILE NAVIGATION
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi"
      );
    });

    // Close the menu when a navigation link is selected
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka navigasi");
      });
    });

    // Close the menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka navigasi");
      }
    });
  }

  // 4. REVEAL ELEMENTS ON SCROLL
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
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

    revealElements.forEach((element, index) => {
      element.style.transitionDelay =
        `${(index % 3) * 80}ms`;

      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 5. ACTIVE NAVIGATION WHILE SCROLLING
  const sections = document.querySelectorAll(
    "#home, #about, #hobbies, #inspiration"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
  // 6. FOTO PROFIL FADE IN / FADE OUT SAAT SCROLL
  const profilePhoto = document.getElementById("profilePhoto");

  if (profilePhoto && "IntersectionObserver" in window) {
    const photoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            profilePhoto.classList.add("is-visible");
          } else {
            profilePhoto.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    photoObserver.observe(profilePhoto);
  } else if (profilePhoto) {
    profilePhoto.classList.add("is-visible");
  }
