const signinDAO = require("../../dao/admin/signin.dao");
const jwt = require("jsonwebtoken");

class signinController {
	static async apiSignIn(req, res) {
		try {
			const admin = await signinDAO.SignIn(req);
			if (admin) {

				return res.json({ status: "ok", user: true });
			} else {
				return res.json({ status: "error", user: false });
			}
		} catch (error) {
			console.error(`apiSignIn, ${error}`);
			return res.json({ status: error });
		}
	}

	static async apiOtp(req, res){
		try {
			const admin = await signinDAO.Otp(req);
			if(admin){
				const token = jwt.sign(
					{
						admin_id: req.body.id,
					},
					"secret123"
				);
				return res.json({ status: "ok", user: token });
			}else{
				return res.json({ status: "error", user: false });
			}
		} catch (e) {
			
		}
	}
}

module.exports = signinController;
