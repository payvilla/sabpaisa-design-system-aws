import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface DownloadCardProps {
  title: string;
  description: string;
  format: string;
  fileSize?: string;
  onDownload: () => void | Promise<void>;
}

export default function DownloadCard({
  title,
  description,
  format,
  fileSize,
  onDownload,
}: DownloadCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
      toast.success(`Downloaded: ${title}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover-lift group relative overflow-hidden">
      {/* Format badge */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 text-xs font-semibold rounded-lg
                       bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {format}
        </span>
      </div>

      {/* Content */}
      <div className="pr-16 mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-base">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
          {description}
        </p>
        {fileSize && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Size: {fileSize}
          </p>
        )}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full px-4 py-2.5 rounded-lg font-medium text-sm
                   bg-gradient-to-r from-primary-600 to-primary-500 text-white
                   hover:from-primary-700 hover:to-primary-600
                   disabled:from-gray-400 disabled:to-gray-400
                   transition-all duration-200 shadow-md hover:shadow-lg
                   flex items-center justify-center gap-2"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  );
}
