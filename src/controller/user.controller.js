const express = require("express");
const {body,validationResult} = require("express-validator")
const router = express.Router();

const User = require("../model/user.model")

router.post("/",
    body("id").isLength({ min: 1 }).withMessage("Id should be required"),
    body("first_name").isLength({ min: 1 }),
    body("email").isEmail(),
    body("gender").isLength({ min: 3 }),
    body("age").isLength({min:1}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: errors.array() });
        }
    const user = await User.create(req.body);
        return res.status(201).json({ data: user });
    //res.send("Hello")
});

module.exports = router;