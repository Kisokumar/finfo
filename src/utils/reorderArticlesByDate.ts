// type NewsArticle = {
//   title: string;
//   link: string;
//   pubDate: string;
//   content: string;
//   contentSnippet: string;
//   guid: string;
//   isoDate: string;
// };

export default function reorderArticlesByDate(arr: any[]) {
  return arr.sort((a, b) => {
    const dateA = new Date(a.isoDate);
    const dateB = new Date(b.isoDate);
    return dateB.getTime() - dateA.getTime();
  });
}
