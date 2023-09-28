"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dishSchema = new mongoose_1.Schema({
    dishName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    timeStamp: { type: Date, default: new Date() }
});
exports.dishModel = mongoose_1.default.model('dishes', dishSchema);
const tmp = [
    {
        "dishName": "Spaghetti",
        "imageUrl": "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600",
        "description": "Delicious spaghetti with tomato sauce",
        "price": 10.99,
        "rating": 4.5
    },
    {
        "dishName": "Paztha",
        "imageUrl": "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
        "description": "Homemade pasta with a creamy sauce",
        "price": 12.99,
        "rating": 4.2
    },
    {
        "dishName": "Pizza",
        "imageUrl": "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?b=1&s=612x612&w=0&k=20&c=ZcLXrogjpyc5froC5ZIP-0uepbhldATwmCbt3mzViGQ=",
        "description": "Classic pepperoni pizza with a thin crust",
        "price": 14.99,
        "rating": 4.7
    },
    {
        "dishName": "Sushi",
        "imageUrl": "https://images.pexels.com/photos/7245465/pexels-photo-7245465.jpeg?auto=compress&cs=tinysrgb&w=600",
        "description": "Fresh and tasty sushi rolls with soy sauce",
        "price": 18.99,
        "rating": 4.8
    },
    {
        "dishName": "Cake",
        "imageUrl": "https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=600",
        "description": "Decadent chocolate cake with a rich ganache",
        "price": 8.99,
        "rating": 4.4
    }
];
