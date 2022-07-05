import MagicString from "magic-string";

const ZWSP_CHAR = "\u200b";

/**
 * Join a string with zero-width space.
 * @param inputs
 * @returns
 */
export function joinToString(inputs: string[]) {
  return inputs.join(ZWSP_CHAR);
}

/**
 * Remove duplicate zero-width space from string
 * @param input
 * @returns
 */
export function normalize(input: string): string {
  if (input === ZWSP_CHAR) return "";
  return input
    .replace(/\u200b+/gm, ZWSP_CHAR)
    .replace(/\u200b+$/gm, "")
    .replace(/^\u200b+/gm, "");
}

/**
 * Remove all zero-width space from a string.
 * @param input input string
 * @returns A string without zero-width space character.
 */
export function sanitize(input: string): string {
  return input.replace(/\u200b*/gm, "");
}


export function tokenize(input: string) {
  const khmerRegex = /[\u1780-\u17ff]+/gm;
  let result: RegExpExecArray | null;
  const entities = [];
  while ((result = khmerRegex.exec(input))) {
    if (!result) continue;
    const value = result[0];
    entities.push({
      start: result.index,
      end: result.index + value.length,
      value,
    });
  }
  return entities;
}

export function split(input: string): string[] {
  const text = sanitize(normalize(input));
  const entities = tokenize(text);
  const str = new MagicString(text);
  const segmenter = new Intl.Segmenter("km", { granularity: "word" });
  for (const entity of entities) {
    const results = Array.from(segmenter.segment(entity.value)).map(
      (it) => it.segment
    );
    const joined = results.join(ZWSP_CHAR);
    str.overwrite(entity.start, entity.end, joined);
  }
  return str.toString().split(ZWSP_CHAR);
}