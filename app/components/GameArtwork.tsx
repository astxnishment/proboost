import Image, { type ImageProps } from "next/image";
import { GAME_ARTWORK } from "../lib/game-artwork";

/** Shared artwork delivery for heroes and cards; icons keep their own sources. */
export default function GameArtwork({ src, alt, style, quality = 90, ...props }: ImageProps) {
  const artwork = typeof src === "string" ? GAME_ARTWORK[src] : undefined;
  return <Image
    {...props}
    alt={alt}
    src={artwork?.src ?? src}
    quality={quality}
    style={artwork?.position ? { ...style, objectPosition: artwork.position } : style}
    data-game-artwork="true"
  />;
}
