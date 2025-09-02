import { Route, Routes } from "react-router";
import Home from "./components/home/Home.tsx";
import CaesarCipher from "./components/caesar-cipher/CaesarCipher.tsx";
import Rsa from "./components/rsa/Rsa.tsx";
import Aes from "./components/aes/Aes.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/caesar-cipher" element={<CaesarCipher />} />
      <Route path="/rsa" element={<Rsa />} />
      <Route path="/aes" element={<Aes />} />
    </Routes>
  );
}
