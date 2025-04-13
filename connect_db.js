import mongoose from "mongoose";
import { News } from "./news.model.js";


const connectionWithDatabase = async(uri) => {
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log(`${connectionInstance}`);
    } catch (err) {
        console.log(`error : ${err}`);
    }
}

export { connectionWithDatabase };