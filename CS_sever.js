const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json()); // 解析 JSON 請求

const userData = {
  "12345": { status: "ok", value: 42 },
  "67890": { status: "error", value: 0 }
};

app.post("/api/cs2", (req, res) => {
  const data = req.body;
  console.log("🎮 GSI 資料接收：", data);

  // 可存在變數、DB、暫存等處理
  res.sendStatus(200); // 必須回傳 200 告訴 CS2 "我有收到"
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  const data = userData[id] || { error: "Not found" };
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("伺服器已上線！");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
