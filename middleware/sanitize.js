const sanitize = (req, res, next) => {
    const body = req.body;
    const query = req.query;

    const check = findDolasign(body) || findDolasign(query);
    if (check) return res.status(500).json({ msg: "Not valid input" });

    return next();
};

const findDolasign = (Obj) => {
    for (let key in Obj) {
        if (key.includes("$")) {
            return true;
        }
        if (typeof Obj[key] === "object") return findDolasign(Obj[key]);
    }
    return false;
};
module.exports = sanitize;