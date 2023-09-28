"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const corsOptions_1 = require("./config/corsOptions");
const cors_1 = __importDefault(require("cors"));
const restaruantRoutes_1 = __importDefault(require("./routes/restaruantRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const loggerIndex_1 = __importDefault(require("./middleware/logger/loggerIndex"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const LOCALHOST_IP = process.env.LOCALHOST_IP || '0.0.0.0';
const LocalHostport = process.env.PORT || 3000;
const PORT = LocalHostport;
const CONNECTION_URL = process.env.CONNECTION_URL || '';
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
loggerIndex_1.default.info('text info', { meta1: 'meta1' });
loggerIndex_1.default.warn('text warn');
loggerIndex_1.default.error('text error');
loggerIndex_1.default.http('text http');
// logger.error(new Error('somthing went wrong'))
app.use('/restaurant', restaruantRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: "hellow" });
});
mongoose_1.default.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, LOCALHOST_IP, () => {
    console.log(`server running at ${LOCALHOST_IP}:${PORT}`);
}))
    .catch((error) => console.log(error));
