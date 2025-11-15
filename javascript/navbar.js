// Navbar scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll);
  // run once in case page is loaded scrolled
  onScroll();
});
