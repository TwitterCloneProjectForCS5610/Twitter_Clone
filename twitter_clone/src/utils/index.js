export function imgToB64(file) {
  const reader = new FileReader();
  const p = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
  });
  reader.readAsDataURL(file);
  return p;
}
