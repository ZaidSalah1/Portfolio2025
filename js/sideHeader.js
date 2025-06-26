window.addEventListener("scroll", () => {
  const sideHeader = document.querySelector(".sideHeader");
  const floatMenu = document.querySelector('.floatMenu');

  if (window.scrollY > 50) {
    sideHeader.classList.add("visible");
    floatMenu.classList.add("visible");
  } else {
    sideHeader.classList.remove("visible");
    floatMenu.classList.remove("visible");  // <-- fix here
  }
});


// Scroll event:
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    showFloatMenu();
  } else {
    hideFloatMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sideHeader a");
  const projectsDropdown = document.querySelector(".navItem.dropdown");
  const sections = Array.from(document.querySelectorAll("section[id], header[id], footer[id]"));

  function onScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    let currentSectionId = null;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const topOffset = rect.top + window.scrollY;

      // تحقق إذا القسم ظاهر في النافذة (حتى لو جزئيًا)
      if (
        scrollPosition >= topOffset - 100 &&
        scrollPosition < topOffset + section.offsetHeight - 100
      ) {
        currentSectionId = section.id;
        break; // نوقف عند أول قسم يتطابق الشرط
      }
    }

    // إذا وصلنا لنهاية الصفحة (مثلاً أقل من 5 بكسل من الأسفل)
    if (scrollPosition + windowHeight >= docHeight - 5) {
      currentSectionId = "footer";
    }

    // إزالة الـ active من كل الروابط وأب المشاريع
    navLinks.forEach(link => link.classList.remove("active"));
    projectsDropdown.classList.remove("active");

    if (currentSectionId) {
      const activeLink = document.querySelector(`.sideHeader a[href="#${currentSectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");

        if (activeLink.classList.contains("projectLink")) {
          projectsDropdown.classList.add("active");
        }
      }
    }
  }


  // شغل التفعيل عند تحميل الصفحة وعند التمرير
  window.addEventListener("scroll", onScroll);
  onScroll();
});



const scroll = new SmoothScroll('.sideHeader a[href^="#"]', {
  speed: 800,
  speedAsDuration: true,
  easing: 'easeInOutCubic',
});


function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('nav a[href^="#"], .mobileNav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Optional: close the menu after click
    document.getElementById('mobileMenu').classList.remove('open'); // or toggle a class based on your logic
  });
});

