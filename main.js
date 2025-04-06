/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/downloadManager.js
class DownloadManager {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }
  static get markup() {
    return `
    <div class="dwnload-container">
    <h2>Available Files(without sms and registration)</h2>
    <div class="download-files">
      <div class="file">
        <div class="name">Storage Standard</div>
        <div class="size" data-size="303">303 Kb</div>
        <div class="btn"><a href="../../files/Storage Standard.pdf" download class="download-btn">Download</a></div>
      </div>
      <div class="file">
        <div class="name">Streams Standard</div>
        <div class="size" data-size="1670">1.6 Mb</div>
        <div class="btn"><a href="../../files/Streams Standard.pdf" download class="download-btn">Download</a></div>
      </div>
      <div class="file">
        <div class="name">XMLHttpRequest Standard</div>
        <div class="size" data-size="813">813 Kb</div>
        <div class="btn"><a href="../../files/XMLHttpRequest Standard.pdf" download class="download-btn">Download</a></div>
      </div>
    </div>
  </div>
  <div class="download-all">You've already downloaded: <span data-download="0" class="download-count">0</span> Mb</div>
    `;
  }
  static get downloadCountSelector() {
    return `.download-count`;
  }
  static get downloadBtnSelector() {
    return `.download-btn`;
  }
  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const downloadCount = document.querySelector(this.constructor.downloadCountSelector);
    const allBtnsDownload = Array.from(document.querySelectorAll(this.constructor.downloadBtnSelector));
    allBtnsDownload.forEach(btn => {
      btn.addEventListener("click", e => {
        const size = Number(e.target.closest(".file").querySelector(".size").dataset.size);
        downloadCount.dataset.download = Number(downloadCount.dataset.download) + size;
        downloadCount.innerText = (Number(downloadCount.dataset.download) / 1024).toFixed(0);
      });
    });
  }
}
;// ./src/js/modernImageManager.js
class ModernImageManager {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }
  static get markup() {
    return `
    <div class="modern-image-container">
      <input type="file" id="imageInput" accept="image/*" class="input-main" />
      <div class="input-placeholder">Drag And Drop File Here Or Click</div>
    </div>
    <div class="images-con"></div>
    `;
  }
  static get dropInputSelector() {
    return `.input-main`;
  }
  static get dropInputPlaceholderSelector() {
    return `.input-placeholder`;
  }
  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const input = document.querySelector(this.constructor.dropInputSelector);
    input.addEventListener("mouseenter", e => this.onMouseEnter(e));
    input.addEventListener("mouseleave", e => this.onMouseLeave(e));
    input.addEventListener("change", e => this.onChange(e));
    document.addEventListener("click", e => this.onClick(e));
  }
  onClick(e) {
    if (e.target.classList.contains("remove")) {
      e.target.closest(".image-drag").remove();
    }
  }
  onChange(e) {
    const file = e.target.files[0];
    const newElement = document.createElement("div");
    newElement.classList.add("image-drag");
    const newElementImg = document.createElement("img");
    newElementImg.classList.add("image-added");
    newElementImg.src = URL.createObjectURL(file);
    newElement.addEventListener("load", () => {
      URL.revokeObjectURL(newElementImg.src);
    });
    const newElementRemove = document.createElement("div");
    newElementRemove.classList.add("remove");
    newElementRemove.innerText = "X";
    newElement.append(newElementImg, newElementRemove);
    document.querySelector(".images-con").appendChild(newElement);
    e.target.value = "";
  }
  onMouseEnter(e) {
    e.target.nextElementSibling.style.backgroundColor = "gray";
  }
  onMouseLeave(e) {
    e.target.nextElementSibling.style.backgroundColor = "white";
  }
}
;// ./src/js/trello.js
class Trello {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.draggedEl = null;
  }
  static get markup() {
    return `
    <div class="first__column col">
      <h2 style="color: white">Todo</h2>
      <div class="column"></div>
      <button class="add-btn">+ Add Another Cart</button>
    </div>
    
    <div class="second__column col">
      <h2 style="color: white">In Progress</h2>
      <div class="column"></div>
      <button class="add-btn">+ Add Another Cart</button>
    </div>
      
    <div class="third__column col">
      <h2 style="color: white">Done</h2>
      <div class="column"></div>
      <button class="add-btn">+ Add Another Cart</button>
    </div>
    `;
  }
  static get addNewCartSelector() {
    return ".add-btn";
  }
  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.parentEl.addEventListener("click", e => this.onClick(e));
    window.addEventListener("load", this.parsInLocalStorage);
    document.addEventListener("mousedown", e => {
      if (!e.target.classList.contains("column-item")) return;
      this.draggedEl = e.target;
      e.target.classList.remove("remove-btn-active");
      const {
        width,
        height
      } = this.draggedEl.getBoundingClientRect();
      e.target.classList.add("column-item-dragged");
      e.target.style.width = `${width}px`;
      e.target.style.height = `${height}px`;
    });
    document.addEventListener("mousemove", e => {
      if (!this.draggedEl) return;
      e.target.style.display = "none";
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const checkItems = element.querySelectorAll(".column-item");
      e.target.style.display = "block";
      if (element && element.classList.contains("column-item")) {
        const redPlaceholder = document.querySelector(".placeholder");
        if (!redPlaceholder) {
          const placeholder = document.createElement("div");
          placeholder.classList.add("placeholder");
          placeholder.style.width = this.draggedEl.style.width;
          placeholder.style.height = this.draggedEl.style.height;
          placeholder.style.marginTop = "10px";
          placeholder.style.backgroundColor = "red";
          const {
            top,
            height
          } = element.getBoundingClientRect();
          if (e.pageY < top + height / 2) {
            element.insertAdjacentElement("beforebegin", placeholder);
          } else {
            element.insertAdjacentElement("afterend", placeholder);
          }
        } else {
          const {
            top,
            height
          } = element.getBoundingClientRect();
          if (e.pageY < top + height / 2) {
            element.insertAdjacentElement("beforebegin", redPlaceholder);
          } else {
            element.insertAdjacentElement("afterend", redPlaceholder);
          }
        }
      } else if (element && element.classList.contains("column") && checkItems.length <= 1) {
        const redPlaceholder = document.querySelector(".placeholder");
        if (!redPlaceholder) {
          const placeholder = document.createElement("div");
          placeholder.classList.add("placeholder");
          placeholder.style.width = this.draggedEl.style.width;
          placeholder.style.height = this.draggedEl.style.height;
          placeholder.style.marginTop = "10px";
          placeholder.style.backgroundColor = "red";
          element.append(placeholder);
        } else {
          element.append(redPlaceholder);
        }
      }
      this.draggedEl.style.left = `${e.pageX - this.draggedEl.offsetWidth / 2}px`;
      this.draggedEl.style.top = `${e.pageY - this.draggedEl.offsetHeight / 2}px`;
    });
    document.addEventListener("mouseup", e => {
      const placeholder = document.querySelector(".placeholder");
      if (!this.draggedEl) return;
      if (placeholder) {
        placeholder.replaceWith(e.target);
      }
      this.draggedEl = null;
      e.target.classList.remove("column-item-dragged");
      e.target.classList.add("remove-btn-active");
      e.target.removeAttribute("style");
      this.saveToLocalStorage();
    });
  }
  onClick(event) {
    if (event.target.classList.contains("add-btn")) {
      event.target.style.display = "none";
      const newAddForm = document.createElement("div");
      const newAddFormTextArea = document.createElement("textarea");
      newAddFormTextArea.classList.add("add-textarea");
      newAddFormTextArea.style.display = "block";
      const newAddFormAddBtn = document.createElement("button");
      newAddFormAddBtn.classList.add("add-column");
      newAddFormAddBtn.innerText = "Add";
      const newAddFormCancelBtn = document.createElement("button");
      newAddFormCancelBtn.classList.add("cancel-btn");
      newAddFormCancelBtn.innerText = "✖";
      newAddForm.append(newAddFormTextArea, newAddFormAddBtn, newAddFormCancelBtn);
      event.target.insertAdjacentElement("afterend", newAddForm);
    }
    if (event.target.classList.contains("add-column")) {
      const newElement = document.createElement("div");
      newElement.innerText = event.target.previousElementSibling.value;
      newElement.className = "column-item";
      const removeBtn = document.createElement("div");
      removeBtn.classList.add("remove-btn");
      newElement.append(removeBtn);
      newElement.addEventListener("mouseenter", e => {
        e.target.classList.add("remove-btn-active");
        e.target.querySelector(".remove-btn").style.display = "block";
      });
      newElement.addEventListener("mouseleave", e => {
        e.target.classList.remove("remove-btn-active");
        e.target.querySelector(".remove-btn").style.display = "none";
      });
      event.target.closest(".col").querySelector(".column").append(newElement);
      event.target.closest(".col").querySelector(".add-btn").style.display = "block";
      event.target.closest("div").remove();
      this.saveToLocalStorage();
    }
    if (event.target.classList.contains("cancel-btn")) {
      event.target.closest(".col").querySelector(".add-btn").style.display = "block";
      event.target.closest("div").remove();
    }
    if (event.target.classList.contains("remove-btn")) {
      event.target.closest(".column-item").remove();
      this.saveToLocalStorage();
    }
  }
  saveToLocalStorage() {
    const firstColumnItems = Array.from(document.querySelector(".first__column").querySelector(".column").querySelectorAll(".column-item"));
    const secondColumnItems = Array.from(document.querySelector(".second__column").querySelector(".column").querySelectorAll(".column-item"));
    const thirdColumnItems = Array.from(document.querySelector(".third__column").querySelector(".column").querySelectorAll(".column-item"));
    const filteredFirstCol = firstColumnItems.map(item => item.innerText);
    const filteredSecondCol = secondColumnItems.map(item => item.innerText);
    const filteredThirdCol = thirdColumnItems.map(item => item.innerText);
    window.localStorage.setItem("first", JSON.stringify(filteredFirstCol));
    window.localStorage.setItem("second", JSON.stringify(filteredSecondCol));
    window.localStorage.setItem("third", JSON.stringify(filteredThirdCol));
  }
  parsInLocalStorage() {
    const firstCol = window.localStorage.getItem("first");
    const secondCol = window.localStorage.getItem("second");
    const thirdCol = window.localStorage.getItem("third");
    if (firstCol && JSON.parse(firstCol).length) {
      const column = document.createElement("div");
      const firstColumn = document.querySelector(".first__column").querySelector(".column");
      column.classList.add("column");
      JSON.parse(firstCol).forEach(item => {
        const newElement = document.createElement("div");
        newElement.innerText = item;
        newElement.className = "column-item";
        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-btn");
        newElement.append(removeBtn);
        newElement.addEventListener("mouseenter", e => {
          e.target.classList.add("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "block";
        });
        newElement.addEventListener("mouseleave", e => {
          e.target.classList.remove("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "none";
        });
        column.append(newElement);
      });
      firstColumn.replaceWith(column);
    }
    if (secondCol && JSON.parse(secondCol).length) {
      const column = document.createElement("div");
      const secondColumn = document.querySelector(".second__column").querySelector(".column");
      column.classList.add("column");
      JSON.parse(secondCol).forEach(item => {
        const newElement = document.createElement("div");
        newElement.innerText = item;
        newElement.className = "column-item";
        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-btn");
        newElement.append(removeBtn);
        newElement.addEventListener("mouseenter", e => {
          e.target.classList.add("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "block";
        });
        newElement.addEventListener("mouseleave", e => {
          e.target.classList.remove("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "none";
        });
        column.append(newElement);
      });
      secondColumn.replaceWith(column);
    }
    if (thirdCol && JSON.parse(thirdCol).length) {
      const column = document.createElement("div");
      const thirdColumn = document.querySelector(".third__column").querySelector(".column");
      column.classList.add("column");
      JSON.parse(thirdCol).forEach(item => {
        const newElement = document.createElement("div");
        newElement.innerText = item;
        newElement.className = "column-item";
        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-btn");
        newElement.append(removeBtn);
        newElement.addEventListener("mouseenter", e => {
          e.target.classList.add("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "block";
        });
        newElement.addEventListener("mouseleave", e => {
          e.target.classList.remove("remove-btn-active");
          e.target.querySelector(".remove-btn").style.display = "none";
        });
        column.append(newElement);
      });
      thirdColumn.replaceWith(column);
    }
  }
}
;// ./src/js/app.js



const container = document.querySelector(".container");
const modernCon = document.querySelector(".modern-image");
const downloadCon = document.querySelector(".download-manager");
const trello = new Trello(container);
const imageManager = new ModernImageManager(modernCon);
const downloadManager = new DownloadManager(downloadCon);
trello.bindToDOM();
imageManager.bindToDOM();
downloadManager.bindToDOM();
;// ./src/index.js


/******/ })()
;