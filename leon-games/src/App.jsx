import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./Pages/Discover";
import Faqs from "./Pages/Faqs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;