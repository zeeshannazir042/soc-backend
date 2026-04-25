"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Alert_1 = __importDefault(require("../models/Alert"));
const Triage_1 = __importDefault(require("../models/Triage"));
const router = (0, express_1.Router)();
router.get("/", async (_, res) => {
    const alerts = await Alert_1.default.find().lean();
    const triage = await Triage_1.default.find().lean();
    const map = new Map(triage.map(t => [String(t.alertId), t]));
    const result = alerts.map(a => ({
        ...a,
        triage: map.get(String(a._id)) || null
    }));
    res.json(result);
});
router.post("/", async (req, res) => {
    const alert = await Alert_1.default.create(req.body);
    res.status(201).json(alert);
});
exports.default = router;
