const axios = require('axios');

const nhlData = async (req, res) => {

    try {
        const response = await axios.get('https://fixturedownload.com/feed/json/nhl-2023');
        const data = response.data;
        res.json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      };
};

module.exports = nhlData;