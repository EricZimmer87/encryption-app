# Encryptions Demo App

A lightweight, educational React application that demonstrates three classical and modern encryption algorithms:

- **Caesar Cipher**
- **RSA (Rivest–Shamir–Adleman)**
- **AES-GCM (Advanced Encryption Standard – Galois/Counter Mode)**

Built with **React**, **TypeScript**, and **Vite**, this app shows how encryption works under the hood using real browser APIs and custom logic.

---

## Live Demo

[https://ejzimmer.com/encryptions](https://ejzimmer.com/encryptions)

---

## Screenshots

### Home

![Home Screenshot](screenshots/home.png)

### Caesar Cipher

![Caesar Cipher Screenshot](screenshots/caesar-cipher.png)

### AES

![AES Screenshot](screenshots/aes.png)

### RSA

![RSA Screenshot](screenshots/rsa.png)

---

## Features

### Caesar Cipher

- Classical substitution cipher
- Shifts letters by a fixed amount
- Easily cracked by brute force (25 shifts)

### AES-GCM Encryption

- Uses Web Crypto API
- Symmetric encryption (same key for encryption & decryption)
- 256-bit AES key with unique IV on every message
- Output shown in Base64

### RSA Encryption

- Asymmetric encryption (public key & private key)
- Keypair generation
- Basic encryption & decryption of small messages

---

## Tech Stack

- React (with TypeScript)
- Vite
- Bootstrap (for styling)
- Web Crypto API (`window.crypto.subtle`) for AES

---

## Project Structure

```text
src/
├── components/
│   ├── caeser-cipher
│       └── CaeserCipher.tsx
│   ├── aes
│       └── Aes.tsx
│   └── rsa
│       └── Rsa.tsx
│   └── home
│       └── Home.tsx
│   └── footer
│       └── Footer.tsx
│   └── navbar
│       └── Navbar.tsx
├── App.tsx
├── App.css
├── Routes.tsx
├── main.tsx
├── vite.config.ts
└── index.html
```

## How to Run Locally

1. Clone the repo:

```text
git clone https://github.com/EricZimmer87/encryption-app.git
cd encryption-app
```

2. Install Dependencies:

```text
npm install
```

3. Run the App:

```text
npm run dev
```

4. Build for Production:

```text
npm run build
```

## Author

Eric Zimmer [https://www.ejzimmer.com](https://www.ejzimmer.com)
