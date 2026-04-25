"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Incident_1 = __importDefault(require("../models/Incident"));
const Comment_1 = __importDefault(require("../models/Comment"));
const router = (0, express_1.Router)();
router.get("/", async (_, res) => {
    const incidents = await Incident_1.default.find().populate("alerts");
    const result = await Promise.all(incidents.map(async (i) => {
        const comments = await Comment_1.default.find({ incidentId: i._id });
        return {
            ...i.toObject(),
            comments
        };
    }));
    res.json(result);
});
router.post("/", async (req, res) => {
    const incident = await Incident_1.default.create(req.body);
    res.status(201).json(incident);
});
router.post("/:id/alerts", async (req, res) => {
    const incident = await Incident_1.default.findById(req.params.id);
    if (!incident)
        return res.status(404).json({ message: "Not found" });
    incident.alerts.push(...req.body.alertIds);
    await incident.save();
    res.json(incident);
});
router.post("/:id/comments", async (req, res) => {
    const comment = await Comment_1.default.create({
        incidentId: req.params.id,
        message: req.body.message
    });
    res.json(comment);
});
exports.default = router;
