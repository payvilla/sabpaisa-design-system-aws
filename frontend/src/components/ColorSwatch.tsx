import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { hexToRgb, hexToHsl } from '../utils/colorUtils';

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage?: string;
  shade?: string;
  showFormats?: boolean;
}

export default function ColorSwatch({ name, hex, usage, shade, showFormats = false }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const rgb = hexToRgb(hex);
  const hsl = hexToHsl(hex);

  return (
    <div className="group relative hover-lift rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
      {/* Color Display */}
      <div
        className="h-32 w-full cursor-pointer relative"
        style={{ backgroundColor: hex }}
        onClick={() => handleCopy(hex)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-white text-xs font-mono bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
            {hex}
          </span>
          <button
            className="p-1.5 rounded-lg bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100
                       transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(hex);
            }}
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Color Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {name} {shade && <span className="text-gray-500 dark:text-gray-400">{shade}</span>}
          </h4>
        </div>

        {usage && (
          <p className="text-xs text-gray-600 dark:text-gray-400">{usage}</p>
        )}

        {showFormats && (
          <div className="space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">RGB:</span>
              <code className="font-mono text-gray-700 dark:text-gray-300">{rgb}</code>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">HSL:</span>
              <code className="font-mono text-gray-700 dark:text-gray-300">{hsl}</code>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Tailwind:</span>
              <code className="font-mono text-gray-700 dark:text-gray-300">
                {name.toLowerCase()}-{shade}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
