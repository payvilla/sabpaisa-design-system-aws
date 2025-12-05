import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Copy, Check, Download, Code, X, Palette, Zap, Sliders } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { sabpaisaIcons, iconCategories, searchIcons, getIconCountByCategory } from '../data/iconData';
import type { IconMetadata } from '../data/iconData';

// Brand Colors for icon customization
const brandColorPresets = [
  { name: 'Primary Blue', hex: '#006CED', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Primary Orange', hex: '#FF8800', gradient: 'from-orange-500 to-orange-600' },
  { name: 'Primary Navy', hex: '#002E8B', gradient: 'from-blue-900 to-blue-950' },
  { name: 'Dark Gray', hex: '#212121', gradient: 'from-gray-800 to-gray-900' },
  { name: 'Light Blue', hex: '#4D98F2', gradient: 'from-blue-400 to-blue-500' },
  { name: 'Light Orange', hex: '#FFAC4D', gradient: 'from-orange-300 to-orange-400' },
  { name: 'Success Green', hex: '#10B981', gradient: 'from-green-500 to-emerald-500' },
  { name: 'Error Red', hex: '#EF4444', gradient: 'from-red-500 to-red-600' },
  { name: 'Purple', hex: '#8B5CF6', gradient: 'from-purple-500 to-purple-600' },
  { name: 'Cyan', hex: '#06B6D4', gradient: 'from-cyan-500 to-cyan-600' },
  { name: 'Pink', hex: '#EC4899', gradient: 'from-pink-500 to-pink-600' },
  { name: 'Amber', hex: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
];

const sizePresets = [
  { name: 'XS', size: 16, label: '16px' },
  { name: 'SM', size: 20, label: '20px' },
  { name: 'MD', size: 24, label: '24px' },
  { name: 'LG', size: 32, label: '32px' },
  { name: 'XL', size: 48, label: '48px' },
  { name: '2XL', size: 64, label: '64px' },
];

const strokePresets = [
  { name: 'Thin', value: 1, label: '1px' },
  { name: 'Normal', value: 1.5, label: '1.5px' },
  { name: 'Medium', value: 2, label: '2px' },
  { name: 'Bold', value: 2.5, label: '2.5px' },
];

export default function Icons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedIcon, setCopiedIcon] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<IconMetadata | null>(null);

  // Customization states
  const [selectedColor, setSelectedColor] = useState('#006CED');
  const [customColor, setCustomColor] = useState('#006CED');
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedStroke, setSelectedStroke] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Filter icons by category and search term
  const filteredIcons = useMemo(() => {
    return searchIcons(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  // Handle copying icon name
  const handleCopyName = async (iconName: string) => {
    const success = await copyToClipboard(iconName);
    if (success) {
      setCopiedIcon(`name-${iconName}`);
      setTimeout(() => setCopiedIcon(''), 1500);
    }
  };

  // Handle copying React code with customization
  const handleCopyCode = async (iconName: string, withCustomization = false) => {
    let code = `import { ${iconName}Icon } from '@/icons/SabPaisaIcons';\n\n`;

    if (withCustomization && (selectedColor !== '#006CED' || selectedSize !== 24 || selectedStroke !== 2)) {
      code += `<${iconName}Icon\n`;
      if (selectedSize !== 24) {
        code += `  size={${selectedSize}}\n`;
      }
      if (selectedStroke !== 2) {
        code += `  strokeWidth={${selectedStroke}}\n`;
      }
      code += `  className="w-${selectedSize === 16 ? '4' : selectedSize === 20 ? '5' : selectedSize === 24 ? '6' : selectedSize === 32 ? '8' : selectedSize === 48 ? '12' : '16'} h-${selectedSize === 16 ? '4' : selectedSize === 20 ? '5' : selectedSize === 24 ? '6' : selectedSize === 32 ? '8' : selectedSize === 48 ? '12' : '16'}"\n`;
      code += `  style={{ color: '${selectedColor}' }}\n/>`;
    } else {
      code += `<${iconName}Icon className="w-6 h-6" />`;
    }

    const success = await copyToClipboard(code);
    if (success) {
      setCopiedIcon(`code-${iconName}`);
      setTimeout(() => setCopiedIcon(''), 1500);
    }
  };

  // Handle SVG export
  const handleDownloadSVG = async (icon: IconMetadata) => {
    alert(`SVG download for ${icon.name} - Feature coming soon!`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Futuristic Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-10 h-10" />
            <h1 className="text-5xl font-bold">SabPaisa Icon Library</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Custom fintech-specific icons with real-time color customization.
            All icons are optimized, accessible, and support dark mode.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <span className="text-2xl font-bold">{sabpaisaIcons.length}</span>
              <span className="text-sm ml-2 text-white/80">Custom Icons</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <span className="text-2xl font-bold">{brandColorPresets.length}</span>
              <span className="text-sm ml-2 text-white/80">Color Presets</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <span className="text-2xl font-bold">∞</span>
              <span className="text-sm ml-2 text-white/80">Possibilities</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Preview Playground */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
            <Sliders className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Live Icon Customizer</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview Area */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-center h-64">
              {selectedIcon ? (
                <motion.div
                  key={`${selectedColor}-${selectedSize}-${selectedStroke}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {(() => {
                    const IconComponent = selectedIcon.component;
                    return (
                      <IconComponent
                        size={selectedSize}
                        strokeWidth={selectedStroke}
                        style={{ color: selectedColor }}
                        className="drop-shadow-2xl"
                      />
                    );
                  })()}
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 blur-3xl opacity-30 -z-10"
                    style={{ backgroundColor: selectedColor }}
                  />
                </motion.div>
              ) : (
                <div className="text-center text-gray-500">
                  <Palette className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Select an icon to preview</p>
                </div>
              )}
            </div>
            {selectedIcon && (
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-white mb-1">{selectedIcon.name}</p>
                <p className="text-sm text-gray-400">{selectedIcon.description}</p>
              </div>
            )}
          </div>

          {/* Customization Controls */}
          <div className="space-y-6">
            {/* Color Presets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">Color Presets</label>
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-medium transition-colors"
                >
                  {showColorPicker ? 'Hide' : 'Custom'} Color
                </button>
              </div>

              {showColorPicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedColor(e.target.value);
                    }}
                    className="w-full h-12 rounded-xl cursor-pointer bg-gray-700 border-2 border-gray-600"
                  />
                </motion.div>
              )}

              <div className="grid grid-cols-6 gap-3">
                {brandColorPresets.map((color) => (
                  <motion.button
                    key={color.hex}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`
                      relative h-12 rounded-xl transition-all duration-200
                      ${selectedColor === color.hex ? 'ring-4 ring-white/50 ring-offset-2 ring-offset-gray-800' : 'hover:ring-2 ring-white/30'}
                    `}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.hex && (
                      <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Control */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                Size: {selectedSize}px
              </label>
              <div className="grid grid-cols-6 gap-2">
                {sizePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedSize(preset.size)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                      ${selectedSize === preset.size
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke Width Control */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                Stroke Width: {selectedStroke}px
              </label>
              <div className="grid grid-cols-4 gap-2">
                {strokePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedStroke(preset.value)}
                    className={`
                      px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                      ${selectedStroke === preset.value
                        ? 'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {selectedIcon && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleCopyCode(selectedIcon.name, true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                           bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium
                           hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg"
                >
                  {copiedIcon === `code-${selectedIcon.name}` ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadSVG(selectedIcon)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                           bg-gray-700 text-white font-medium
                           hover:bg-gray-600 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        {iconCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
              }
            `}
          >
            {category}
            <span
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-bold
                ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
            >
              {getIconCountByCategory(category)}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative max-w-2xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search icons by name, tags, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-32 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                     transition-all duration-200 shadow-lg"
        />
        {searchTerm && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
            {filteredIcons.length} {filteredIcons.length === 1 ? 'result' : 'results'}
          </div>
        )}
      </motion.div>

      {/* Icons Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {filteredIcons.map((icon, index) => {
          const IconComponent = icon.component;
          return (
            <motion.div
              key={icon.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg
                         hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer
                         border border-gray-200 dark:border-gray-700
                         transition-all duration-300"
              onClick={() => setSelectedIcon(icon)}
              title={`${icon.name} - ${icon.description}`}
            >
              <div className="flex flex-col items-center gap-3">
                {/* Icon Display */}
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800
                                group-hover:from-primary-50 group-hover:to-secondary-50
                                dark:group-hover:from-primary-900/20 dark:group-hover:to-secondary-900/20
                                transition-all duration-300">
                  <IconComponent
                    className="w-8 h-8 text-gray-700 dark:text-gray-300
                             group-hover:text-primary-600 dark:group-hover:text-primary-400
                             transition-colors duration-300"
                    style={{ color: selectedIcon?.name === icon.name ? selectedColor : undefined }}
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 blur-xl bg-gradient-to-br from-primary-500 to-secondary-500 transition-opacity duration-300 -z-10" />
                </div>

                {/* Icon Info */}
                <div className="text-center w-full">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {icon.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {icon.category}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                                transition-opacity duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(icon.name);
                    }}
                    className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-lg
                               hover:bg-primary-50 dark:hover:bg-primary-900/20
                               transition-colors duration-200 backdrop-blur-sm"
                    title="Copy React code"
                  >
                    {copiedIcon === `code-${icon.name}` ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Code className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredIcons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            No icons found matching "{searchTerm}"
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Try a different search term or category
          </p>
        </motion.div>
      )}

      {/* Icon Detail Modal */}
      <AnimatePresence>
        {selectedIcon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIcon(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 p-8 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-xl">
                    {(() => {
                      const IconComponent = selectedIcon.component;
                      return <IconComponent size={40} className="text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedIcon.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedIcon.category} • {selectedIcon.tags.length} tags
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIcon(null)}
                  className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    {selectedIcon.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIcon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-xl text-sm font-medium
                                   bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600
                                   text-gray-700 dark:text-gray-300 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview Sizes with Current Color */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
                    Size Variants (with selected color)
                  </h4>
                  <div className="flex items-center justify-around p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600">
                    {[16, 20, 24, 32, 48, 64].map((size) => {
                      const IconComponent = selectedIcon.component;
                      return (
                        <div key={size} className="flex flex-col items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                            <IconComponent
                              size={size}
                              strokeWidth={selectedStroke}
                              style={{ color: selectedColor }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {size}px
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* React Code */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      React Usage
                    </h4>
                    <button
                      onClick={() => handleCopyCode(selectedIcon.name, true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
                                 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600
                                 text-white text-sm font-medium shadow-lg transition-all duration-200"
                    >
                      {copiedIcon === `code-${selectedIcon.name}` ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-6 rounded-2xl bg-gray-900 dark:bg-gray-950 text-gray-100 text-sm overflow-x-auto border border-gray-700 font-mono">
                    <code>{`import { ${selectedIcon.name}Icon } from '@/icons/SabPaisaIcons';

// Basic usage
<${selectedIcon.name}Icon className="w-6 h-6" />

// With custom color (${selectedColor})
<${selectedIcon.name}Icon
  size={${selectedSize}}
  strokeWidth={${selectedStroke}}
  style={{ color: '${selectedColor}' }}
/>

// With Tailwind classes
<${selectedIcon.name}Icon
  className="w-8 h-8 text-primary-600 hover:text-primary-700"
/>

// Responsive sizing
<${selectedIcon.name}Icon
  className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
/>`}</code>
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleCopyName(selectedIcon.name)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                               border-2 border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300 font-semibold
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md"
                  >
                    {copiedIcon === `name-${selectedIcon.name}` ? (
                      <>
                        <Check className="w-5 h-5" />
                        Name Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Name
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownloadSVG(selectedIcon)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                               bg-gradient-to-r from-secondary-600 to-secondary-500 text-white font-semibold
                               hover:from-secondary-700 hover:to-secondary-600 transition-all duration-200 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download SVG
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
