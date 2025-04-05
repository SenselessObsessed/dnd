import Trello from "./trello";

const container = document.querySelector(".container");
const trello = new Trello(container);
trello.bindToDOM();
