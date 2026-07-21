import mongoose from "mongoose";

const connectDB=async () => {
    await mongoose.connect("mongodb+srv://neerajbaba870_db_user:eCgf6IysSky2Vaol@cluster0.klnpwe4.mongodb.net/?appName=Cluster0");
}

export {connectDB};