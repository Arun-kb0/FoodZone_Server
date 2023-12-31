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
exports.restaurantModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    deliveryDelay: { type: String, required: true },
    imageUrl: { type: String, required: true },
    distance: { type: String, required: true },
    rating: { type: Number, required: true },
    openingHours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
    },
    location: {
        lat: String,
        long: String
    },
    timeStamp: { type: Date, default: new Date() }
});
exports.restaurantModel = mongoose_1.default.model('restaurants', restaurantSchema);
const restaurants = [
    {
        "name": "Noodle House",
        "cuisine": "Japanese",
        "deliveryDelay": "10-15",
        "imageUrl": "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "2 km",
        "rating": 4.2,
        "openingHours": {
            "monday": "11:00 AM - 8:00 PM",
            "tuesday": "11:00 AM - 8:00 PM",
            "wednesday": "11:00 AM - 8:00 PM",
            "thursday": "11:00 AM - 8:00 PM",
            "friday": "11:00 AM - 9:00 PM",
            "saturday": "12:00 PM - 9:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "40.7128",
            "long": "-74.0060"
        }
    },
    {
        "name": "Burger Joint",
        "cuisine": "American",
        "deliveryDelay": "20-30",
        "imageUrl": "https://images.pexels.com/photos/1687142/pexels-photo-1687142.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "3.5 km",
        "rating": 4.5,
        "openingHours": {
            "monday": "10:30 AM - 8:30 PM",
            "tuesday": "10:30 AM - 8:30 PM",
            "wednesday": "10:30 AM - 8:30 PM",
            "thursday": "10:30 AM - 8:30 PM",
            "friday": "10:30 AM - 9:30 PM",
            "saturday": "11:00 AM - 9:30 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "34.0522",
            "long": "-118.2437"
        }
    },
    {
        "name": "Pizza Palace",
        "cuisine": "Italian",
        "deliveryDelay": "15-25",
        "imageUrl": "https://images.pexels.com/photos/270346/pexels-photo-270346.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "1.5 km",
        "rating": 4.7,
        "openingHours": {
            "monday": "12:00 PM - 9:00 PM",
            "tuesday": "12:00 PM - 9:00 PM",
            "wednesday": "12:00 PM - 9:00 PM",
            "thursday": "12:00 PM - 9:00 PM",
            "friday": "12:00 PM - 10:00 PM",
            "saturday": "1:00 PM - 10:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "41.8781",
            "long": "-87.6298"
        }
    },
    {
        "name": "Sushi Haven",
        "cuisine": "Japanese",
        "deliveryDelay": "10-20",
        "imageUrl": "https://images.pexels.com/photos/235290/pexels-photo-235290.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "2.8 km",
        "rating": 4.6,
        "openingHours": {
            "monday": "11:30 AM - 8:30 PM",
            "tuesday": "11:30 AM - 8:30 PM",
            "wednesday": "11:30 AM - 8:30 PM",
            "thursday": "11:30 AM - 8:30 PM",
            "friday": "11:30 AM - 9:30 PM",
            "saturday": "12:00 PM - 9:30 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "34.0522",
            "long": "-118.2437"
        }
    },
    {
        "name": "Taco Time",
        "cuisine": "Mexican",
        "deliveryDelay": "15-25",
        "imageUrl": "https://images.pexels.com/photos/1670970/pexels-photo-1670970.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "4.2 km",
        "rating": 4.3,
        "openingHours": {
            "monday": "11:00 AM - 8:00 PM",
            "tuesday": "11:00 AM - 8:00 PM",
            "wednesday": "11:00 AM - 8:00 PM",
            "thursday": "11:00 AM - 8:00 PM",
            "friday": "11:00 AM - 9:00 PM",
            "saturday": "12:00 PM - 9:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "42.3601",
            "long": "-71.0589"
        }
    },
    {
        "name": "Mediterranean Delight",
        "cuisine": "Mediterranean",
        "deliveryDelay": "25-35",
        "imageUrl": "https://images.pexels.com/photos/2242736/pexels-photo-2242736.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "3.0 km",
        "rating": 4.4,
        "openingHours": {
            "monday": "11:00 AM - 9:00 PM",
            "tuesday": "11:00 AM - 9:00 PM",
            "wednesday": "11:00 AM - 9:00 PM",
            "thursday": "11:00 AM - 9:00 PM",
            "friday": "11:00 AM - 10:00 PM",
            "saturday": "12:00 PM - 10:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "33.7488",
            "long": "-84.3880"
        }
    },
    {
        "name": "Seafood Paradise",
        "cuisine": "Seafood",
        "deliveryDelay": "20-30",
        "imageUrl": "https://images.pexels.com/photos/461326/pexels-photo-461326.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "5.5 km",
        "rating": 4.8,
        "openingHours": {
            "monday": "12:00 PM - 9:00 PM",
            "tuesday": "12:00 PM - 9:00 PM",
            "wednesday": "12:00 PM - 9:00 PM",
            "thursday": "12:00 PM - 9:00 PM",
            "friday": "12:00 PM - 10:00 PM",
            "saturday": "1:00 PM - 10:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "40.7128",
            "long": "-74.0060"
        }
    },
    {
        "name": "Vegetarian Garden",
        "cuisine": "Vegetarian",
        "deliveryDelay": "15-25",
        "imageUrl": "https://images.pexels.com/photos/53682/pexels-photo-53682.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "2.0 km",
        "rating": 4.6,
        "openingHours": {
            "monday": "11:30 AM - 8:30 PM",
            "tuesday": "11:30 AM - 8:30 PM",
            "wednesday": "11:30 AM - 8:30 PM",
            "thursday": "11:30 AM - 8:30 PM",
            "friday": "11:30 AM - 9:30 PM",
            "saturday": "12:00 PM - 9:30 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "34.0522",
            "long": "-118.2437"
        }
    },
    {
        "name": "Steakhouse Supreme",
        "cuisine": "Steakhouse",
        "deliveryDelay": "20-30",
        "imageUrl": "https://images.pexels.com/photos/312010/pexels-photo-312010.jpeg?auto=compress&cs=tinysrgb&w=600",
        "distance": "3.8 km",
        "rating": 4.7,
        "openingHours": {
            "monday": "5:00 PM - 10:00 PM",
            "tuesday": "5:00 PM - 10:00 PM",
            "wednesday": "5:00 PM - 10:00 PM",
            "thursday": "5:00 PM - 10:00 PM",
            "friday": "5:00 PM - 11:00 PM",
            "saturday": "4:30 PM - 11:00 PM",
            "sunday": "Closed"
        },
        "location": {
            "lat": "41.8781",
            "long": "-87.6298"
        }
    }
];
