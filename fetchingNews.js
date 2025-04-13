// fetchingNews.js

import "dotenv/config";
const url = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_IO_API}&q="semiconductor"OR"band%20theory"OR"physics"OR"chemistry"OR"nanotechnology"OR"crystal%20structure"&language=en&category=technology `;

const newsFetching = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error("Error fetching news:", err);
        return [];
    } finally {
        console.log("Fetching completed.");
    }
};

export { newsFetching };
