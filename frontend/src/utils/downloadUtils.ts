/**
 * Triggers a file download in the browser
 * @param url - URL or blob URL of file to download
 * @param filename - Name for downloaded file
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads content as a text file
 * @param content - Text content to download
 * @param filename - Name for downloaded file
 * @param mimeType - MIME type (default: text/plain)
 */
export const downloadTextFile = (
  content: string,
  filename: string,
  mimeType: string = 'text/plain'
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
  URL.revokeObjectURL(url);
};

/**
 * Downloads JSON data as a file
 * @param data - Data to convert to JSON
 * @param filename - Name for downloaded file
 */
export const downloadJSON = (data: any, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2);
  downloadTextFile(jsonString, filename, 'application/json');
};
