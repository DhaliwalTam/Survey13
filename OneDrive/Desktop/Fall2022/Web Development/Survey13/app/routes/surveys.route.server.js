import { Router } from "express";
//import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList, DisplayCreateSurveyPage, ProcessSurveyCreatePage} from "../controllers/surveys.controller.server.js";

const router = Router();

router.get('/surveys/list', DisplaySurveyList);
router.get('/surveys/create',DisplayCreateSurveyPage);
router.post('/surveys/create', ProcessSurveyCreatePage);

export default router;