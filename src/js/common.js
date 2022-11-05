export function statsReaction(element) {
  let changeStats = document.querySelector(element);
  console.log(changeStats);
  console.log("gooogle");
  changeStats.style.color = "black";
  changeStats.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  setTimeout(() => {
    changeStats.style.color = "white";
    changeStats.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  }, 800);
}
