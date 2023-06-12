const signinDAO = require("../../dao/faculty/signin.dao");
const jwt = require("jsonwebtoken");

class signinController {
	static async apiSignIn(req, res) {
		try {
			const faculty = await signinDAO.SignIn(req);
			
			if (faculty) {
				const token = jwt.sign(
					{
						faculty_id: req.body.id,
					},
					"secret123"
				);

				return res.json({ status: "ok", user: token });
			} else {
				return res.json({ status: "error", user: false });
			}
		} catch (error) {
			console.error(`apiSignIn Faculty, ${error}`);
			return res.json({ status: error });
		}
	}
}

module.exports = signinController;
