// news.model.js

import mongoose from "mongoose";
const { Schema } = mongoose;

const newsSchema = new Schema(
    {
        article_id: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        keywords: [
            {
                type: String,
            },
        ],
        creator: {
            type: String,
            required: true,
            // If the API gives you ['Reuters'], this setter will turn it into 'Reuters'
            set: (v) => (Array.isArray(v) ? v.join(", ") : v),
        },
        description: {
            type: String,
            required: true,
        },
        pubDate: {
            type: Date,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        source_name: {
            type: String,
            required: true,
            // Same setter here
            set: (v) => (Array.isArray(v) ? v.join(", ") : v),
        },
    },
    { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
