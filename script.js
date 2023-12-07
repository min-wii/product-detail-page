document.addEventListener("DOMContentLoaded", function () {
  const shoes = document.querySelector(".shoes");
  const productBg = document.querySelector(".product-item");
  const colors = document.querySelectorAll(".color");
  const colorName = document.querySelector(".color-name");

  colors.forEach((color) => {
    color.addEventListener("click", () => {
      selectColor(color);
    });

    color.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectColor(color);
      }
    });
  });

  function selectColor(color) {
    const selectedColor = window.getComputedStyle(color).backgroundColor;
    shoes.style.backgroundColor = selectedColor;
    productBg.style.backgroundColor = selectedColor;
    const colorSrc = color.dataset.color;

    colors.forEach((otherColor) => {
      otherColor.classList.toggle("active", otherColor === color);
    });

    colorName.innerHTML = colorSrc;
  }

  function handleDropdownClick(btn, list) {
    btn.addEventListener("click", (e) => {
      list.classList.toggle("show");
      if (list.classList.contains("show")) {
        e.currentTarget.focus();
      }
    });
    list.addEventListener("click", (e) => {
      const listItem = e.target.closest("li");
      if (listItem) {
        const selectedData = e.target.dataset;
        btn.innerHTML = `${selectedData.label}: ${selectedData.value}`;
        if (list.classList.contains("show")) {
          list.classList.remove("show");
          btn.focus();
        }
      }
    });

    list.addEventListener("keydown", (e) => {
      const focusedItem = document.activeElement;
      const items = list.querySelectorAll("li");
      const currentIndex = Array.from(items).indexOf(focusedItem);
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1].focus();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
          }
          break;
        case "Escape":
          btn.focus();
          btn.setAttribute("aria-expanded", "false");
          list.setAttribute("aria-hidden", "true");
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          focusedItem.click();
          break;
      }
    });
  }

  const sizeBtn = document.getElementById("size-btn");
  const qtyBtn = document.getElementById("qty-btn");
  const sizeList = document.querySelector(".size-control .dropdown-list");
  const qtyList = document.querySelector(".qty-control .dropdown-list");

  handleDropdownClick(sizeBtn, sizeList);
  handleDropdownClick(qtyBtn, qtyList);

  const stars = document.querySelectorAll(".rate input");
  const starReview = document.querySelector(".star-review");

  stars.forEach((e) => {
    let focusToIndex;

    e.addEventListener("click", (event) => {
      const starAmount = event.target.value;
      starReview.innerHTML = `현재 선택된 평가: ${starAmount}`;
      console.log(starAmount);
    });

    e.addEventListener("keydown", (event) => {
      let action;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          action = "next";
          break;
        case "ArrowLeft":
        case "ArrowUp":
          action = "previous";
          break;
        default:
          return;
      }

      event.preventDefault();
      for (let i = 0; i < stars.length; i++) {
        if (document.activeElement === stars[i]) {
          focusToIndex = action === "next" ? i - 1 : i + 1;
          if (focusToIndex < 0) focusToIndex = stars.length - 1;
          if (focusToIndex >= stars.length) focusToIndex = 0;
          stars[focusToIndex].focus();
          stars[focusToIndex].checked = true;
          break;
        }
      }
      const starAmount = stars[focusToIndex].value;
      console.log(starAmount);
    });
  });
});
