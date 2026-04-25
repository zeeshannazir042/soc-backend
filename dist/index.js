"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const alerts_1 = __importDefault(require("./routes/alerts"));
const triage_1 = __importDefault(require("./routes/triage"));
const incidents_1 = __importDefault(require("./routes/incidents"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/alerts", alerts_1.default);
app.use("/triage", triage_1.default);
app.use("/incidents", incidents_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
