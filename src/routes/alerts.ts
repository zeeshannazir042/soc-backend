import { Router } from "express";
import Alert from "../models/Alert";
import Triage from "../models/Triage";

const router = Router();

router.get("/", async (_, res) => {
  const alerts = await Alert.find().lean();
  const triage = await Triage.find().lean();

  const map = new Map(triage.map(t => [String(t.alertId), t]));

  const result = alerts.map(a => ({
    ...a,
    triage: map.get(String(a._id)) || null
  }));

  res.json(result);
});


router.post("/", async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json(alert);
});

export default router;