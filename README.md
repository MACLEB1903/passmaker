# Passmaker

Cryptographically secure password generator built on the Crypto API.

## Installation

```bash
  npm i @passmaker/passmaker
```

## Usage

### passmaker()

Generate a random secure password with the default settings (includes all character groups).

```javascript
import passmaker from "@passmaker/passmaker";

console.log(passmaker());

// Example output:
// %7FdAa:6
```

### passmaker(length, arguments)

Generate a password with a custom length and optional exclusion rules to control which character groups are used.

```javascript
import passmaker, { excludeNumbers } from "@passmaker/passmaker";

console.log(passmaker(12, excludeNumbers));

// Example output:
// ud^%^l@%N_r@
```

```javascript
import passmaker, {
  excludeNumbers,
  excludeSpecials,
  excludeVowels,
} from "@passmaker/passmaker";

console.log(passmaker(16, excludeVowels, excludeNumbers, excludeSpecials));

// Example output:
// nXBTnMqcLkXvzPNC
```

## Optionl options

| Name              |   Type   | Description                                              | Default Value |
| ----------------- | :------: | -------------------------------------------------------- | :-----------: |
| length            | `number` | Length of the password to generate.                      |       8       |
| excludeVowels     | `symbol` | Excludes all vowels (`AEIOUaeiou`) when provided.        |       —       |
| excludeConsonants | `symbol` | Excludes all consonant characters when provided.         |       —       |
| excludeUpperCase  | `symbol` | Excludes all uppercase letters (`A–Z`) when provided.    |       —       |
| excludeLowerCase  | `symbol` | Excludes all lowercase letters (`a–z`) when provided.    |       —       |
| excludeNumbers    | `symbol` | Excludes all numeric characters (`0–9`) when provided.   |       —       |
| excludeSpecials   | `symbol` | Excludes all special characters within the ASCII set.    |       —       |
| excludeDuplicates | `symbol` | Prevents duplicate characters in the generated password. |       —       |
