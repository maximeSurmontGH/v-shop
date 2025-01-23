import { EXPECTED_PASSWORD } from "../auth/PasswordDialog";

export const isPasswordValid = (password: string) =>
  password === EXPECTED_PASSWORD;
