import Localized from "../components/Localization";
import AuthScreen from "../components/AuthScreen";

export default function SignupPage() {
  return <Localized><AuthScreen mode="signup" /></Localized>;
}