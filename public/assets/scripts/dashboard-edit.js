const imgSelectElArr = document.querySelectorAll(".image-selection li img");
const imgSelectRadioElArr = document.querySelector(".img-selection-radio").children;

let imgSelectCurrentEl = document.querySelector(".image-selection li img.selected");
getRadioEl(imgSelectCurrentEl).checked = true;

// each image in the selection window gets a click listener
imgSelectElArr.forEach((img) => {
   img.addEventListener("click", (e) => {
      // if the clicked image is already selected, do nothing
      if (!e.target.classList.contains("selected")) {
         // if the clicked image is not selected, select it and unselect the previously selected image
         e.target.classList.add("selected");
         imgSelectCurrentEl.classList.remove("selected");
         imgSelectCurrentEl = e.target;
         getRadioEl(e.target).checked = true;
      }
   });
});

// to link hidden radio input and images
function getRadioEl(imgEl) {
   return Array.from(imgSelectRadioElArr).find((node) => node.id === "radio-" + imgEl.id);
}