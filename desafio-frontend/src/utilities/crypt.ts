import bcrypt from "bcryptjs";

// TODO: Apply that
const cryptPassword = (password: string): string => {
  const SALT_ROUNDS = 10;
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const comparePassword = (hash: string, password: string): boolean => {
  return bcrypt.compareSync(password, hash);
}

export {
  cryptPassword,
  comparePassword,
}