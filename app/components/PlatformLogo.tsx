import Image from "next/image";
import {
  getPlatformIcon,
  ORDER_PLATFORMS,
} from "@/app/lib/order-options";

type Platform = (typeof ORDER_PLATFORMS)[number];

const CONSOLE_COLORS: Partial<Record<Platform, string>> = {
  Xbox: "#107c10",
  PlayStation: "#006fcd",
};

export default function PlatformLogo({
  platform,
  size = 24,
  className = "",
}: {
  platform: string;
  size?: number;
  className?: string;
}) {
  const icon = getPlatformIcon(platform);
  const color = CONSOLE_COLORS[platform as Platform];

  if (!color) {
    return (
      <Image
        src={icon}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={`shrink-0 object-contain ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url("${icon}")`,
        maskImage: `url("${icon}")`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
