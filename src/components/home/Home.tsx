import { Link } from "react-router";

function Home() {
  return (
    <>
      <h1 className="text-center">🔒 Encryptions 🔑</h1>
      <p className="p-1">
        Welcome to this website. It contains different encryption algorithms for
        you to enter text then convert the text to ciphertext using different
        encryption techniques. It is meant to be educational and contains
        additional information about each encryption method.
      </p>
      <p className="p-1">Click an encryption to get started.</p>
      <ul>
        <li>
          <Link to="/caesar-cipher">Caesar Cipher</Link>
        </li>
        <li>
          <Link to="/rsa">RSA</Link>
        </li>
        <li>
          <Link to="/aes">AES</Link>
        </li>
      </ul>

      <br />
      <p>Click here to view the source code:</p>
      <a href="https://github.com/EricZimmer87/encryption-app">
        https://github.com/EricZimmer87/encryption-app
      </a>
    </>
  );
}

export default Home;
