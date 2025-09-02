import { useState } from "react";
import {
  generateKeys,
  generateRandomPrime,
  encryptString,
  decryptToString,
} from "./rsa.ts";

function Rsa() {
  const [input, setInput] = useState("Hello World");
  const [learnMore, setLearnMore] = useState(false);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [output, setOutput] = useState<string>("");
  const [p, setP] = useState<bigint | null>(null);
  const [q, setQ] = useState<bigint | null>(null);
  const [n, setN] = useState<bigint | null>(null);
  const [phi, setPhi] = useState<bigint | null>(null);
  const [e, setE] = useState<bigint | null>(null);
  const [d, setD] = useState<bigint | null>(null);

  // Generates random prime numbers
  function generatePrimeNumbers() {
    setP(generateRandomPrime());
    setQ(generateRandomPrime());

    // Reset keys if primes change
    setN(null);
    setPhi(null);
    setE(null);
    setD(null);
  }

  // Generates keys and automatically encrypts/decrypts
  function handleGenerateKeys() {
    if (!p || !q || p === 0n || q === 0n) {
      alert("Please generate prime numbers first!");
      return;
    }
    const { n, phi, e, d } = generateKeys(12, p, q);
    setN(n);
    setPhi(phi);
    setE(e);
    setD(d);

    // Automatically encrypt/decrypt after generating keys
    if (mode === "encrypt") {
      const encryptedData = encryptString(input, e, n);
      setOutput(encryptedData.join(" "));
    } else {
      const encryptedNumbers = input
        .trim()
        .split(/\s+/)
        .map((num) => BigInt(num));

      const decryptedText = decryptToString(encryptedNumbers, d, n);
      setOutput(decryptedText);
    }
  }

  // Encrypts plaintext into ciphertext
  function handleEncrypt() {
    if (!e || !n) {
      alert("Generate keys first!");
      return;
    }
    const result = encryptString(input, e, n);
    setOutput(result.join(" "));
    setMode("encrypt");
  }

  // Decrypts ciphertext into plaintext
  function handleDecrypt() {
    if (!d || !n) {
      alert("Generate keys first!");
      return;
    }

    try {
      const encryptedNumbers = input
        .trim()
        .split(/\s+/)
        .map((num) => BigInt(num));
      const result = decryptToString(encryptedNumbers, d, n);
      setOutput(result);
      setMode("decrypt");
    } catch {
      setOutput("Invalid input for decryption.");
    }
  }

  // Toggles encrypt/decrypt modes
  function toggleMode(newMode: "encrypt" | "decrypt") {
    setMode((prev) => {
      if (prev !== newMode) {
        setInput(output);
        setOutput(input);
      }
      return newMode;
    });
  }

  return (
    <>
      <h1 className="text-center">RSA (Rivest Shamir Adleman)</h1>

      {/* Learn more toggle */}
      {!learnMore ? (
        <button className="btn btn-link" onClick={() => setLearnMore(true)}>
          Click here to learn more about RSA.
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
            <strong>RSA</strong> is a foundational encryption algorithm widely
            used in modern computing for secure data transmission. Unlike Caesar
            Cipher, which uses simple letter shifts, RSA is a form of{" "}
            <em>asymmetric encryption</em>, meaning it uses a{" "}
            <strong>public key</strong> to encrypt and a separate{" "}
            <strong>private key</strong> to decrypt.
          </p>

          <p className="p-1">
            The algorithm is named after its inventors, <strong>Rivest</strong>,{" "}
            <strong>Shamir</strong>, and <strong>Adleman</strong>, who
            introduced it in 1977. Its security relies on the mathematical
            difficulty of <em>factoring large prime numbers</em>. The public key
            is derived from multiplying two large primes, and without knowing
            them, it's nearly impossible to reverse the encryption.
          </p>

          <p className="p-1">
            RSA plays a critical role in protecting data on the internet. It’s
            used in HTTPS, email encryption, digital signatures, and more. While
            it’s more complex and slower than symmetric algorithms like AES, its
            ability to establish secure communication between strangers makes it
            invaluable.
          </p>

          <p className="p-1">
            To understand how RSA works in practice, imagine Bob wants to send a
            secret message to Alice. Alice first generates a pair of keys: a{" "}
            <strong>public key</strong> (which includes the values{" "}
            <code>e</code> and <code>n</code>) and a{" "}
            <strong>private key</strong> (which includes <code>d</code> and{" "}
            <code>n</code>). She shares the public key with Bob but keeps the
            private key secret. When Bob writes his message, he uses Alice’s
            public key to encrypt it. Once encrypted, the message looks like
            random numbers and can safely travel over the internet. When Alice
            receives it, she uses her private key to decrypt the message and
            recover the original text. The critical point is that only Alice’s
            private key can unlock the message encrypted with her public key,
            ensuring that even if others see the ciphertext, they cannot read
            it.
          </p>

          <button className="btn btn-link" onClick={() => setLearnMore(false)}>
            Close
          </button>
        </div>
      )}

      {/* User Instructions */}
      <p className="mb-3">
        This page is designed to be educational, guiding you step by step
        through the RSA encryption process. You'll start by generating two
        random prime numbers, then use those to create a public and private key
        pair. Once the keys are generated, you can encrypt a plaintext message
        or decrypt a ciphertext. When keys are generated, the input will
        automatically be processed based on the selected mode (encrypt or
        decrypt).
      </p>

      {/* Generate Two Prime Numbers */}
      <div className="mb-3">
        <h3>1. Generate Two Prime Numbers</h3>
        <p>
          The first step in the RSA algorithm is to generate two large, prime
          numbers. These two prime numbers will be used in key generation. These
          prime numbers will be <code>p</code> and <code>q</code>.
        </p>
        <p>Click the button below to generate these prime numbers.</p>
        <code style={{ color: "black" }}>
          <p>
            <strong>p:</strong> {p?.toString()}
          </p>
          <p>
            <strong>q: </strong>
            {q?.toString()}
          </p>
        </code>
        <button className="btn btn-primary" onClick={generatePrimeNumbers}>
          Generate Prime Numbers
        </button>
      </div>

      {/* Key Generation */}
      <div className="mb-3">
        <h3>2. Key Generation</h3>
        <p>
          Now that we have the two prime numbers, we can use them to generate
          the keys. First, we multiply them to get <code>n</code>, which will be
          part of both the public and private keys. Then we calculate{" "}
          <code>φ(n)</code>, which is used to find two numbers: <code>e</code>{" "}
          (the public exponent) and <code>d</code> (the private exponent). These
          values form the key pair used for encryption and decryption.
        </p>
        <div className="border p-3 my-3">
          <code style={{ color: "black" }}>
            <p>
              <strong>p:</strong> {p && p.toString()}
            </p>
            <p>
              <strong>q:</strong> {q && q.toString()}
            </p>
            <p>
              <strong>n (modulus):</strong> {n && n.toString()}
            </p>
            <p>
              <strong>φ(n):</strong> {phi && phi.toString()}
            </p>
            <p>
              <strong>Public Exponent (e):</strong> {e && e.toString()}
            </p>
            <p>
              <strong>Private Exponent (d):</strong> {d && d.toString()}
            </p>
            <p>
              <strong>Public Key:</strong>{" "}
              {e && n && `(${e.toString()}, ${n.toString()})`}
            </p>
            <p>
              <strong>Private Key:</strong>{" "}
              {d && n && `(${d.toString()}, ${n.toString()})`}
            </p>
          </code>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleGenerateKeys}
          disabled={!p || !q}
        >
          Generate Keys
        </button>
      </div>

      {/* Encrypt & Decrypt */}
      <div className="mb-3">
        <h3>3. Encrypt & Decrypt</h3>
        <p className="p-1">
          The final step is to encrypt or decrypt the message by applying
          modular exponentiation using the appropriate key. To encrypt, raise
          each character's numeric value to the power of <code>e</code> (the
          public exponent) modulo <code>n</code>. To decrypt, raise each
          encrypted number to the power of <code>d</code> (the private exponent)
          modulo <code>n</code> to recover the original message.
        </p>
        <p className="p-1" style={{ fontStyle: "italic", color: "#888" }}>
          <small>
            Because RSA operates on numbers using modular arithmetic, the
            message must be converted into numeric form before encryption. When
            encrypting plaintext, each character is automatically converted to
            its ASCII value. When decrypting, the ciphertext should be a list of
            space-separated numbers, which will be converted back to characters
            after decryption.
          </small>
        </p>

        {/* Input Field */}
        <div className="mb-3">
          <label>
            <strong>{mode === "encrypt" ? "Plaintext:" : "Ciphertext:"}</strong>
          </label>
          <input
            className="form-control"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message here"
          />
        </div>

        {/* Transformation Indicator */}
        {p && q && n && e && d && (
          <>
            <div className="my-3">
              <p style={{ fontStyle: "italic", color: "#888" }}>
                Fancy math happening...
              </p>
            </div>
          </>
        )}

        {/* Output Field */}
        <div className="mb-3">
          <label>
            <strong>
              {mode === "encrypt" ? "Encrypted Output:" : "Decrypted Output:"}
            </strong>
          </label>
          <p className="border p-2">
            {output || "Enter message and click a button."}
          </p>
        </div>

        {/* Encrypt/Decrypt Buttons */}
        <button
          className="btn btn-primary m-3"
          onClick={() => {
            toggleMode("encrypt");
            handleEncrypt();
          }}
          disabled={!input || !e || !n}
        >
          Encrypt
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            toggleMode("decrypt");
            handleDecrypt();
          }}
          disabled={!input || !d || !n}
        >
          Decrypt
        </button>
      </div>
    </>
  );
}

export default Rsa;
