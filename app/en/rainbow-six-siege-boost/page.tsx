import SiegeBoostingPage from "../../boosting/page";
import { gameMetadata } from "../../lib/game-metadata";

export const metadata = gameMetadata("rainbow-six-siege-boost");

export default function EnRainbowSixSiegeBoostPage() {
  return (
    <SiegeBoostingPage
      basePath="/en/rainbow-six-siege-boost"
      defaultLang="en"
    />
  );
}
