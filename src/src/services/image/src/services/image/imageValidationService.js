import { APP_CONFIG } from '../../config/appConfig';

export function validateImage(file) {
  if (!file) {
    return { valid: false, error: 'No image selected.' };
  }

  const allowedFormats = APP_CONFIG?.PALM_SCAN?.ALLOWED_FORMATS || [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  const maxSizeMB = APP_CONFIG?.PALM_SCAN?.MAX_IMAGE_SIZE_MB || 10;
  const fileSizeMB = file.size / 1024 / 1024;

  if (!allowedFormats.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, and WEBP images are supported.' };
  }

  if (fileSizeMB > maxSizeMB) {
    return { valid: false, error: `Image exceeds ${maxSizeMB}MB limit.` };
  }

  return {
    valid: true,
    error: null,
    metadata: {
      name: file.name,
      type: file.type,
      sizeMB: Number(fileSizeMB.toFixed(2))
    }
  };
}

export default validateImage;
