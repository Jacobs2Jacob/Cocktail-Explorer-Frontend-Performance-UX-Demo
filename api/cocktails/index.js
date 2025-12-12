const https = require("https");
const agent = new https.Agent({ keepAlive: true });

module.exports = async function (context, req) {
    const path = context.bindingData.proxy || "";
    const apiKey = process.env.API_KEY;
    const url = new URL(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey}/${path}`
    );

    for (const [k, v] of Object.entries(req.query || {})) {
        url.searchParams.append(k, v);
    }

    try {
        const response = await fetch(url, { agent });
        const data = await response.json();

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: data
        };
    } catch (err) {
        context.res = { status: 500, body: { error: err.message } };
    }
};