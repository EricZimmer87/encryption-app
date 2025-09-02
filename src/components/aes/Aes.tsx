import { useState, useEffect } from "react";

function Aes() {
  const [input, setInput] = useState("Hello World");
  const [cipherKey, setCipherKey] = useState<CryptoKey | null>(null);
  const [output, setOutput] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [keyString, setKeyString] = useState("");
  const [learnMore, setLearnMore] = useState(false);

  // Generate AES key on mount
  useEffect(() => {
    async function getKey() {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"],
      );
      setCipherKey(key);

      // Export key as base64 for display
      const rawKey = await window.crypto.subtle.exportKey("raw", key);
      const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
      setKeyString(base64Key);
    }

    getKey();
  }, []);

  // Automatically encrypt + decrypt when input or key changes
  useEffect(() => {
    if (!cipherKey) return;

    const encryptAndDecrypt = async () => {
      const enc = new TextEncoder();
      const encoded = enc.encode(input);

      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cipherKey,
        encoded,
      );

      const combined = new Uint8Array(iv.length + ciphertext.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(ciphertext), iv.length);

      const base64 = btoa(String.fromCharCode(...combined));
      setOutput(base64);

      // Immediately decrypt it
      const combinedBytes = Uint8Array.from(atob(base64), (c) =>
        c.charCodeAt(0),
      );
      const iv2 = combinedBytes.slice(0, 12);
      const ciphertextBytes = combinedBytes.slice(12);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv2 },
        cipherKey,
        ciphertextBytes,
      );

      const dec = new TextDecoder();
      setDecrypted(dec.decode(decryptedBuffer));
    };

    encryptAndDecrypt();
  }, [input, cipherKey]);

  return (
    <>
      <h1 className="text-center">AES-GCM Encryption</h1>

      {/* Learn more toggle */}
      {!learnMore ? (
        <button
          className="btn btn-link mb-3"
          onClick={() => setLearnMore(true)}
        >
          Click here to learn more about AES.
        </button>
      ) : (
        <button className="btn btn-link" onClick={() => setLearnMore(false)}>
          Close learn more
        </button>
      )}

      {/* Learn More Info */}
      {learnMore && (
        <>
          <div className="border p-1 mb-5">
            <p>
              <strong>AES (Advanced Encryption Standard)</strong> is a widely
              used method for securing digital information. It was created by
              the{" "}
              <strong>
                National Institute of Standards and Technology (NIST)
              </strong>{" "}
              in <strong>2001</strong> and is trusted all over the world, from
              banking apps to Wi-Fi security.
            </p>

            <p>You can choose how strong the lock is by using a longer key:</p>
            <ul>
              <li>
                <strong>128-bit key</strong> (strong)
              </li>
              <li>
                <strong>192-bit key</strong> (stronger)
              </li>
              <li>
                <strong>256-bit key</strong> (strongest)
              </li>
            </ul>

            <p>
              AES is a <strong>block cipher</strong>, meaning it works on{" "}
              <strong>fixed-size chunks</strong> of data (blocks). Each block is{" "}
              <strong>128 bits</strong>, no matter how big or small the overall
              message is.
            </p>

            <ol>
              <li>
                AES takes your message and{" "}
                <strong>breaks it into blocks</strong> of{" "}
                <strong>128 bits</strong>.
              </li>
              <li>
                Each block is <strong>scrambled</strong> using a secret key.
              </li>
              <li>
                You need the <strong>same key</strong> to unlock (decrypt) the
                message.
              </li>
            </ol>

            <p>
              AES is used in many everyday technologies that require strong
              security:
            </p>
            <ul>
              <li>
                <strong>Wi-Fi encryption</strong> (e.g., WPA2)
              </li>
              <li>
                <strong>Database protection</strong>
              </li>
              <li>
                <strong>Secure messaging & communications</strong>
              </li>
              <li>
                <strong>Encrypting files or disks</strong>
              </li>
              <li>
                <strong>Storing passwords securely</strong>
              </li>
              <li>
                <strong>Virtual Private Networks (VPNs)</strong>
              </li>
              <li>
                <strong>Cloud storage</strong>
              </li>
            </ul>
            <button
              className="btn btn-link"
              onClick={() => setLearnMore(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* Explanation */}
      <div className="mb-4">
        <p>
          This demo uses the <strong>Web Crypto API</strong> built into your
          browser to securely encrypt and decrypt messages using the{" "}
          <strong>AES-GCM</strong> encryption algorithm.
          <br />
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto"
            style={{ cursor: "pointer" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Web API | SubtleCrypto
          </a>
        </p>

        <p>
          <strong>AES</strong> stands for Advanced Encryption Standard. It's one
          of the most widely used symmetric encryption algorithms, meaning the
          same key is used to both encrypt and decrypt data.
        </p>

        <p>
          <strong>GCM</strong> stands for Galois/Counter Mode. It not only
          encrypts the data but also includes authentication to ensure that the
          ciphertext hasn’t been tampered with. This makes it more secure than
          older modes like CBC.
        </p>

        <p>
          In this example, we generate a <strong>256-bit AES key</strong> (32
          bytes) when the component loads. Then, each time you type in the input
          box, the following happens:
        </p>

        <ul>
          <li>Your message is converted to bytes using UTF-8 encoding.</li>
          <li>
            A new random <strong>IV (Initialization Vector)</strong> is
            generated for each encryption. This makes sure even the same message
            encrypts differently every time.
          </li>
          <li>
            The message is encrypted using <code>AES-GCM</code> with the key and
            IV.
          </li>
          <li>
            The IV is combined with the ciphertext and base64 encoded for
            display.
          </li>
          <li>
            Immediately after encryption, we extract the IV and ciphertext, then
            decrypt it using the same key to show the original message again.
          </li>
        </ul>

        <p>
          This approach demonstrates how real-world encryption works for things
          like secure messaging, file encryption, and HTTPS traffic.
        </p>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label>
          Plaintext{" "}
          <small className="form-text text-muted">
            This will be encrypted automatically.
          </small>
        </label>

        <textarea
          className="form-control"
          value={input}
          rows={5}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message here"
        />
      </div>

      {/* AES Key */}
      <div className="mb-3">
        <label>Generated AES Key</label>
        <p className="border p-2" style={{ wordBreak: "break-all" }}>
          {keyString || "Generating..."}
        </p>
      </div>

      {/* Ciphertext */}
      <div className="mb-3">
        <label>Ciphertext (Base64)</label>
        <p className="border p-2" style={{ wordBreak: "break-all" }}>
          {output || "Enter plaintext..."}
        </p>
      </div>

      {/* Decrypted Output */}
      <div className="mb-3">
        <label>Decrypted</label>
        <p className="border p-2">
          {decrypted || (
            <em className="text-muted">Waiting for valid input...</em>
          )}
        </p>
      </div>
    </>
  );
}

export default Aes;
