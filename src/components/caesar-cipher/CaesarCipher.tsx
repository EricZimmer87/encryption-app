import { useState, useMemo } from "react";
import caesarImg from "../../assets/caesar-cipher.png";

function CaesarCipher() {
  const [input, setInput] = useState("Hello World");
  const [cipherKey, setCipherKey] = useState(0);
  const [learnMore, setLearnMore] = useState(false);
  const [encryptMode, setEncryptMode] = useState(true);

  // Updates plaintext/ciphertext as the user types
  const output = useMemo(() => {
    const k = ((cipherKey % 26) + 26) % 26;
    return encryptMode ? shiftText(input, k) : shiftText(input, -k);
  }, [input, cipherKey, encryptMode]);

  // Shift the letters in the text by given amount. Can be used to shift right (encrypt)
  // or shift left (decrypt).
  function shiftText(text: string, shift: number): string {
    return text
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const base = "A".charCodeAt(0);
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + shift + 26) % 26) + base,
          );
        } else if (char >= "a" && char <= "z") {
          const base = "a".charCodeAt(0);
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + shift + 26) % 26) + base,
          );
        } else {
          return char;
        }
      })
      .join("");
  }

  return (
    <>
      <h1 className="text-center">Caesar Cipher</h1>

      {/* Learn more toggle */}
      {!learnMore ? (
        <button className="btn btn-link" onClick={() => setLearnMore(true)}>
          Click here to learn more about Caesar Cipher.
        </button>
      ) : (
        <button className="btn btn-link" onClick={() => setLearnMore(false)}>
          Close learn more
        </button>
      )}

      {/* Learn More Info */}
      {learnMore && (
        <div className="border mb-5">
          <p className="p-1">
            <strong>Caesar Cipher</strong> is one of the oldest and simplest
            encryption techniques. It is a type of <em>substitution cipher</em>{" "}
            in which each letter in the plaintext is shifted a fixed number of
            positions down the alphabet. For example, with a shift of 3,{" "}
            <code>A</code> becomes <code>D</code>, <code>B</code> becomes{" "}
            <code>E</code>, and so on.
          </p>

          <img
            src={caesarImg}
            alt="Caesar Cipher shift illustration"
            height="200"
            style={{ display: "block", marginBottom: "1rem" }}
          />

          <p className="p-1">
            The cipher is named after <strong>Julius Caesar</strong>, who used
            it to protect military messages. However, because there are only 25
            possible shifts (excluding the trivial shift of 0), it is extremely
            easy to break. An attacker could simply try all possible shifts (a
            method known as a <em>brute-force attack</em>) and see which one
            produces readable text.
          </p>

          <p className="p-1">
            Despite its simplicity and lack of real security, Caesar Cipher
            remains a great starting point for learning about cryptography and
            how encryption transforms information.
          </p>

          <button className="btn btn-link" onClick={() => setLearnMore(false)}>
            Close
          </button>
        </div>
      )}

      {/* User Instructions */}
      <p className="mb-3">
        Select to either encrypt or decrypt a message. The ciphertext (encrypt)
        or plaintext (decrypt) will be updated automatically as text is inputted
        or the cipher key is changed. The cipher key determines how many
        positions to shift the letters of the alphabet.
      </p>

      {/* Encrypt/Decrypt Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item cursor-pointer">
          <button
            className={`nav-link ${encryptMode ? "active" : ""}`}
            onClick={() => {
              if (!encryptMode) {
                setEncryptMode(true);
                setInput(output);
              }
            }}
            aria-current="page"
          >
            Encrypt
          </button>
        </li>
        <li className="nav-item cursor-pointer">
          <button
            className={`nav-link ${encryptMode ? "" : "active"}`}
            onClick={() => {
              if (encryptMode) {
                setEncryptMode(false);
                setInput(output);
              }
            }}
            aria-current="page"
          >
            Decrypt
          </button>
        </li>
      </ul>

      {/* Encrypt/Decrypt Form */}
      <div>
        {/* Input */}
        <div className="mb-3">
          <label htmlFor="input" className="form-label">
            {encryptMode ? "Plaintext" : "Ciphertext"}
          </label>
          <textarea
            className="form-control"
            id="input"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Cipher Key */}
        <div className="mb-3">
          <label className="form-label" htmlFor="cipher-key">
            Cipher Key: <strong>{cipherKey}</strong>
          </label>

          <input
            type="range"
            min={0}
            max={25}
            step={1}
            defaultValue={0}
            className="form-range"
            id="cipher-key"
            onChange={(e) => {
              const value = Number(e.target.value);
              setCipherKey(((value % 26) + 26) % 26); // Stays between 0–25
            }}
          />
        </div>

        {/* Output */}
        <div className="mb-3">
          <label htmlFor="output" className="form-label">
            {encryptMode ? "Ciphertext" : "Plaintext"}
          </label>
          <textarea
            className="form-control bg-light"
            id="output"
            rows={5}
            value={output}
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default CaesarCipher;
