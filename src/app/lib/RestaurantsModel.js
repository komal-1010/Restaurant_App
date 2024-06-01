const mongoose = require("mongoose");

const RestaurantsModelSchema = new mongoose.Schema({
    restaurantName: String,
    cityName:String,
    address:String,
    contact:Number,
    email:String,
    password:String,
    confirmPass:String
});

const RestaurantsModel = mongoose.models.restaurants || mongoose.model('restaurants', RestaurantsModelSchema);

module.exports = RestaurantsModel;
