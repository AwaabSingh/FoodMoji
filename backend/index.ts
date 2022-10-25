import connectDB from "./config/db";
import { app } from "./services/app";

const PORT: string | undefined = process.env.PORT;

const startServer = () => {
  connectDB();
  app.listen(PORT, () => console.log("Server running on port", PORT, "💥💥💥"));
};

startServer();
