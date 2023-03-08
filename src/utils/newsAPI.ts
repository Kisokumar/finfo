import Parser from "rss-parser";

const parser = new Parser();

const HEADLINES_RSS = "https://news.google.com/news/rss";
const TOPICS_RSS = "https://news.google.com/news/rss/headlines/section/topic/";
const GEO_RSS = "https://news.google.com/news/rss/headlines/section/geo/";
const SEARCH_RSS = "https://news.google.com/rss/search?q=";

const TOPICS = [
  "WORLD",
  "NATION",
  "BUSINESS",
  "TECHNOLOGY",
  "ENTERTAINMENT",
  "SPORTS",
  "SCIENCE",
  "HEALTH",
];

const fillCountryLangParams = (country: string, language: string): string =>
  `hl=${country}&gl=${language}&ceid=${country}%3A${language}`;

const getRss = async (url: string) => await parser.parseURL(url);

type NewsType = "headlines" | "topic" | "geo" | "search";

interface NewsSearchParams {
  country?: string;
  language?: string;
  n?: number;
}
export const search = async (
  query: string,
  { country = "us", language = "en", n = 10 }: NewsSearchParams = {}
) => {
  const url =
    SEARCH_RSS +
    encodeURIComponent(query) +
    "&" +
    fillCountryLangParams(country.toUpperCase(), language.toLowerCase());
  console.log(url);
  return (await getRss(url)).items.slice(0, Math.max(0, n));
};

const news = async (
  type: NewsType,
  param1?: string | NewsSearchParams,
  param2?: NewsSearchParams
) => {
  const {
    country = "us",
    language = "en",
    n = 10,
  } = typeof param1 === "object" ? param1 : param2 || {};
  let url;
  switch (type) {
    case "headlines":
      url =
        HEADLINES_RSS +
        "?" +
        fillCountryLangParams(country.toUpperCase(), language.toLowerCase());
      break;
    case "topic":
      const topicName = typeof param1 === "string" ? param1.toUpperCase() : "";
      if (!TOPICS.includes(topicName)) {
        throw new Error(
          "Invalid topic name. See list of topics for valid names."
        );
      }
      url =
        TOPICS_RSS +
        topicName +
        "?" +
        fillCountryLangParams(country.toUpperCase(), language.toLowerCase());
      break;
    case "geo":
      const position =
        typeof param1 === "string" ? encodeURIComponent(param1) : "";
      url =
        GEO_RSS +
        position +
        "?" +
        fillCountryLangParams(country.toUpperCase(), language.toLowerCase());
      break;
    case "search":
      const query =
        typeof param1 === "string" ? encodeURIComponent(param1) : "";
      url =
        SEARCH_RSS +
        query +
        "&" +
        fillCountryLangParams(country.toUpperCase(), language.toLowerCase());
      break;
    default:
      throw new Error(
        'Invalid news type. Must be "headlines", "topic", "geo", or "search".'
      );
  }
  return (await getRss(url)).items.slice(0, Math.max(0, n));
};

export { news };
