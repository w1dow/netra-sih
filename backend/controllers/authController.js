const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const config = require('../config/config');

const login = (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    // const sql = `
    //     SELECT id, employee_id, email, password_hash
    //     FROM employees
    //     WHERE email = ?
    // `;

    // db.query(sql, [email], (err, results) => {
    //     if (err) {
    //         // console.error('Database error:', err);

    //         return res.status(500).json({
    //             success: false,
    //             message: 'Database error'
    //         });
    //     }

    //     if (results.length === 0) {
    //         return res.status(401).json({
    //             success: false,
    //             message: 'Invalid email or password'
    //         });
    //     }

    //     const employee = results[0];

    //     bcrypt.compare(password, employee.password_hash, (err, match) => {
    //         if (err) {
    //             // console.error('Password comparison error:', err);

    //             return res.status(500).json({
    //                 success: false,
    //                 message: 'Server error'
    //             });
    //         }

    //         if (!match) {
    //             return res.status(401).json({
    //                 success: false,
    //                 message: 'Invalid email or password'
    //             });
    //         }

    //         const token = jwt.sign(
    //             {
    //                 id: employee.id,
    //                 employee_id: employee.employee_id,
    //                 email: employee.email
    //             },
    //             config.jwtSecret,
    //             {
    //                 expiresIn: '24h'
    //             }
    //         );

    //         return res.status(200).json({
    //             success: true,
    //             message: 'Login successful',
    //             token,
    //             user: {
    //                 id: employee.id,
    //                 employee_id: employee.employee_id,
    //                 email: employee.email
    //             }
    //         });
    //     });
    // });

    // TEST AUTH
    const token = jwt.sign(
        {
            id: 1,
            employee_id: 'TEST20260001',
            email: email
        },
        config.jwtSecret,
        {
            expiresIn: '24h'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Test login successful',
        token,
        user: {
            id: 1,
            employee_id: 'TEST20260001',
            email: email
        }
    });
};


module.exports = {
    login
};