import OverwatchBoostingPage from "../../components/OverwatchBoostingPage";
import { gameMetadata } from "../../lib/game-metadata";

export const metadata = gameMetadata("overwatch-2-boost");

export default function EnOverwatchBoostPage() {
  return <OverwatchBoostingPage basePath="/en/overwatch-2-boost" />;
}
