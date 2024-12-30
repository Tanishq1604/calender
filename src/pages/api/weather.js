// pages/api/weather.js
export default async function handler(req, res) {
    const { q } = req.query; // Query parameter for location
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${q}&aqi=no`
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  }
  