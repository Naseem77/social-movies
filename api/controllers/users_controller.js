const UserModel = require("../models/user_model");
const FormatUtils = require("../utils/format_utils");
const Joi = require("joi");

exports.getUserProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!userId || userId.length < 1) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "invalid userId",
					},
				],
			});
		}
		let user = await (
			await UserModel.findById(userId).populate([
				"followersList",
				"followingList",
				"reviews",
			])
		).populate("reviews.movieId");
		if (!user) {
			return res.status(404).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "could not find user with this id",
					},
				],
			});
		}
		user = JSON.parse(JSON.stringify(user));
		user.followersList = user.followersList.map((user) =>
			FormatUtils.formatUser(user)
		);
		user.followingList = user.followingList.map((user) =>
			FormatUtils.formatUser(user)
		);
		user.reviews = user.reviews.map((review) => {
			review.userId = user;
			return FormatUtils.formatReview(review);
		});
		user = FormatUtils.formatUser(user, true, true);
		res.status(200).json({ success: true, data: user });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

const searchValidationObject = {
	query: Joi.string().max(60).required(),
};

function validateSearch(query) {
	const schema = Joi.object(searchValidationObject);
	return schema.validate(query, { abortEarly: false, allowUnknown: true });
}

exports.searchUsers = async (req, res) => {
	try {
		const { query } = req.query;
		const { error, value } = validateSearch(req.query);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const newQuery = new RegExp(`${query}`, "i");

		const users = await UserModel.find({
			$or: [
				{ firstName: { $regex: newQuery } },
				{ lastName: { $regex: newQuery } },
			],
		});
		const formattedResults = users.map(FormatUtils.formatUser);
		res.status(200).json({
			success: true,
			data: formattedResults,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getUserRelationships = async (req, res) => {
	try {
		const userId = req.params.id;
		if (!userId || userId.length < 1) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "invalid userId",
					},
				],
			});
		}
		let userRelationships = await UserModel.findById(userId, {
			followersList: 1,
			followingList: 1,
		}).populate(["followersList", "followingList"]);

		userRelationships = JSON.parse(JSON.stringify(userRelationships));

		userRelationships.followersList = userRelationships.followersList.map(
			(user) => FormatUtils.formatUser(user)
		);
		userRelationships.followingList = userRelationships.followingList.map(
			(user) => FormatUtils.formatUser(user)
		);
		delete userRelationships._id;
		res.status(200).json({ success: true, data: userRelationships });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.followUser = async (req, res) => {
	try {
		const wannaFollowId = req.params.id;
		const activeUserId = req.userData.id;
		if (!wannaFollowId || wannaFollowId.length < 1) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "invalid userId",
					},
				],
			});
		}

		if (wannaFollowId == activeUserId) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "You cant follow yourself:)",
					},
				],
			});
		}

		if (
			await UserModel.find({
				_id: activeUserId,
				followingList: wannaFollowId,
			}).count()
		) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "you already follow this user!",
					},
				],
			});
		}

		await UserModel.updateOne(
			{ _id: wannaFollowId },
			{ $push: { followersList: activeUserId } }
		);
		await UserModel.updateOne(
			{ _id: activeUserId },
			{ $push: { followingList: wannaFollowId } }
		);
		let wannaFollowUser = await UserModel.findOne({ _id: wannaFollowId });
		wannaFollowUser = FormatUtils.formatUser(wannaFollowUser, true, true);
		res.status(200).json({ success: true, data: wannaFollowUser });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.unFollowUser = async (req, res) => {
	try {
		const followedUserId = req.params.id;
		const activeUserId = req.userData.id;
		if (!followedUserId || followedUserId.length < 1) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "invalid userId",
					},
				],
			});
		}

		if (followedUserId == activeUserId) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "You cant unfollow yourself:)",
					},
				],
			});
		}

		if (
			(await UserModel.findOne({
				_id: activeUserId,
				followingList: followedUserId,
			}).count()) == 0
		) {
			return res.status(400).json({
				success: false,
				errors: [
					{
						field: "userId",
						message: "you don't even follow this user!",
					},
				],
			});
		}
		let wasFollowedUser = await UserModel.findOne({ _id: followedUserId });
		wasFollowedUser = FormatUtils.formatUser(wasFollowedUser, true, true);
		await UserModel.updateOne(
			{ _id: followedUserId },
			{ $pull: { followersList: activeUserId } }
		).populate("userId");

		await UserModel.updateOne(
			{ _id: activeUserId },
			{ $pull: { followingList: followedUserId } }
		);
		res.status(200).json({ success: true, data: wasFollowedUser });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};
