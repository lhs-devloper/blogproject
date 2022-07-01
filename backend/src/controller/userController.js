import connection from '../db';
import bcrypt from 'bcrypt';

export const getUser = (req, res) => {
    if (req.session.name === undefined) {
        return res.json({ name: '' })
    }
    return res.json({ name: req.session.name })
}

export const getUserInfo = (req, res) => {
    const { id } = req.params;
    // const params = "*";
    const sql = `SELECT * FROM users where id='${id}' LIMIT 1`;
    connection.query(sql, (err, results, field) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(results[0])
        }
    })
}

// Login API and Logout
export const postLogin = async (req, res) => {
    const { login_id, login_password } = req.body;
    const sql = `SELECT id, password FROM users where id='${login_id}'`;
    const secure_id = await bcrypt.hash(login_id, 5);
    try {
        await connection.query(sql, (err, results, field) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results[0])
                const { password } = results[0]
                if (login_password != password) {
                    return res.json({ success: false })
                } else {
                    req.session.name = results[0].id;
                    return res.send({ success: true })
                }
            }
        })
    }
    catch (e) {
        console.log(e)
    }
}
export const Logout = async (req, res) => {
    req.session.destroy()
    return res.redirect("/")
}