const con = require("../model/dbconnection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { userid, username, password } = req.body;
        const query = "SELECT * FROM tbl_admin_user_registration WHERE userid = $1";
        const result = await con.query(query, [userid]);

        if (result.rows && result.rows.length > 0) {
            return res.status(400).json({ message: "User ID already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const insertQuery = "INSERT INTO tbl_admin_user_registration (userid, username, password) VALUES ($1, $2, $3)";
        const insertValues = [userid, username, hashpassword];
        const insertResult = await con.query(insertQuery, insertValues);
        return res.status(201).json({ message: "User registered successfully", response: insertResult });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { userid, password } = req.body;
        const query = "SELECT * FROM tbl_admin_user_registration WHERE userid = $1";
        const result = await con.query(query, [userid]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid userid or password." });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid userid or password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ userid: user.userid }, 'your_jwt_secret_key', { expiresIn: '1m' });

        // Return the token and user details (excluding sensitive information)
        return res.status(200).json({ message: "Login successful", token, user: { userid: user.userid, username: user.username } });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { signup,login };
