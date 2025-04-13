// upload.db.js

import mongoose from "mongoose";
import { News } from "./news.model.js";

const uploadNewsData = async (rawNewsData, uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const formattedData = rawNewsData.map((item) => ({
            ...item,
            // ensure we only pass strings/arrays and let the schema setter do the rest
            creator: item.creator,
            source_name: item.source_name,
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            article_id: item.article_id.toLowerCase(),
            pubDate: new Date(item.pubDate),
        }));

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
