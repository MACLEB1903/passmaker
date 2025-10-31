// @ts-ignore
import { randomInt } from "node:crypto";

import {
  PasswordOptions,
  defaultPasswordOptions,
} from "./types/password-options.js";

const VOWELS = "aeiouAEIOU";
const CONSONANTS = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
const NUMBERS = "0123456789";
const SPECIALS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

import throwError from "./throw-error.js";

export default function generatePassword(filteredOptions: PasswordOptions) {
  const validatedOptions = Object.assign(
    {},
    defaultPasswordOptions,
    filteredOptions
  );

  const {
    length,
    count,

    useVowels,
    useConsonants,
    useLowerCase,
    useUpperCase,
    useNumbers,
    useSpecials,

    useJSON,
    useDuplicates,
  } = validatedOptions;

  if (
    !useVowels &&
    !useConsonants &&
    !useLowerCase &&
    !useUpperCase &&
    !useNumbers &&
    !useSpecials
  ) {
    const charGroupKeys = [
      "useVowels",
      "useConsonants",
      "useLowerCase",
      "useUpperCase",
      "useNumbers",
      "useSpecials",
    ];
    throwError(
      [
        "Cannot generate a password because all character groups (vowels, consonants, numbers, and specials) are excluded.",
      ],
      Object.entries(filteredOptions).map(
        ([key, value]) =>
          `${key}: ${charGroupKeys.includes(key) ? true : value}`
      )
    );
  }

  const generateSinglePassword = () => {
    let password;

    let charPool = [
      useVowels ? [...VOWELS] : [],
      useConsonants ? [...CONSONANTS] : [],
      useNumbers ? [...NUMBERS] : [],
      useSpecials ? [...SPECIALS] : [],
    ]
      .flat()
      .filter((c) => useLowerCase || !/[a-z]/.test(c))
      .filter((c) => useUpperCase || !/[A-Z]/.test(c));

    if (!useDuplicates && charPool.length < Number(length)) {
      throwError(
        [
          "Cannot generate a password because all character groups (vowels, consonants, numbers, and specials) are excluded.",
        ],
        Object.entries(
          Object.assign({}, filteredOptions, { length: charPool.length })
        ).map(([key, value]) => `${key}: ${value}`)
      );
    }

    return (password = [...Array(length)]
      .map(() => {
        const character = String(charPool[randomInt(0, charPool.length)]);
        const index = charPool.indexOf(character);

        if (!useDuplicates) {
          if (index !== -1) charPool.splice(index, 1);
        }

        return character;
      })
      .join(""));
  };

  const passwords = [...Array(count)].map(generateSinglePassword);

  if (count === 1 && !useJSON) {
    return passwords[0];
  }

  if (useJSON) return { count: count, passwords: passwords };

  return passwords;
}
