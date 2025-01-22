import { EXPECTED_PASSWORD } from "../ui/PasswordDialog";

export const isPasswordValid = (password: string) =>
  password === EXPECTED_PASSWORD;
