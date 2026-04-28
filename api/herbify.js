export default async function handler(req, res) {
  try {
    const response = await fetch("https://herbify.live", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let html = await response.text();

    // Try to remove iframe blockers (may or may not exist)
    html = html.replace(/X-Frame-Options.*?\n/gi, "");
    html = html.replace(/Content-Security-Policy.*?\n/gi, "");

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);

  } catch (err) {
    res.status(500).send("Proxy error");
  }
}
