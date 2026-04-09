
// Reading progress bar
const fill = document.getElementById("progress-fill");
const pct = document.getElementById("progress-pct");
window.addEventListener("scroll", () => {
  const body = document.body,
    html = document.documentElement;
  const total =
    Math.max(body.scrollHeight, html.scrollHeight) - html.clientHeight;
  const progress = Math.min(Math.round((window.scrollY / total) * 100), 100);
  fill.style.width = progress + "%";
  pct.textContent = progress + "%";
});

// TOC active link
const headings = document.querySelectorAll(".article-content h2[id]");
const tocLinks = document.querySelectorAll(".toc-link");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          `.toc-link[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-20% 0px -70% 0px" },
);
headings.forEach((h) => observer.observe(h));

// Copy link button
document.querySelectorAll(".share-btn").forEach((btn) => {
  if (btn.textContent.includes("Copy")) {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      btn.textContent = "✓ Copied!";
      setTimeout(
        () => (btn.innerHTML = '<i class="bi bi-link-45deg"></i> Copy Link'),
        2000,
      );
    });
  }
});
