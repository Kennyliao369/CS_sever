const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
// 假設這是你要提供的資料
const userData = {
  "12345": { status: "ok", value: 42 },
  "67890": { status: "error", value: 0 }
};

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  const data = userData[id] || { error: "Not found" };
  res.json(data);
});

app.get('/', (req, res) => {
  res.send('伺服器已上線！');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
