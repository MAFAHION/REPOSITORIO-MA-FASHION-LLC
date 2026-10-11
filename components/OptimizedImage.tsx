import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, OptimizeImageOptions } from '../utils/imageOptimizer';
import { ImageIcon } from 'lucide-react';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  quality?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'inside';
  priority?: boolean;
  containerClassName?: string;
  showSkeleton?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 82,
  fit = 'contain' as const,
  priority = false,
  className = '',
  containerClassName = '',
  showSkeleton = true,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  // Optimized URL with Cloudflare CDN WebP transcoding
  const optimizedUrl = React.useMemo(() => {
    return getOptimizedImageUrl(src, { width, height, quality, fit });
  }, [src, width, height, quality, fit]);

  const [currentSrc, setCurrentSrc] = useState(optimizedUrl);

  useEffect(() => {
    setCurrentSrc(optimizedUrl);
    setIsLoaded(false);
    setHasError(false);
    setIsFallback(false);
  }, [optimizedUrl]);

  const handleError = () => {
    if (!isFallback && currentSrc !== src) {
      // Step 1: Fallback from edge CDN to the direct ImgBB origin URL
      setIsFallback(true);
      setCurrentSrc(src);
    } else {
      // Step 2: If both fail, render elegant placeholder
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${containerClassName}`}>
      {/* Skeleton Shimmer Loader */}
      {showSkeleton && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-amber-500/20 border-t-amber-500/80 animate-spin" />
        </div>
      )}

      {/* Error Fallback Box */}
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/80 text-zinc-500 p-3 text-center">
          <ImageIcon className="w-6 h-6 mb-1 text-zinc-600" />
          <span className="text-[10px] uppercase font-mono tracking-wider truncate max-w-full">
            {alt || 'Imagen'}
          </span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleError}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};
