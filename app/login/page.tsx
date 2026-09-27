import Localized from "../components/Localization";
import AuthScreen from "../components/AuthScreen";

export default function LoginPage() {
  return <Localized><AuthScreen mode="login" /></Localized>;
}