import { pino } from "pino";

export function createLogger(name: string) {
  return pino({
    name,
  });
}
