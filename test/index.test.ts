import { describe, expect, it } from "vitest";

import { formatThrift } from "thrift-format-ts";

describe("should", () => {
  it("format", () => {
    const content = `include "a.thrift"`;
    const fmtContent = formatThrift(content);

    expect(fmtContent).toMatchInlineSnapshot(`
      "include \\"a.thrift\\"
      "
    `);
  });
});
