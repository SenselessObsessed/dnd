export default function fileReader(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      resolve(e.target.result);
    });
    fileReader.addEventListener("error", (e) => {
      reject(e.target.error);
    });
    fileReader.readAsDataURL(file);
  });
}
