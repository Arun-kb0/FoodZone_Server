"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResuturant = exports.getRecomentedRestaurants = exports.getAllResturants = void 0;
const restaurantModel_1 = require("../models/restaurantModel");
const httpStatus_1 = require("../constants/httpStatus");
const getAllResturants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = yield restaurantModel_1.restaurantModel.countDocuments({});
        const numberOfPages = Math.ceil(total / LIMIT);
        const restaurants = yield restaurantModel_1.restaurantModel.find().sort().limit(LIMIT).skip(startIndex);
        console.log(restaurants.length);
        if (Number(page) > numberOfPages) {
            res.status(httpStatus_1.httpStatus.NO_CONTENT);
            return;
        }
        res.status(httpStatus_1.httpStatus.OK).json({
            message: "getAllRestaurants success",
            currentPage: Number(page),
            numberOfPages,
            restaurants,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(httpStatus_1.httpStatus.BAD_REQUEST).json({ message: "getAllRestaurants faild", error: error.message });
    }
});
exports.getAllResturants = getAllResturants;
const getRecomentedRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getRecomentedRestaurants = getRecomentedRestaurants;
const createResuturant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newRestaurant = new restaurantModel_1.restaurantModel(Object.assign({}, data));
    try {
        const resturant = yield newRestaurant.save();
        res.status(httpStatus_1.httpStatus.OK).json({ message: "postRestaurant success", resturant });
    }
    catch (error) {
        res.status(httpStatus_1.httpStatus.BAD_REQUEST).json({ message: "postRestaurant failed", error });
    }
});
exports.createResuturant = createResuturant;
