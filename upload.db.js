// upload.db.js

import mongoose from "mongoose";
import { News } from "./news.model.js";

const uploadNewsData = async (rawNewsData, uri) => {
    try {
        // Connect once (or remove if you keep a global connection)
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const formattedData = rawNewsData.map((item) => {
            // Normalize array fields to strings
            const creator = Array.isArray(item.creator)
                ? item.creator.join(", ")
                : item.creator;
            const source_name = Array.isArray(item.source_name)
                ? item.source_name.join(", ")
                : item.source_name;

            // Ensure keywords is always an array of strings
            const keywords = Array.isArray(item.keywords)
                ? item.keywords
                : item.keywords
                    ? [item.keywords]
                    : [];

            return {
                ...item,
                article_id: item.article_id.toLowerCase(),
                pubDate: new Date(item.pubDate),
                creator,
                source_name,
                keywords,
            };
        });

        const bulkOps = formattedData.map((article) => ({
            updateOne: {
                filter: { article_id: article.article_id },
                update: { $set: article },
                upsert: true,
            },
        }));

        if (bulkOps.length) {
            await News.bulkWrite(bulkOps);
        }

        console.log("✅ News data uploaded successfully!");
    } catch (err) {
        console.error("❌ Error uploading news data:", err);
    }
};

export { uploadNewsData };