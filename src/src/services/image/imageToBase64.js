export function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Image file is required.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.readAsDataURL(file);
  });
}

export default imageToBase64;
