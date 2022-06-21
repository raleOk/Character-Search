import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import CharacterProfile from "./pages/Character/CharacterProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/character/:characterId" element={<CharacterProfile />} />
    </Routes>
  );
};

export default App;
