export default function extractName(input: string): string {
  const regex = /^.+ \((.+)\)$/;
  const match = input.match(regex);
  return match ? match[1] : input;
}
