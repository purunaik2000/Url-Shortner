const urlModel = require('../models/ulrModel');
const shortId = require('shortid');
const axios = require('axios');

exports.genrateShortUrl = async function (req, res) {
    try {
        let originalUrl = req.body.originalUrl;
        if (typeof originalUrl != 'string') return res.status(400).send({ status: false, message: "Please provide valid url." });
        if (!originalUrl || originalUrl.trim() == "") return res.status(400).send({ status: false, mesaage: "Please provide url." });
        originalUrl = originalUrl.trim();
        let isValid;
        await axios.get(originalUrl).then(() => { isValid = true }).catch(() => { isValid = false });
        if (isValid == false) return res.status(400).send({ status: false, message: "Please provide valid url" });
        const data = await urlModel.findOne({ longUrl: originalUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 });
        if (data) return res.status(200).send({ status: true, message: "Url already genrated.", data: data });
        let urlCode = shortId.generate();
        let obj = {
            urlCode: urlCode,
            shortUrl: `http://localhost:3000/${urlCode}`,
            longUrl: originalUrl
        }
        await urlModel.create(obj);
        res.status(201).send({ status: true, message: "Url genrated.", data: obj });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

exports.getUrl = async function (req, res) {
    try {
        const urlCode = req.params.urlCode;
        const originalUrl = await urlModel.findOne({ urlCode: urlCode }).select({ _id: 0, longUrl: 1 });
        if (!originalUrl) return res.status(404).send({ status: false, message: "url not found." });

        res.redirect(302, originalUrl.longUrl);
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
