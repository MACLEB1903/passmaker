import extractOptions from "./extract-options.js";
import validateOptions from "./validate-options.js";
import generatePassword from "./generate-password.js";

const passmaker = function (...args: any[]) {
  const extractedOptions = extractOptions(args);
  const validatedOptions = validateOptions(extractedOptions);
  return generatePassword(validatedOptions);
};

export default passmaker;
// @ts-ignore
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  // @ts-ignore
  module.exports = passmaker;
}
