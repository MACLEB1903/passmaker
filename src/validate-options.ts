import {
  PasswordOptions,
  passwordOptionTypeMap,
  defaultPasswordOptions,
} from "./types/password-options.js";

import throwError from "./throw-error.js";

export default function validateOptions(extractedOptions: PasswordOptions) {
  if (extractedOptions === defaultPasswordOptions) return extractedOptions;

  const filteredOptions = Object.fromEntries(
    Object.entries(extractedOptions).filter(([k]) =>
      Object.keys(passwordOptionTypeMap).includes(k)
    )
  );

  const errors: string[] = [];
  let suggestedOptions: any = {};

  for (const [key, value] of Object.entries(filteredOptions)) {
    const { type: expectedType, value: suggestedValue } =
      passwordOptionTypeMap[key as keyof typeof passwordOptionTypeMap];

    const actualType = typeof value;

    if (actualType !== expectedType) {
      errors.push(
        `'${key}' expects '${expectedType}' but got '${actualType}' value of ${
          actualType === "string" && String(value) === ""
            ? "'empty string'"
            : String(value)
        }.`
      );
      suggestedOptions[key] = suggestedValue;
      continue;
    }

    if (expectedType === "number") {
      if (!Number.isFinite(value) || !Number.isInteger(value)) {
        errors.push(`'${key}' expects a proper integer number.`);
        suggestedOptions[key] = suggestedValue;
        continue;
      }

      if (Number(value) > 1000) {
        errors.push(`'${key}' should not be greater than 1000.`);
        suggestedOptions[key] = 1000;
      }

      if (typeof value === "number" && value <= 0) {
        errors.push(`'${key}' expects a number greater than 0.`);
        suggestedOptions[key] = suggestedValue;
      }
    }
  }

  suggestedOptions = Object.entries(
    Object.assign({}, filteredOptions, suggestedOptions)
  ).map(([key, value]) => `${key}: ${value}`);

  if (errors.length) throwError(errors, suggestedOptions);

  return Object.entries(filteredOptions).length === 0
    ? defaultPasswordOptions
    : filteredOptions;
}
