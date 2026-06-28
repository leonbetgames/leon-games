import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./Pages/Discover";
import Faqs from "./Pages/Faqs";
import Terms_Conditions from "./Pages/Terms_Conditions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/terms-conditions" element={<Terms_Conditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;