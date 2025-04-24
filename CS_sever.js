const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json()); // 解析 JSON 請求

// 用來記錄目前資料的 map
const userData = new Map();
const lastSentData = new Map();
const MAX_USERS = 100;

// 接收 CS2 的 POST 資料
app.post("/api/cs2", (req, res) => {
  const data = req.body;
  const steamId = data?.player?.steamid;

  if (!steamId) {
    return res.status(400).json({ error: "Missing steamid" });
  }

  if (!userData.has(steamId) && userData.size >= MAX_USERS) {
    const oldestKey = userData.keys().next().value;
    userData.delete(oldestKey);
    lastSentData.delete(oldestKey);
  }

  userData.set(steamId, data);
  res.sendStatus(200);
});

// 查詢某個玩家資料
app.get("/api/:steamid", (req, res) => {
  const steamId = req.params.steamid;
  const current = userData.get(steamId);
  if (!current) return res.json({ error: "Not found" });

  const lastStr = lastSentData.get(steamId);
  const nowStr = JSON.stringify(current);

  if (nowStr === lastStr) return res.json({}); // 沒變化就傳空

  lastSentData.set(steamId, nowStr);
  res.json(current);
});

app.get("/", (req, res) => {
  res.send("Sever is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});