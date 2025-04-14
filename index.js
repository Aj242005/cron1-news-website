// index.js

import "dotenv/config";
import express from "express";
import { newsFetching } from "./fetchingNews.js";
import { News } from "./news.model.js";
import mongoose from "mongoose";
import { uploadNewsData } from "./upload.db.js";
import { connectionWithDatabase } from "./connect_db.js";

// Establish DB connection once at the start
connectionWithDatabase(process.env.MONGO_DB_URI);

const app = express();

// Health check route
app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
    console.log(`App listening at ${process.env.PORT}`);    
    console.log(`Surpassed the safe timeout zone now ready to do the job !!`)
    runCronJob();
    setInterval(runCronJob, 600000); // Run every 50 minutes
});

// Function to fetch news and upload data to DB
async function runCronJob() {
    try {
        const latest = await newsFetching();  // Fetch latest news
        if (latest && latest.length > 0) {
            for (let i = 0; i < 10; i++) {
                const existingArticle = await News.findOne({
                    article_id: latest[i].article_id,
                });
                if (existingArticle) {
                    console.log(`Article ${latest[i].article_id} already exists.`);
                }else if(latest[i]===undefined){
                    break;
                } 
                else {
                    const newsObject = {
                        article_id: latest[i].article_id,
                        title: latest[i].title,
                        link: latest[i].link,
                        keywords: latest[i].keywords,
                        creator: latest[i].creator,
                        description: latest[i].description,
                        pubDate: latest[i].pubDate,
                        image_url: latest[i].image_url,
                        source_name: latest[i].source_name,
                    };

                    await uploadNewsData([newsObject], process.env.MONGO_DB_URI);
                    console.log(`Article ${latest[i].article_id} uploaded.`);
                }
            }
        }
    } catch (err) {
        console.error("Error in cron job:", err);
    }
}
