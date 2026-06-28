import { BrowserRouter, Routes, Route } from "react-router-dom";

import Discover from "./pages/Discover";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ResponsibleGaming from "./pages/ResponsibleGaming";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/responsible-gaming"
          element={<ResponsibleGaming />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;