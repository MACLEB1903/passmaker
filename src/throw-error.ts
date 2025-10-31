export default function throwError(
  errors: string[],
  suggestedOptions: string[]
) {
  throw new Error(`\n\n${errors
    .map((e, i) => `${i + 1}) ${e}`)
    .join("\n")}\n\nDid you mean: passmaker({${suggestedOptions.join(", ")}})?
    `);
}
