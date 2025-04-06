import DownloadManager from "./downloadManager";
import ModernImageManager from "./modernImageManager";
import Trello from "./trello";

const container = document.querySelector(".container");
const modernCon = document.querySelector(".modern-image");
const downloadCon = document.querySelector(".download-manager");
const trello = new Trello(container);
const imageManager = new ModernImageManager(modernCon);
const downloadManager = new DownloadManager(downloadCon);
trello.bindToDOM();
imageManager.bindToDOM();
downloadManager.bindToDOM();
