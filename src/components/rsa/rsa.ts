/*
This file contains helper functions for the RSA encryption technique.
*/

export function power(base: bigint, expo: bigint, m: bigint): bigint {
  let res = 1n;
  base %= m;
  while (expo > 0n) {
    if (expo % 2n === 1n) {
      res = (res * base) % m;
    }
    base = (base * base) % m;
    expo /= 2n;
  }
  return res;
}

export function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function modInverse(e: bigint, phi: bigint): bigint {
  let [a, b, u] = [0n, phi, 1n];
  while (e > 0n) {
    const q = b / e;
    [a, b, e, u] = [u, e, b - q * e, a - q * u];
  }
  return (a + phi) % phi;
}

export function isProbablePrime(n: bigint, k = 5): boolean {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  for (let i = 0; i < k; i++) {
    const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));
    if (gcd(a, n) !== 1n) return false;
    if (power(a, n - 1n, n) !== 1n) return false;
  }

  return true;
}

export function generateRandomPrime(bits = 12): bigint {
  const min = 1n << BigInt(bits - 1);
  const max = (1n << BigInt(bits)) - 1n;

  while (true) {
    const candidate =
      min + BigInt(Math.floor(Math.random() * Number(max - min)));
    if (isProbablePrime(candidate)) return candidate;
  }
}

export function generateKeys(
  bits = 12,
  overrideP?: bigint,
  overrideQ?: bigint,
) {
  const p = overrideP ?? generateRandomPrime(bits);
  const q = overrideQ ?? generateRandomPrime(bits);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  let e = 3n;
  while (gcd(e, phi) !== 1n) {
    e += 2n;
  }

  const d = modInverse(e, phi);
  return { p, q, n, phi, e, d };
}

export function encryptString(text: string, e: bigint, n: bigint): bigint[] {
  return [...text].map((char) => encrypt(BigInt(char.charCodeAt(0)), e, n));
}

export function decryptToString(
  encrypted: bigint[],
  d: bigint,
  n: bigint,
): string {
  return encrypted
    .map((c) => String.fromCharCode(Number(decrypt(c, d, n))))
    .join("");
}

export function encrypt(m: bigint, e: bigint, n: bigint): bigint {
  return power(m, e, n);
}

export function decrypt(c: bigint, d: bigint, n: bigint): bigint {
  return power(c, d, n);
}
