// 1. Scroll progress bar: the coloured line at the top grows as you scroll down
var bar = document.getElementById("progress");

window.addEventListener("scroll", function () {
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / maxScroll) * 100 + "%";
});

// 2. Sections slide in the first time they come into view
var sections = document.querySelectorAll("main section, #contact");

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

sections.forEach(function (section) {
  section.classList.add("reveal");
  observer.observe(section);
});

// 3. Colour theme button: each click switches to the next colour theme
var themes = ["violet", "sunset", "ocean", "forest"];
var current = 0;
var paletteButton = document.getElementById("palette");

paletteButton.addEventListener("click", function () {
  current = (current + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[current]);
  paletteButton.textContent = "Colours: " + themes[current];
});
