import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Download, BookOpen, Palette, Type, FileText, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import BrandValueCard from '../components/BrandValueCard';
import DownloadCard from '../components/DownloadCard';
import LogoPreviewCard from '../components/LogoPreviewCard';
import ColorSwatch from '../components/ColorSwatch';
import { copyToClipboard } from '../utils/clipboard';
import { downloadFile } from '../utils/downloadUtils';
import {
  exportColorsCSS,
  exportColorsJSON,
  exportSketchPalette,
  exportFigmaTokens,
} from '../utils/colorExportUtils';
import {
  exportTypographyJSON,
  exportTypographyCSS,
  downloadFontFiles,
} from '../utils/typographyExportUtils';
import {
  brandValues,
  brandColors,
  brandTypography,
  logoGuidelines,
  missionVision,
  logoAssets,
} from '../data/brandGuidelinesData';
import JSZip from 'jszip';

export default function BrandGuidelines() {
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = async (text: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 1500);
      toast.success(`Copied: ${text}`);
    }
  };

  const downloadCompleteBrandKit = async () => {
    try {
      const zip = new JSZip();

      // Add README
      const readme = `SabPaisa Brand Kit

This package contains all brand assets including:
- Logo files (SVG and PNG in multiple sizes)
- Color palettes (CSS, JSON, Sketch, Figma formats)
- Typography specifications
- Brand Guidelines PDF

Usage:
1. Logos: Use blue logos on light backgrounds, white logos on dark backgrounds
2. Colors: Import the CSS file or use the JSON data in your projects
3. Typography: Install font files and use the provided CSS classes
4. Guidelines: Refer to the PDF for complete brand guidelines

For questions or support, please contact the SabPaisa design team.

© ${new Date().getFullYear()} SabPaisa. All rights reserved.
`;
      zip.file('README.txt', readme);

      // Add all logo files
      const logosFolder = zip.folder('logos');
      const logoFiles = [
        'Asset 1.svg', 'Asset 2.svg', 'Asset 3.svg', 'Asset 4.svg', 'Asset 5.svg', 'Asset 6.svg',
        'Asset 7@4x.png', 'Asset 8@4x.png', 'Asset 9@4x.png', 'Asset 10@4x.png', 'Asset 11@4x.png',
        'For Blue@4x.png', 'For Dark Blue@4x.png', 'For Orange@4x.png', 'For White@4x.png',
        'Group 46306.svg', 'Group 46307.svg', 'Group 46308.svg', 'sabpaisa-logo.svg'
      ];

      for (const logoFile of logoFiles) {
        try {
          const logoResponse = await fetch(`/brand/logos/${logoFile}`);
          if (logoResponse.ok) {
            const logoBlob = await logoResponse.blob();
            logosFolder?.file(logoFile, logoBlob);
          }
        } catch (error) {
          console.log(`Logo ${logoFile} not found, skipping`);
        }
      }

      // Add color exports
      const colorsFolder = zip.folder('colors');

      // CSS colors
      const cssColors = await fetch('/brand/colors/sabpaisa-colors.css');
      if (cssColors.ok) {
        colorsFolder?.file('sabpaisa-colors.css', await cssColors.text());
      }

      // JSON colors
      const jsonColors = await fetch('/brand/colors/sabpaisa-colors.json');
      if (jsonColors.ok) {
        colorsFolder?.file('sabpaisa-colors.json', await jsonColors.text());
      }

      // Add PDF
      try {
        const pdfResponse = await fetch('/brand/docs/SabPaisa-Brand-Guidelines.pdf');
        if (pdfResponse.ok) {
          const pdfBlob = await pdfResponse.blob();
          zip.file('SabPaisa-Brand-Guidelines.pdf', pdfBlob);
        }
      } catch (error) {
        console.log('PDF not found, skipping');
      }

      // Generate ZIP
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      downloadFile(url, 'sabpaisa-brand-kit.zip');
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating brand kit:', error);
      toast.error('Failed to create brand kit. Please try again.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Brand Guidelines</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Comprehensive brand identity guidelines for SabPaisa. Download all assets,
            explore our brand values, and maintain consistency across all touchpoints.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => downloadFile('/brand/docs/SabPaisa-Brand-Guidelines.pdf', 'SabPaisa-Brand-Guidelines.pdf')}
              className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold
                         hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={downloadCompleteBrandKit}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl
                         font-semibold hover:bg-white/20 transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Complete Brand Kit
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <section>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700
                       rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {missionVision.vision.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {missionVision.vision.content}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {missionVision.tagline}
              </span>
              <button
                onClick={() => handleCopy(missionVision.tagline, 'tagline')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {copiedText === 'tagline' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700
                       rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {missionVision.mission.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {missionVision.mission.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Our Values
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Core principles that guide everything we do at SabPaisa
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandValues.map((value, index) => (
            <BrandValueCard key={value.id} {...value} index={index} />
          ))}
        </div>
      </section>

      {/* Brand Colors */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-7 h-7 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Brand Colors
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Official color palette with HEX codes. Click any color to copy.
          </p>
        </div>

        {/* Primary Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Primary Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandColors.primary.map((color) => (
              <ColorSwatch
                key={color.hex}
                name={color.name}
                hex={color.hex}
                usage={color.usage}
                showFormats={true}
              />
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Secondary Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brandColors.secondary.map((color) => (
              <ColorSwatch
                key={color.hex}
                name={color.name}
                hex={color.hex}
                usage={color.usage}
                showFormats={true}
              />
            ))}
          </div>
        </div>

        {/* Color Downloads */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Download Color Palettes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DownloadCard
              title="CSS Variables"
              description="Ready-to-use CSS custom properties"
              format="CSS"
              onDownload={exportColorsCSS}
            />
            <DownloadCard
              title="JSON Format"
              description="Structured color data for development"
              format="JSON"
              onDownload={exportColorsJSON}
            />
            <DownloadCard
              title="Sketch Palette"
              description="Import into Sketch design tool"
              format="SKETCH"
              onDownload={exportSketchPalette}
            />
            <DownloadCard
              title="Figma Tokens"
              description="Design tokens for Figma projects"
              format="FIGMA"
              onDownload={exportFigmaTokens}
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-7 h-7 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Typography
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Official typefaces and typography specifications
          </p>
        </div>

        {/* Font Families */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {brandTypography.heading.family}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {brandTypography.heading.usage}
              </p>
              <button
                onClick={() => handleCopy(brandTypography.heading.family, 'heading-font')}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400
                           flex items-center gap-1"
              >
                {copiedText === 'heading-font' ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy font name</span>
              </button>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {brandTypography.heading.example}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              {brandTypography.heading.characteristics}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {brandTypography.body.family}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {brandTypography.body.usage}
              </p>
              <button
                onClick={() => handleCopy(brandTypography.body.family, 'body-font')}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400
                           flex items-center gap-1"
              >
                {copiedText === 'body-font' ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy font name</span>
              </button>
            </div>
            <div className="text-lg text-gray-900 dark:text-white">
              {brandTypography.body.example}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              {brandTypography.body.characteristics}
            </p>
            <div className="flex gap-2 mt-3">
              {brandTypography.body.weights.map((weight) => (
                <span
                  key={weight}
                  className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {weight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Typography Downloads */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Download Typography Assets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DownloadCard
              title="Typography JSON"
              description="Complete typography specifications"
              format="JSON"
              onDownload={exportTypographyJSON}
            />
            <DownloadCard
              title="Typography CSS"
              description="CSS utility classes for typography"
              format="CSS"
              onDownload={exportTypographyCSS}
            />
            <DownloadCard
              title="Font Files"
              description="Neusharp Bold & Sofia Pro fonts"
              format="ZIP"
              onDownload={downloadFontFiles}
            />
          </div>
        </div>
      </section>

      {/* Logo Guidelines */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Logo Guidelines
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Usage rules and specifications for the SabPaisa logo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Dos */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <Check className="w-6 h-6" />
              Do
            </h3>
            <ul className="space-y-2">
              {logoGuidelines.dos.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-green-900 dark:text-green-200">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">✗</span>
              Don't
            </h3>
            <ul className="space-y-2">
              {logoGuidelines.donts.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-900 dark:text-red-200">
                  <span className="text-lg flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logo specs */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {logoGuidelines.spacing.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {logoGuidelines.spacing.description}
            </p>
            <button
              onClick={() => handleCopy(logoGuidelines.spacing.rule, 'spacing')}
              className="text-sm font-mono text-primary-600 dark:text-primary-400 flex items-center gap-1"
            >
              {copiedText === 'spacing' ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{logoGuidelines.spacing.rule}</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Minimum Size - Print
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {logoGuidelines.minimumSize.description}
            </p>
            <button
              onClick={() => handleCopy(logoGuidelines.minimumSize.print, 'min-print')}
              className="text-sm font-mono text-primary-600 dark:text-primary-400 flex items-center gap-1"
            >
              {copiedText === 'min-print' ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{logoGuidelines.minimumSize.print}</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Minimum Size - Digital
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {logoGuidelines.minimumSize.description}
            </p>
            <button
              onClick={() => handleCopy(logoGuidelines.minimumSize.digital, 'min-digital')}
              className="text-sm font-mono text-primary-600 dark:text-primary-400 flex items-center gap-1"
            >
              {copiedText === 'min-digital' ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{logoGuidelines.minimumSize.digital}</span>
            </button>
          </div>
        </div>

      </section>

      {/* Complete Logo Library */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Image className="w-7 h-7 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Complete Logo Library
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            All SabPaisa logo variations in SVG and PNG formats. Click any logo to preview and download.
          </p>
        </div>

        {/* Primary Logos - SVG */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-sm rounded-lg font-bold">
              SVG
            </span>
            Primary Logos (Vector)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Scalable vector graphics for digital and print. Perfect for all sizes and resolutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoAssets.primary.svg.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LogoPreviewCard {...logo} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Primary Logos - PNG */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-lg font-bold">
              PNG
            </span>
            Primary Logos (Raster)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            High-resolution PNG files at 4x resolution (2048px+). Ideal for presentations and web.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoAssets.primary.png.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LogoPreviewCard {...logo} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary Logos - SVG */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-sm rounded-lg font-bold">
              SVG
            </span>
            Secondary Logos (Vector)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Secondary brand marks for supporting materials and co-branding opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoAssets.secondary.svg.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LogoPreviewCard {...logo} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary Logos - PNG */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-lg font-bold">
              PNG
            </span>
            Secondary Logos (Raster)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Secondary logos optimized for specific background colors. High-resolution at 4x.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {logoAssets.secondary.png.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LogoPreviewCard {...logo} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download All Logos */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Download All Logos
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get the complete logo package with all 18 variations in SVG and PNG formats.
                Perfect for designers and developers.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                  6 SVG Primary
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                  5 PNG Primary
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                  3 SVG Secondary
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                  4 PNG Secondary
                </span>
              </div>
            </div>
            <button
              onClick={async () => {
                try {
                  const zip = new JSZip();
                  const logosFolder = zip.folder('sabpaisa-logos');

                  // Add all primary SVG logos
                  const primarySvgFolder = logosFolder?.folder('primary-svg');
                  for (const logo of logoAssets.primary.svg) {
                    const response = await fetch(`/brand/logos/${logo.filename}`);
                    if (response.ok) {
                      primarySvgFolder?.file(logo.filename, await response.blob());
                    }
                  }

                  // Add all primary PNG logos
                  const primaryPngFolder = logosFolder?.folder('primary-png');
                  for (const logo of logoAssets.primary.png) {
                    const response = await fetch(`/brand/logos/${logo.filename}`);
                    if (response.ok) {
                      primaryPngFolder?.file(logo.filename, await response.blob());
                    }
                  }

                  // Add all secondary SVG logos
                  const secondarySvgFolder = logosFolder?.folder('secondary-svg');
                  for (const logo of logoAssets.secondary.svg) {
                    const response = await fetch(`/brand/logos/${logo.filename}`);
                    if (response.ok) {
                      secondarySvgFolder?.file(logo.filename, await response.blob());
                    }
                  }

                  // Add all secondary PNG logos
                  const secondaryPngFolder = logosFolder?.folder('secondary-png');
                  for (const logo of logoAssets.secondary.png) {
                    const response = await fetch(`/brand/logos/${logo.filename}`);
                    if (response.ok) {
                      secondaryPngFolder?.file(logo.filename, await response.blob());
                    }
                  }

                  // Add README
                  const readme = `SabPaisa Complete Logo Package

This package contains all 18 logo variations:

Primary Logos (SVG):
- 6 vector files for scalable usage

Primary Logos (PNG):
- 5 high-resolution raster files at 4x resolution

Secondary Logos (SVG):
- 3 secondary brand marks in vector format

Secondary Logos (PNG):
- 4 secondary logos optimized for specific backgrounds

Usage Guidelines:
- Use Primary logos for main branding
- Use Secondary logos for supporting materials
- Use SVG files when possible for best quality
- Use PNG files for presentations and web

© ${new Date().getFullYear()} SabPaisa. All rights reserved.
`;
                  logosFolder?.file('README.txt', readme);

                  const blob = await zip.generateAsync({ type: 'blob' });
                  const url = URL.createObjectURL(blob);
                  downloadFile(url, 'sabpaisa-complete-logo-pack.zip');
                  URL.revokeObjectURL(url);
                  toast.success('Downloaded: Complete Logo Package');
                } catch (error) {
                  console.error('Error creating logo package:', error);
                  toast.error('Failed to create logo package');
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl
                       font-bold text-lg hover:from-primary-700 hover:to-primary-600
                       shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 whitespace-nowrap"
            >
              <Download className="w-6 h-6" />
              Download All Logos (ZIP)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
