import { randomInt } from "node:crypto";

import validateArguments from "./error.js";
import { validePasswordLength } from "./error.js";

export const excludeVowels = Symbol("excludeVowels");
export const excludeConsonants = Symbol("excludeConsonants");
export const excludeUpperCase = Symbol("excludeUpperCase");
export const excludeLowerCase = Symbol("excludeLowerCase");

export const excludeNumbers = Symbol("excludeNumbers");
export const excludeSpecials = Symbol("excludeSpecials");
export const excludeDuplicates = Symbol("excludeDuplicates");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const VOWELS = "aeiouAEIOU";
const CONSONANTS = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
const NUMBERS = "0123456789";
const SPECIALS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

export default function passmaker(...args) {
  const numberArgs = [...args].filter((a) => typeof a === "number");
  const symbolsArgs = [...new Set(args.filter((a) => typeof a === "symbol"))];

  let password;
  let passwordLength = 8;
  let passwordArgs = [];
  let shouldExcludeDuplicates = symbolsArgs.includes(excludeDuplicates);

  passwordLength =
    Number.isInteger(numberArgs[0]) &&
    Number.isFinite(numberArgs[0]) &&
    numberArgs[0] >= 1
      ? numberArgs[0]
      : passwordLength;

  console.log(passwordLength);

  validateArguments(args, numberArgs, symbolsArgs, passwordLength);

  let charPool = [
    symbolsArgs.includes(excludeVowels) ? [] : [...VOWELS],
    symbolsArgs.includes(excludeConsonants) ? [] : [...CONSONANTS],
    symbolsArgs.includes(excludeNumbers) ? [] : [...NUMBERS],
    symbolsArgs.includes(excludeSpecials) ? [] : [...SPECIALS],
  ]
    .flat()
    .filter(
      (c) =>
        !(
          symbolsArgs.includes(excludeUpperCase) &&
          new Set(ALPHABET.toUpperCase()).has(c)
        )
    )
    .filter(
      (c) =>
        !(
          symbolsArgs.includes(excludeLowerCase) &&
          new Set(ALPHABET.toLowerCase()).has(c)
        )
    );

  if (shouldExcludeDuplicates)
    validePasswordLength(passwordLength, charPool.length);

  password = [...Array(passwordLength)]
    .map(() => {
      let character = charPool[randomInt(0, charPool.length)];
      const index = charPool.indexOf(character);

      if (shouldExcludeDuplicates) {
        if (index !== -1) charPool.splice(index, 1);
      }

      return character;
    })
    .join("");

  return password;
}
