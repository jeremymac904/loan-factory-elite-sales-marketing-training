import { BrandAsset } from "@/data/brandAssets";

type Props = {
  asset: BrandAsset;
  className?: string;
  // The natural rendered height. Width is auto so the logo never stretches.
  heightClass?: string;
  /** When true, render at fixed pixel height for crisp logo display */
  priority?: boolean;
};

/**
 * Plain <img> on purpose. We are in static export. Logos are PNG with alpha.
 * We never set width and height together; we use object-contain + height-only
 * to preserve aspect ratio and prevent stretching or cropping.
 */
export default function BrandImage({
  asset,
  className,
  heightClass = "h-10",
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.filePath}
      alt={asset.alt}
      className={`${heightClass} w-auto object-contain ${className ?? ""}`}
      loading="lazy"
      decoding="async"
    />
  );
}
