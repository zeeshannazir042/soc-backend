"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Triage_1 = __importDefault(require("../models/Triage"));
const router = (0, express_1.Router)();
router.post("/:alertId", async (req, res) => {
    const { status, analystNote } = req.body;
    const triage = await Triage_1.default.findOneAndUpdate({ alertId: req.params.alertId }, { status, analystNote }, { upsert: true, new: true });
    res.json(triage);
});
exports.default = router;
