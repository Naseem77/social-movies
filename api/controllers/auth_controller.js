const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user_model");
const FormatUtils = require("../utils/format_utils");

const loginValidationObject = {
	email: Joi.string().email().required().label("email"),
	password: Joi.string().required().min(6).label("password"),
};

function validateLogin(data) {
	const schema = Joi.object(loginValidationObject);
	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

function validateRegister(data) {
	const schema = Joi.object({
		...loginValidationObject,
		firstName: Joi.string().min(2).required().label("firstName"),
		lastName: Joi.string().min(2).required().label("lastName"),
	});
	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

function generateAccessToken(user) {
	return jwt.sign(user, process.env.SOCIAL_MOVIES_JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: "10m",
	});
}

function generateRefreshToken(user) {
	return jwt.sign(user, process.env.SOCIAL_MOVIES_JWT_REFRESH_SECRET, {
		algorithm: "HS256",
	});
}

async function generateTokens(user) {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	await UserModel.updateOne({ _id: user.id }, { refreshToken });
	return {
		accessToken,
		refreshToken,
	};
}

function saveTokensInCookies(res, tokens) {
	const farFuture = 24 * 60 * 60 * 365 * 10; // ~10y
	const cookieSettings = {
		httpOnly: true,
		sameSite: "lax",
		maxAge: farFuture,
	};
	res.cookie("accessToken", tokens.accessToken, cookieSettings);
	res.cookie("refreshToken", tokens.refreshToken, cookieSettings);
}

function deleteTokensFromCookies(res) {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
}

exports.register = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { error, value } = validateRegister(req.body);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const usersWithThisEmail = await UserModel.count({ email });
		if (usersWithThisEmail > 0) {
			return res.status(409).json({
				success: false,
				errors: [{ field: "email", message: "email already in use" }],
			});
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = new UserModel({
			...req.body,
			password: hashedPassword,
		});
		await user.save();
		const formattedUser = FormatUtils.formatUser(user);
		const tokens = await generateTokens(formattedUser);
		saveTokensInCookies(res, tokens);
		res.status(201).json({
			success: true,
			data: {
				user: formattedUser,
				...tokens,
			},
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { error, value } = validateLogin(req.body);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				errors: [
					{
						field: "email",
						message: "could not find a user with this email",
					},
				],
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(401).json({
				success: false,
				errors: [{ field: "password", message: "incorrect password" }],
			});
		}
		const formattedUser = FormatUtils.formatUser(user);
		const tokens = await generateTokens(formattedUser);
		saveTokensInCookies(res, tokens);
		res.status(200).json({
			success: true,
			data: {
				user: formattedUser,
				...tokens,
			},
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		const userData = jwt.verify(
			refreshToken,
			process.env.SOCIAL_MOVIES_JWT_REFRESH_SECRET,
			{ alg: "HS256" }
		);
		const user = await UserModel.findById(userData.id);
		if (user.refreshToken !== refreshToken) {
			return res
				.status(401)
				.json({ success: false, message: "invalid refreshToken" });
		}
		const formattedUser = FormatUtils.formatUser(user);
		const accessToken = generateAccessToken(formattedUser);
		const tokens = {
			accessToken,
			refreshToken,
		};
		saveTokensInCookies(res, tokens);
		res.status(200).json({ success: true, data: { accessToken } });
	} catch (e) {
		if (e.name === "JsonWebTokenError") {
			return res
				.status(401)
				.json({ success: false, message: "invalid refreshToken" });
		}
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.logout = async (req, res) => {
	try {
		const { id } = req.userData;
		await UserModel.updateOne({ _id: id }, { refreshToken: "" });
		deleteTokensFromCookies(res);
		res.status(200).json({
			success: true,
			message: "logged out successfully",
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getUserData = async (req, res) => {
	try {
		res.status(200).json({ success: true, data: req.userData });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};
