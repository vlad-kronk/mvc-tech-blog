const imgSelectElArr = document.querySelectorAll(".image-selection li img");
let imgSelectCurrentSelectionEl = document.querySelector(".image-selection li img.selected");

imgSelectElArr.forEach((img) => {
   img.addEventListener("click", (e) => {
      console.log(e.target);
      const isAlreadySelected = e.target.classList.contains("selected");
      if (!isAlreadySelected) {
         e.target.classList.add("selected");
         imgSelectCurrentSelectionEl.classList.remove("selected");
         imgSelectCurrentSelectionEl = e.target;
      }
   });
});