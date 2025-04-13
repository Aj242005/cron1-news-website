// upload.db.js

import mongoose from "mongoose";
import { News } from "./news.model.js";

const uploadNewsData = async (rawNewsData, uri) => {
    try {
        // Connect to MongoDB (update URI accordingly)
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Optional: transform/clean data before saving
        const formattedData = rawNewsData.map((item) => ({
            ...item,
            article_id: item.article_id.toLowerCase(),
            pubDate: new Date(item.pubDate),
        }));

        // Use bulkWrite for better performance (insert multiple documents at once)
        const bulkOps = formattedData.map((article) => ({
            updateOne: {
                filter: { article_id: article.article_id },
                update: { $set: article },
                upsert: true, // Insert if the document doesn't exist
            },
        }));

        // Execute the bulk write operation
        if (bulkOps.length > 0) {
            await News.bulkWrite(bulkOps);
        }

        console.log("✅ News data uploaded successfully!");
    } catch (err) {
        console.error("❌ Error uploading news data:", err);
    }
};

export { uploadNewsData };
