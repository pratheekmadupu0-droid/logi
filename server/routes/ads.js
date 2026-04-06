const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ADS_FILE = path.join(__dirname, '../ads.json');

// Helper to read ads
const readAds = () => {
    const data = fs.readFileSync(ADS_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write ads
const writeAds = (ads) => {
    fs.writeFileSync(ADS_FILE, JSON.stringify(ads, null, 2));
};

// GET /api/ads
router.get('/', (req, res) => {
    res.json(readAds());
});

// POST /api/ads
router.post('/', (req, res) => {
    const { url, title } = req.body;
    let ads = readAds();
    ads.push({ id: Date.now(), url, title, active: true });
    writeAds(ads);
    res.json({ message: "Ad added", ads });
});

// DELETE /api/ads/:id
router.delete('/:id', (req, res) => {
    let ads = readAds();
    ads = ads.filter(ad => ad.id !== parseInt(req.params.id));
    writeAds(ads);
    res.json({ message: "Ad removed", ads });
});

module.exports = router;
