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

// 3. Change colours button: each click switches to the next colour theme
var themes = ["violet", "sunset", "ocean", "forest"];
var current = 0;
var paletteButton = document.getElementById("palette");

paletteButton.addEventListener("click", function () {
  current = (current + 1) % themes.length;
  document.body.setAttribute("data-theme", themes[current]);
  paletteButton.textContent = "Colours: " + themes[current];
});

// 4. Numbers in the About section count up when they scroll into view
var statBox = document.querySelector(".stats");
var numbers = document.querySelectorAll(".num");

numbers.forEach(function (num) { num.textContent = 0; });

var counterObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    numbers.forEach(function (num) {
      var target = Number(num.getAttribute("data-target"));
      var count = 0;
      var timer = setInterval(function () {
        count = count + 1;
        num.textContent = count;
        if (count >= target) { clearInterval(timer); }
      }, 350);
    });
    counterObserver.disconnect();
  }
}, { threshold: 0.5 });

counterObserver.observe(statBox);

// 5. Greeting badge on the photo: each click shows a new greeting
var greetings = ["Hi!", "Namaste!", "Hello!", "Hola!", "Bonjour!"];
var greetIndex = 0;
var greetButton = document.getElementById("greet");

greetButton.addEventListener("click", function () {
  greetIndex = (greetIndex + 1) % greetings.length;
  greetButton.textContent = greetings[greetIndex];
});
