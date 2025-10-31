export type PasswordOptions = {
  length?: number;
  count?: number;

  useVowels?: boolean;
  useConsonants?: boolean;
  useLowerCase?: boolean;
  useUpperCase?: boolean;
  useNumbers?: boolean;
  useSpecials?: boolean;

  useJSON?: boolean;
  useDuplicates?: boolean;
};

export const passwordOptionTypeMap = {
  length: {
    type: "number",
    value: 12,
  },

  count: {
    type: "number",
    value: 1,
  },

  useVowels: { type: "boolean", value: true },
  useConsonants: { type: "boolean", value: true },
  useLowerCase: { type: "boolean", value: true },
  useUpperCase: { type: "boolean", value: true },
  useNumbers: { type: "boolean", value: true },
  useSpecials: { type: "boolean", value: true },

  useJSON: { type: "boolean", value: false },
  useDuplicates: { type: "boolean", value: false },
};

export const defaultPasswordOptions: PasswordOptions = {
  length: 12,
  count: 1,

  useVowels: true,
  useConsonants: true,
  useLowerCase: true,
  useUpperCase: true,
  useNumbers: true,
  useSpecials: true,

  useJSON: false,
  useDuplicates: true,
};
