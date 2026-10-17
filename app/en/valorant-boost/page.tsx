import ValorantBoostingPage from "../../components/ValorantBoostingPage";
import { gameMetadata } from "../../lib/game-metadata";

export const metadata = gameMetadata("valorant-boost");

export default function EnValorantBoostPage() {
  return <ValorantBoostingPage basePath="/en/valorant-boost" />;
}
