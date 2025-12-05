/**
 * Analyzes an image to determine if it contains predominantly light or dark pixels
 * Returns 'dark' if image has more light pixels (needs dark background)
 * Returns 'light' if image has more dark pixels (needs light background)
 */
export const analyzeImageBrightness = (
  imageSrc: string
): Promise<'light' | 'dark'> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        // Create canvas to analyze image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback to light background if can't analyze
          resolve('light');
          return;
        }

        // Set canvas size to image size (but limit for performance)
        const maxSize = 200;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let lightPixelCount = 0;
        let darkPixelCount = 0;
        let totalOpaquePixels = 0;

        // Analyze each pixel
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          // Skip transparent pixels
          if (a < 128) continue;

          totalOpaquePixels++;

          // Calculate perceived brightness using luminance formula
          // Human eye is more sensitive to green, less to blue
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          // Threshold: 128 is middle gray (0-255 scale)
          if (brightness > 180) {
            // Very light pixel (white-ish)
            lightPixelCount++;
          } else if (brightness < 75) {
            // Very dark pixel (black-ish)
            darkPixelCount++;
          }
        }

        // Calculate percentages
        const lightPercentage = (lightPixelCount / totalOpaquePixels) * 100;
        const darkPercentage = (darkPixelCount / totalOpaquePixels) * 100;

        // Decision logic:
        // If logo has more light pixels (>30%), it needs a dark background
        // If logo has more dark pixels (>30%), it needs a light background
        // Otherwise, use light background as default

        if (lightPercentage > 30) {
          resolve('dark'); // Light logo needs dark background
        } else if (darkPercentage > 30) {
          resolve('light'); // Dark logo needs light background
        } else {
          // Mixed or colorful logo - default to light background
          resolve('light');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
        resolve('light'); // Fallback to light background
      }
    };

    img.onerror = () => {
      console.error('Error loading image for analysis');
      resolve('light'); // Fallback to light background
    };

    img.src = imageSrc;
  });
};
