const ZWSP_CHAR = "\u200b";

function delimiterSplit(input: string): string[] {
  return input.split(ZWSP_CHAR);
}

function createReplacer(value: string) {
  const slices = delimiterSplit(value);
  const items = [];
  for (const slice of slices) {
    for (const segmentation of segment(slice)) {
      items.push(segmentation.segment);
    }
  }
  return joinToString(items);
}

export function processText(input: string) {
  const khmerRegex = /[\u1780-\u17ff]+/gm;
  let result: RegExpExecArray | null;

  const matches = [];
  while ((result = khmerRegex.exec(input))) {
    if (!result) continue;
    matches.push({
      index: result.index,
      value: result[0],
    });
  }

  let text = input;
  let offset = 0;

  for (const match of matches) {
    const start = match.index - offset;
    const end = match.value.length + start;
    const replacer = createReplacer(match.value);
    text = text.slice(0, start) + replacer + text.slice(end, text.length);
    offset += match.value.length - replacer.length;
  }

  return text;
}

export function split(input: string): string[] {
  return processText(input).split(/[\u200b\s]/);
}

function segment(input: string) {
  const segmenter = new Intl.Segmenter("km", { granularity: "word" });
  const segments = segmenter.segment(input);
  return Array.from(segments);
}

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
