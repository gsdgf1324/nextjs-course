import fs from "fs";
import path from "path";

export function getData() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

// api 주소 : localhost:3000/api/feedback 으로 접근
function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newData = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };

    const data = getData();
    data.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success", feedback: newData });
  } else {
    const data = getData();
    res.status(200).json({ feedback: data });
  }
}

export default handler;
