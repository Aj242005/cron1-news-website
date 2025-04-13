// fetchingNews.js
import "dotenv/config";
import fetch from "node-fetch"; // or use global fetch in Node 18+


const TOPICS = [
    "semiconductor",
];

// join with OR, then URL‑encode the entire string
const rawQuery = TOPICS.map((t) => `"${t}"`).join(" OR ");
const encodedQuery = encodeURIComponent(rawQuery);

const BASE_URL = "https://newsdata.io/api/1/news";

export const newsFetching = async () => {
    try {
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_IO_API}&q=semiconductors%20OR%20nanotechnology%20OR%20physics%20OR%20chemistry%20OR%20silicon&language=en&category=science `;
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
