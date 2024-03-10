export function stringParser(size: number, sentence: string) {
  if (!sentence) {
    return;
  }
  if (sentence.length < size) {
    return sentence;
  } else {
    return sentence.slice(0, size) + "...";
  }
}
