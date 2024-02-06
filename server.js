require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAIApi = require("openai");

const app = express();
const { OPENAI_API_KEY, PORT } = process.env;

const openai = new OpenAIApi({
    api_key: OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("/public"));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/create", async (req, res) => {
    console.log("prompt", req.body.text);
    const prompt = req.body.text;
    try {
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: "512x512",
        });

        res.send(response.data);
    } catch (err) {
        console.log("err", err.message);
        res.send(err.message);
    }
});
