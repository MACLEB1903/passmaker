# Passmaker

Cryptographically secure password generator built on the Crypto API.

## Installation

```bash
  npm i @passmaker/passmaker
```

## Imports

```bash
  import passmaker from "@passmaker/passmaker";
```

```bash
  const passmaker = require("@passmaker/passmaker");

```

## Usage

### passmaker()

Generate a random, secure 12-character password that includes all character groups.

```javascript
import passmaker from "@passmaker/passmaker";

passmaker();

// Example output:
// yv9Ik?~F,awB
```

### passmaker(length)

Generate a secure password of your desired length that includes all character groups.

```javascript
import passmaker from "@passmaker/passmaker";

passmaker(15);

// Example output:
// "2u;}>i]Uyt:T3=
```

### passmaker(length, {arguments})

Generate a secure password with custom length, character rules, and output options.

```javascript
import passmaker from "@passmaker/passmaker";

passmaker(15, {
  count: 3,
  useVowels: false,
  useConsonants: false,
  useJSON: true,
});

// Example output:
//  {
//    count: 3,
//    passwords: [ '?=-\\88/*:}8|"0}', '188}~4(!0,//4?)', '07@1>)6;4{~#*=&' ]
//  }
```

### passmaker(length, {length: n})

This scenario would use the object’s length value, as it has higher precedence.

```javascript
import passmaker from "@passmaker/passmaker";

passmaker(15, {
  length: 20,
});

// Example output:
// 'j@|?Cvo'@J&`#A!ur^X
```

## Optionl options

Customize password generation by setting length, character groups, output format, and duplication rules.

| Name              |   Type    | Description                                                            | Default Value |
| ----------------- | :-------: | ---------------------------------------------------------------------- | :-----------: |
| **length**        | `number`  | Defines the number of characters in the generated password.            |     `12`      |
| **count**         | `number`  | Number of passwords to generate in a single call.                      |      `1`      |
| **useVowels**     | `boolean` | Include vowels (`A, E, I, O, U, a, e, i, o, u`) in the character pool. |    `true`     |
| **useConsonants** | `boolean` | Include consonants (all letters except vowels) in the character pool.  |    `true`     |
| **useLowerCase**  | `boolean` | Include lowercase letters (`a–z`) in the character pool.               |    `true`     |
| **useUpperCase**  | `boolean` | Include uppercase letters (`A–Z`) in the character pool.               |    `true`     |
| **useNumbers**    | `boolean` | Include numeric characters (`0–9`) in the character pool.              |    `true`     |
| **useSpecials**   | `boolean` | Include special characters from the ASCII set (e.g., `!@#$%^&*`).      |    `true`     |
| **useJSON**       | `boolean` | Return the result as a JSON object containing count and passwords.     |    `false`    |
| **useDuplicates** | `boolean` | Allow repeating characters within the generated password.              |    `true`     |
