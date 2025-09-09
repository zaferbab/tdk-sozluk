export default async function handler(req, res) {
  const kelime = req.query.kelime;
  const url = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(kelime)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "TDK'ya bağlanılamadı" });
  }
}
