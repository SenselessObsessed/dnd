export default class DownloadManager {
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
    const downloadCount = document.querySelector(
      this.constructor.downloadCountSelector,
    );

    const allBtnsDownload = Array.from(
      document.querySelectorAll(this.constructor.downloadBtnSelector),
    );

    allBtnsDownload.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const size = Number(
          e.target.closest(".file").querySelector(".size").dataset.size,
        );
        downloadCount.dataset.download =
          Number(downloadCount.dataset.download) + size;
        downloadCount.innerText = (
          Number(downloadCount.dataset.download) / 1024
        ).toFixed(0);
      });
    });
  }
}
