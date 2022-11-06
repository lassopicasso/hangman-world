export function statsReaction(element) {
  let changeStats = document.querySelector(element);
  changeStats.style.color = "black";
  changeStats.style.backgroundColor = changeStats.classList.contains("stats__attempt") ? "rgba(255, 66, 71, 0.5)" : "rgba(255, 255, 255, 0.5)";
  setTimeout(() => {
    changeStats.style.color = "white";
    changeStats.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  }, 800);
}
