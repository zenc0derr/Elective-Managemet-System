const signinDAO = require("../../dao/student/signin.dao");
const jwt = require("jsonwebtoken");

class signinController {
	static async apiSignIn(req, res) {
		try {
			const student = await signinDAO.SignIn(req);
			
			if (student) {
				const token = jwt.sign(
					{
						student_id: req.body.id,
					},
					"secret123"
				);

				return res.json({ status: "ok", user: token });
			} else {
				return res.json({ status: "error", user: false });
			}
		} catch (error) {
			console.error(`apiSignInafsdf, ${error}`);
			return res.json({ status: error });
		}
	}
}

module.exports = signinController;
