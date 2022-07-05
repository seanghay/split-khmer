import { describe, it, expect } from "vitest";
import { joinToString, split } from "../dist";
import { normalize, sanitize } from "../src";

describe("segment", () => {

  it('should ignore unknown chars', () => {
    expect(split('ខ្មែរខ្មែរ ABC ខ្មែរ')).toEqual(['ខ្មែរ', 'ខ្មែរ ABC ខ្មែរ'])
  });
  
  it("should remove all zwsp from a string", () => {
    expect(sanitize(`A\u200bB`)).toBe(`AB`);
    expect(sanitize(`A\u200b\u200bB\u200b`)).toBe(`AB`);
    expect(sanitize(`A\u200b\u200bB\u200b`)).toBe(`AB`);
  });

  it("should normalize zero-width space", () => {
    expect(normalize("A\u200b\u200bB\u200b")).toBe("A\u200bB");
    expect(normalize("\u200b\u200bA\u200b\u200bB\u200b")).toBe("A\u200bB");
    expect(normalize("\u200bA\u200b\u200bB\u200b")).toBe("A\u200bB");
    expect(normalize("AB")).toBe("AB");
  });

  it("should join to string", () => {
    expect(joinToString(["A", "B"])).toBe("A\u200bB");
    expect(joinToString(["A"])).toBe("A");
  });

});
