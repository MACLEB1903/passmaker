let hasInvalidType = false;
let hasDuplicateNumberArg = false;
let hasAllGroupsExcluded = false;

let errorList = [];
let suggestedArgs = [];

export default function validateArguments(
  args = params,
  numberArgs,
  symbolArgs,
  passwordLength
) {
  validateTypes(...args);
  validateUniqueArgs(numberArgs);
  validateCharacterGroups(symbolArgs);

  suggestedArgs = [
    numberArgs.filter(
      (n) => Number.isInteger(n) && Number.isFinite(n) && n >= 1
    )[0],
    hasAllGroupsExcluded ? [] : [...symbolArgs].map((s) => s.description),
  ]
    .flat()
    .filter(Boolean);

  const hasErrors =
    hasInvalidType || hasDuplicateNumberArg || hasAllGroupsExcluded;

  if (hasErrors) {
    throw new Error(
      [
        "\n",
        ...errorList.map((m, i) => `${i + 1}) ${m}`),
        `\nDid you mean: passmaker(${suggestedArgs.join(", ")})?\n`,
      ].join("\n")
    );
  }

  if (passwordLength > 1000) {
    throw new Error("Password length exceeded allowed limit of 1,000.");
  }
}

function validateTypes(...args) {
  const VALID_TYPES = ["number", "symbol"];
  const invalidArgs = args.filter((arg) => !VALID_TYPES.includes(typeof arg));

  if (invalidArgs.length > 0) {
    hasInvalidType = true;
    errorList.push(
      `The following argument${
        invalidArgs.length > 1 ? "s are" : " is"
      } not accepted: ${invalidArgs.map((p) => String(p)).join(", ")}.`
    );
  }
}

function validateUniqueArgs(arg) {
  const argType = typeof arg[0];
  if (arg.length > 1) {
    if (argType === "number") hasDuplicateNumberArg = true;

    errorList.push(
      `Only one argument with type '${argType}' is allowed but found (${arg.join(
        ", "
      )}).`
    );
  }
}

function validateCharacterGroups(args) {
  const expected1 = new Set([
    "excludeVowels",
    "excludeConsonants",
    "excludeNumbers",
    "excludeSpecials",
  ]);

  const expected2 = new Set([
    "excludeLowerCase",
    "excludeUpperCase",
    "excludeNumbers",
    "excludeSpecials",
  ]);

  const present = new Set(args.map((s) => s.description));

  if (
    [...expected1].every(
      (s) => present.has(s) || [...expected2].every((s) => present.has(s))
    )
  ) {
    hasAllGroupsExcluded = true;
    errorList.push(
      "Cannot generate a password because all character groups (vowels, consonants, numbers, and specials) are excluded."
    );
  }
}

export function validePasswordLength(passwordLength, charPoolLength) {
  suggestedArgs = suggestedArgs.map((a) =>
    typeof a === "number" ? charPoolLength : a
  );
  if (passwordLength > charPoolLength) {
    throw new Error(
      ` \n\nThe length you specified exceeds the number of unique characters available.
     \nDid you mean: passmaker(${suggestedArgs.join(", ")})?,\n`
    );
  }
}
