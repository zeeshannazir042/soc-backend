import { Router } from "express";
import Incident from "../models/Incident";
import Comment from "../models/Comment";

const router = Router();

router.get("/", async (_, res) => {
  const incidents = await Incident.find().populate("alerts");

  const result = await Promise.all(
    incidents.map(async (i) => {
      const comments = await Comment.find({ incidentId: i._id });

      return {
        ...i.toObject(),
        comments
      };
    })
  );

  res.json(result);
});


router.post("/", async (req, res) => {
  const incident = await Incident.create(req.body);
  res.status(201).json(incident);
});

router.post("/:id/alerts", async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (!incident) return res.status(404).json({ message: "Not found" });

  incident.alerts.push(...req.body.alertIds);
  await incident.save();

  res.json(incident);
});

router.post("/:id/comments", async (req, res) => {
  const comment = await Comment.create({
    incidentId: req.params.id,
    message: req.body.message
  });

  res.json(comment);
});

export default router;