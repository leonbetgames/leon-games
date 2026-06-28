import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard() {
  return <h1>DASHBOARD</h1>;
}

function Discover() {
  return <h1>DISCOVER</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}