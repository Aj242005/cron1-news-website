// fetchingNews.js
import "dotenv/config";
import fetch from "node-fetch"; // or use global fetch in Node 18+

const API_KEY = process.env.NEWS_DATA_IO_API;
const TOPICS = [
    "semiconductor",
    "band theory",
    "physics",
    "chemistry",
    "nanotechnology",
    "crystal structure",
];

// join with OR, then URL‑encode the entire string
const rawQuery = TOPICS.map((t) => `"${t}"`).join(" OR ");
const encodedQuery = encodeURIComponent(rawQuery);

const BASE_URL = "https://newsdata.io/api/1/news";

export const newsFetching = async () => {
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&q=${encodedQuery}&language=en&category=technology`;
        console.log("Fetching from URL:", url);

        const res = await fetch(url);
        const data = await res.json();
        console.log("API returned totalResults:", data.totalResults);
        return data.results || [];
    } catch (err) {
        console.error("Error fetching news:", err);
        return [];
    }
};
