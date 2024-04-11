import process from "process";
import { createHmac, randomBytes } from "crypto";

export function random() {
  return randomBytes(128).toString("base64");
}

export function createHash(data: string, salt: string) {
  return createHmac("sha256", process.env.SECRET!)
    .update(data + salt)
    .digest("hex");
}
