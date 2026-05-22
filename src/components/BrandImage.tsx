/* eslint-disable @next/next/no-img-element */
import { BrandAsset } from "@/data/brandAssets";

type Props = {
  asset: BrandAsset;
  className?: string;
  // The natural rendered height. Width is auto so the logo never stretches.
  heightClass?: string;
};

/**
 * Plain <img> on purpose. We are in static export. Logos may be SVG or PNG.
 * We never set width and height together; we use object-contain + height-only
 * to preserve aspect ratio and prevent stretching or cropping.
 *
 * When the asset declares a fallbackPath we wrap in <picture> so SVG is used
 * by default and PNG kicks in if SVG ever fails to load. No client JS needed.
 */
export default function BrandImage({
  asset,
  className,
  heightClass = "h-10",
}: Props) {
  const imgClass = `${heightClass} w-auto object-contain ${className ?? ""}`;
  const isSvgPrimary = asset.filePath.toLowerCase().endsWith(".svg");

  if (asset.fallbackPath && isSvgPrimary) {
    return (
      <picture>
        <source srcSet={asset.filePath} type="image/svg+xml" />
        <img
          src={asset.fallbackPath}
          alt={asset.alt}
          className={imgClass}
          loading="lazy"
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <img
      src={asset.filePath}
      alt={asset.alt}
      className={imgClass}
      loading="lazy"
      decoding="async"
    />
  );
}
