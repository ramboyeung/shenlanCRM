const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const options = {};
options.secretOrKey = require("./key").secretOrKey;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
module.exports = passport =>{
	passport.use(new Strategy(options,(jwt_payload,done)=>{
		User.findById(jwt_payload.id)
			.then(user=>user ? done(null,user) : done(null,false))
			.catch(err=>console.log(err));
	}));
}