export default function extractArticleInfo(articleString: string): string[] {
  const articleParts = articleString.split("-").map((part) => part.trim());
  return articleParts;
}
