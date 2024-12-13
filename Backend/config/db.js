import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://kalolani:kalolani7@cluster0.d5oty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
};
