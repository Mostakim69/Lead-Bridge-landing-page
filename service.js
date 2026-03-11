const cardChart = document.getElementById("cardChart");
const cardUsers = document.getElementById("cardUsers");

document.addEventListener("mousemove", (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  if (cardChart) {
    cardChart.style.transform = `translateY(calc(-50% + ${dy * 10}px)) translateX(${dx * -8}px)`;
  }
  if (cardUsers) {
    cardUsers.style.transform = `translateY(calc(-50% + ${dy * 8}px)) translateX(${dx * 8}px)`;
  }
});

window.addEventListener("load", () => {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, i) => {
    const targetHeight = bar.style.height;
    bar.style.height = "0%";
    setTimeout(
      () => {
        bar.style.transition = "height 0.6s cubic-bezier(0.22,1,0.36,1)";
        bar.style.height = targetHeight;
      },
      1100 + i * 80,
    );
  });
});

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const display = el.dataset.display || null;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;

    // Show display value

    if (display) {
      const displayVal = parseFloat(display) * ease;
      el.textContent = prefix + displayVal.toFixed(2) + suffix;
    } else {
      el.textContent = prefix + Math.round(value).toLocaleString() + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
    else {
      el.textContent = display
        ? prefix + display + suffix
        : prefix + target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;

        if (el.classList.contains("stat-card")) {
          el.classList.add("visible");
          const numEl = el.querySelector(".stat-card__number");
          if (numEl && !numEl.dataset.animated) {
            numEl.dataset.animated = "true";
            animateCounter(numEl);
          }
        }

        if (el.classList.contains("story")) {
          el.classList.add("story--visible");
        }

        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".stat-card, .story")
  .forEach((el) => observer.observe(el));

const pillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll(".why__pill");
        pills.forEach((pill, i) => {
          setTimeout(() => pill.classList.add("visible"), i * 120);
        });
        pillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const whyRight = document.querySelector(".why__right");
if (whyRight) pillObserver.observe(whyRight);

const svcObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        svcObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".svc-card").forEach((el) => svcObserver.observe(el));

const approachObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        approachObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

const approachSection = document.querySelector(".approach");
if (approachSection) approachObserver.observe(approachSection);



const realityObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        realityObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reality-card")
  .forEach((el) => realityObserver.observe(el));

const howweObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        howweObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".howwe-card")
  .forEach((el) => howweObserver.observe(el));