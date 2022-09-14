import { getData } from "./feedback";

function handler(req, res) {
  const fId = req.query.feedbackId;
  const feedbackData = getData();
  const selected = feedbackData.find((item) => item.id === fId);

  res.status(200).json({ feedback: selected });
}

export default handler;
