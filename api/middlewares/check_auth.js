const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
	try {
		let accessToken = req.headers.authorization?.split(" ")[1];
		if (!accessToken) {
			accessToken = req.cookies.accessToken;
		}

		const userData = jwt.verify(
			accessToken,
			process.env.SOCIAL_MOVIES_JWT_SECRET,
			{
				alg: "HS256",
			}
		);
		delete userData.iat;
		delete userData.exp;
		req.userData = userData;
		next();
	} catch (e) {
		return res.status(401).json({
			success: false,
			message: "unathorized request",
		});
	}
}

module.exports = checkAuth;
