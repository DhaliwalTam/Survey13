import { Router } from "express";
//import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList} from "../controllers/surveys.controller.server.js";

const router = Router();

router.get('/surveys/list', DisplaySurveyList);

export default router;