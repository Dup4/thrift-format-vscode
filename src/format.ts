import { IOptions } from "./types";

export function formatThrift(
  content: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: IOptions,
): [string, boolean] {
  return [content, true];
}
