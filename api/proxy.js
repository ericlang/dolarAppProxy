export default async function handler(req, res) {
  try {
    const apiUrl = "https://api.dolarapp.com/v1/tickers?currencies=ARS";

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      }
    });

    const text = await response.text();

    // si devuelve HTML => está bloqueado (solo por seguridad)
    if (text.startsWith("<")) {
      return res.status(500).send({ error: "Blocked by DolarApp" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
