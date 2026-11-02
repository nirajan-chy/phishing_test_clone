const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/training", (request, response) => {
  const { submitted } = request.body || {};

  if (typeof submitted !== "boolean") {
    return response.status(400).json({
      success: false,
      message: "The training event must include a boolean submitted value."
    });
  }

  return response.json({
    success: true,
    message: submitted
      ? "Training event received. No credentials were collected."
      : "Training event received."
  });
});

app.listen(port, () => {
  console.log(`FakeBook educational demo running at http://localhost:${port}`);
});
