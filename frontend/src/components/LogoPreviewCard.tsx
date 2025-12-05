import { useState, useEffect } from 'react';
import { Download, Eye, Check, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { downloadFile } from '../utils/downloadUtils';
import { analyzeImageBrightness } from '../utils/imageAnalyzer';

interface LogoPreviewCardProps {
  name: string;
  filename: string;
  variant: string;
  format: 'SVG' | 'PNG';
  background?: 'light' | 'dark' | 'gradient';
  description?: string;
}

export default function LogoPreviewCard({
  name,
  filename,
  variant,
  format,
  background: _background = 'light',
  description,
}: LogoPreviewCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [detectedBackground, setDetectedBackground] = useState<'light' | 'dark'>('light');
  const [currentBackground, setCurrentBackground] = useState<'light' | 'dark'>('light');
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Analyze image pixels on mount to determine optimal background
  useEffect(() => {
    const analyzeImage = async () => {
      setIsAnalyzing(true);
      try {
        const imagePath = `/brand/logos/${filename}`;
        const result = await analyzeImageBrightness(imagePath);
        setDetectedBackground(result);
        setCurrentBackground(result);
      } catch (error) {
        console.error('Error analyzing image:', error);
        setDetectedBackground('light');
        setCurrentBackground('light');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, [filename]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      downloadFile(`/brand/logos/${filename}`, filename);
      toast.success(`Downloaded: ${name}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleBackground = () => {
    setCurrentBackground((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Get background class based on current background mode
  const getBgClass = () => {
    if (currentBackground === 'dark') {
      return 'bg-gray-900';
    } else {
      return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-lift"
    >
      {/* Format Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-lg
                     ${
                       format === 'SVG'
                         ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                         : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                     }`}
        >
          {format}
        </span>
      </div>

      {/* Background Toggle Button */}
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={toggleBackground}
          disabled={isAnalyzing}
          className={`p-2 rounded-lg transition-all duration-200 backdrop-blur-sm
                     ${
                       currentBackground === 'dark'
                         ? 'bg-white/90 text-gray-900 hover:bg-white'
                         : 'bg-gray-900/90 text-white hover:bg-gray-900'
                     }
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg`}
          title={`Switch to ${currentBackground === 'light' ? 'dark' : 'light'} background`}
        >
          {currentBackground === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Logo Preview Area */}
      <div
        className={`relative h-48 flex items-center justify-center p-8 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ${getBgClass()}`}
      >
        {/* Smart Detection Indicator Badge */}
        {!isAnalyzing && detectedBackground === 'dark' && (
          <div className="absolute bottom-2 right-2 z-10">
            <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded flex items-center gap-1">
              <Sun className="w-3 h-3" />
              Auto: Dark BG
            </span>
          </div>
        )}
        {!isAnalyzing && detectedBackground === 'light' && (
          <div className="absolute bottom-2 right-2 z-10">
            <span className="px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-xs font-medium text-white rounded flex items-center gap-1">
              <Moon className="w-3 h-3" />
              Auto: Light BG
            </span>
          </div>
        )}

        {isAnalyzing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <img
            src={`/brand/logos/${filename}`}
            alt={name}
            className="max-w-full max-h-full object-contain"
            style={{ maxWidth: '180px', maxHeight: '140px' }}
          />
        )}

        {/* Preview Overlay on Hover */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                     transition-opacity duration-200 flex items-center justify-center"
        >
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium
                       flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Logo Info */}
      <div className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
            {name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{variant}</p>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium
                       bg-gradient-to-r from-primary-600 to-primary-500 text-white
                       hover:from-primary-700 hover:to-primary-600
                       disabled:from-gray-400 disabled:to-gray-400
                       transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* File Size Info */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {format === 'SVG' ? 'Vector (Scalable)' : 'Raster (4x Resolution)'}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{variant}</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200
                           dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
            <div className={`rounded-xl p-12 flex items-center justify-center ${getBgClass()}`}>
              <img
                src={`/brand/logos/${filename}`}
                alt={name}
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
