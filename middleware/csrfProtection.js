const jwt = require("jsonwebtoken");

const get_cs_token = (req, res, next) => {
    try {
        const token = jwt.sign({ id: req.user.id }, process.env.CSRF_SECRET, {
            expiresIn: "5m",
        });

        res.set({
            "Access-Control-Expose-Headers": "_token",
            _token: token,
        });

        res.json({
            msg: "Get tk success.",
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const verify_cs_token = (req, res, next) => {
    const {_token }= req.body;
	
    if (!_token) return res.status(400).json({ msg: "Token not found." });

    try {
        jwt.verify(_token, process.env.CSRF_SECRET, (err, data) => {
            if (err) return res.status(400).json({ msg: "Token not valid." });

            if (req.user.id == data.id) {
                next();
            }
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = { verify_cs_token, get_cs_token };