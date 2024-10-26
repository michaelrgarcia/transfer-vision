/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
