import { BrowserRouter, Routes, Route } from "react-router-dom";

import Discover from "./pages/Discover";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        {/*}
        <Route path="/" element={<Dashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/responsible-gaming"
          element={<ResponsibleGaming />}
        />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;