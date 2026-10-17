import Cs2BoostingPage from "../../components/Cs2BoostingPage";
import { gameMetadata } from "../../lib/game-metadata";

export const metadata = gameMetadata("counter-strike-2-boost");

export default function EnglishCs2BoostPage() {
  return <Cs2BoostingPage basePath="/en/counter-strike-2-boost" />;
}
