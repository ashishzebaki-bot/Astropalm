import { APP_CONFIG } from '../../config/appConfig';

export async function compressImage(file) {
  if (!file) throw new Error('Image file is required.');

  const maxWidth = APP_CONFIG.PALM_SCAN.MAX_WIDTH || 1600;
  const maxHeight = APP_CONFIG.PALM_SCAN.MAX_HEIGHT || 1600;
  const quality = APP_CONFIG.PALM_SCAN.IMAGE_QUALITY || 0.85;

  const imageBitmap = await createImageBitmap(file);

  const scale = Math.min(maxWidth / imageBitmap.width, maxHeight / imageBitmap.height, 1);

  const targetWidth = Math.round(imageBitmap.width * scale);
  const targetHeight = Math.round(imageBitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Unable to prepare image compression.');

  context.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Image compression failed.'));
          return;
        }

        resolve(new File([blob], file.name, {
          type: file.type || 'image/jpeg',
          lastModified: Date.now()
        }));
      },
      file.type || 'image/jpeg',
      quality
    );
  });
}

export default compressImage;
