import { defaultPasswordOptions } from "./types/password-options.js";

export default function extractOptions(args: any[]) {
  const extractedOpsObj = [...args].find((o) => typeof o === "object");
  const extractedOpsNum = [...args].find((o) => typeof o === "number");

  if (!extractedOpsObj && (!extractedOpsNum || extractedOpsNum === 0)) {
    return defaultPasswordOptions;
  }

  const extractedOptions = Object.assign(
    {},
    defaultPasswordOptions,
    extractedOpsObj || {},
    {
      length:
        extractedOpsObj?.length ??
        extractedOpsNum ??
        defaultPasswordOptions.length,
    }
  );

  return extractedOptions;
}
