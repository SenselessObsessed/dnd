export default class ModernImageManager {
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

    input.addEventListener("mouseenter", (e) => this.onMouseEnter(e));
    input.addEventListener("mouseleave", (e) => this.onMouseLeave(e));
    input.addEventListener("change", (e) => this.onChange(e));
    document.addEventListener("click", (e) => this.onClick(e));
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
