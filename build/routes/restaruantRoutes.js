"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantsController_1 = require("../controllers/restaurantsController");
const router = express_1.default.Router();
router.get('/all', restaurantsController_1.getAllResturants);
router.post('/create', restaurantsController_1.createResuturant);
exports.default = router;
