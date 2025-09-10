// api/tdk.js

export default async function handler(req, res) {
  const { kelime, tip } = req.query;

  if (!kelime) {
    return res.status(400).json({ error: "Kelime parametresi gerekli." });
  }

  // TDK uç noktasını seç
  let url;
  if (tip === "atasozu") {
    url = `https://sozluk.gov.tr/atasozu?ara=${encodeURIComponent(kelime)}`;
  } else {
    url = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(kelime)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TDK isteği başarısız oldu: ${response.status}`);
    }

    const data = await response.json();

    // CORS başlığı ekle
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    console.error("Proxy hatası:", err);
    res.status(500).json({
      error: "Proxy hatası: TDK sunucusuna ulaşılamadı.",
      detay: err.toString(),
    });
  }
}
