"use strict";

let C 				= require("../core/constants");

let _ 				= require("lodash");
let crypto 			= require("crypto");
let bcrypt 			= require("bcrypt-nodejs");

let mongoose 		= require("../core/mongoose");
let Schema 			= mongoose.Schema;

let schemaOptions = {
	timestamps: true,
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

let validateLocalStrategyProperty = function(property) {
	return (this.provider !== "local" && !this.updated) || property.length;
};

let validateLocalStrategyPassword = function(password) {
	return this.provider !== "local" || (password && password.length >= 6);
};

let UserSchema = new Schema({
	fullName: {
		type: String,
		trim: true,
		"default": "",
		validate: [validateLocalStrategyProperty, "Please fill in your full name"]
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		"default": "",
		validate: [validateLocalStrategyProperty, "Please fill in your email"],
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	username: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
		required: "Please fill in a username",
		trim: true,
		match: [/^[\w][\w\-\._\@]*[\w]$/, "Please fill a valid username"]
	},
	password: {
		type: String,
		"default": "",
		validate: [validateLocalStrategyPassword, "Password should be longer"]
	},
	passwordLess: {
		type: Boolean,
		default: false
	},
	passwordLessToken: {
		type: String
	},
	provider: {
		type: String,
		"default": "local"
	},
	profile: {
		name: { type: String },
		gender: { type: String },
		picture: { type: String },
		location: { type: String }
	},
	socialLinks: {
		facebook: { type: String, unique: true, sparse: true },
		twitter: { type: String, unique: true, sparse: true },
		google: { type: String, unique: true, sparse: true },
		github: { type: String, unique: true, sparse: true }
	},
	roles: {
		type: [
			{
				type: String,
				"enum": [
					C.ROLE_ADMIN,
					C.ROLE_USER,
					C.ROLE_GUEST
				]
			}
		],
		"default": [C.ROLE_USER]
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,

	verified: {
		type: Boolean,
		default: false
	},

	verifyToken: {
		type: String
	},

	apiKey: {
		type: String,
		unique: true,
		index: true,
		sparse: true
	},

	lastLogin: {
		type: Date
	},

	locale: {
		type: String
	},

	status: {
		type: Number,
		default: 1
	},

	metadata: {}

}, schemaOptions);

/*
 * Password hashing
 */
UserSchema.pre("save", function(next) {
	let user = this;
	if (!user.isModified("password"))
		return next();

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});

/**
 * Password compare
 */
UserSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		cb(err, isMatch);
	});
};

/**
 * Virtual field for `avatar`.
 */
UserSchema.virtual("avatar").get(function() {
	// Load picture from profile
	if (this.profile && this.profile.picture)
		return this.profile.picture;

	// Generate a gravatar picture
	if (!this.email)
		return "https://gravatar.com/avatar/?s=64&d=wavatar";

	let md5 = crypto.createHash("md5").update(this.email).digest("hex");
	return "https://gravatar.com/avatar/" + md5 + "?s=64&d=wavatar";
});

let User = mongoose.model("User", UserSchema);

module.exports = User;