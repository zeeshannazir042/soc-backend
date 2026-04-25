import { Router } from "express";
import Triage from "../models/Triage";

const router = Router();

router.post("/:alertId", async (req, res) => {
  const { status, analystNote } = req.body;

  const triage = await Triage.findOneAndUpdate(
    { alertId: req.params.alertId },
    { status, analystNote },
    { upsert: true, new: true }
  );

  res.json(triage);
});

export default router;