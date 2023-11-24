import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    let response = await axios.get("https://www.boredapi.com/api/activit/");
    if (response.data.error) {
      throw response.data.error;
    }
    res.render("index.ejs", { key: response });
  } catch (error) {
    res.render("index.ejs", { error_message: error });
  }
});

app.post("/", async (req, res) => {
  try {
    let type = req.body.type;
    let participants = req.body.participants;
    const response = await axios.get("https://www.boredapi.com/api/activity" + "?" + "type=" + type + "&participants=" + participants);
    res.render("index.ejs", { key: response });
  } catch (error) {
    res.render("index.ejs", { error_message: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
