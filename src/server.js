// Step 1
require("dotenv").config();
const app = require("./app.js");
const { connectDB } = require("./config/db.js");

const PORT = process.env.PORT || 5000;

async function startServer() {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB(process.env.MONGODB_URI);
  });
}

startServer();