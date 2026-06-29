import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./Pages/Discover";
import Faqs from "./Pages/Faqs";
import Terms_Conditions from "./Pages/Terms_Conditions";
import PrivacyPolicy from "./Pages/Privacy_Policy";
import ResponsibleGaming from "./Pages/Responsive_gaming";
import SupportPage from "./Pages/Support";
import LeonDashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/terms" element={<Terms_Conditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/dashboard" element={<LeonDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;