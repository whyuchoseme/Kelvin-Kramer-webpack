import "../index.html";
import "../scss/main.scss";

const navigationList = document.querySelector(".navigation-list");
const navigationLink = document.querySelectorAll(".navigation-link");
const burger = document.querySelector(".navigation-burger-button");

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth; // Высчитывание длинны скроллбара, чтобы при дальнейшем скрытии контент не сдвигался

navigationLink.forEach((item) => {
  item.addEventListener("click", (e) => {
    navigationLink.forEach((item) => {
      item.classList.remove("active-link");
    });
    e.target.classList.add("active-link");
  });
});

burger.addEventListener("click", () => {
  burger.classList.toggle("active-burger");

  if (burger.classList.contains("active-burger")) {
    navigationList.style.display = "flex";
    document.body.style.marginRight = scrollbarWidth + "px";
    document.body.style.overflowY = "hidden";
  } else {
    navigationList.style.display = "";
    document.body.style.marginRight = 0;
    document.body.style.overflowY = "visible";
  }
});
