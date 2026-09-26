
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(
        new Error("No file selected.")
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(
        new Error(
          "Failed to read image file."
        )
      );
    };

    reader.readAsDataURL(file);
  });
}

