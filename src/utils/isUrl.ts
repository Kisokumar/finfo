export default function isUrl(str: string) {
  // Regular expression to match URLs
  const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

  // Test the input string against the regex and return the result
  return urlRegex.test(str);
}
