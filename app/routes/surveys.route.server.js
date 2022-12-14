import { Router } from "express";
//import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList, DisplayCreateSurveyPage, ProcessSurveyCreatePage,DisplaySurveyEditPage, ProcessSurveyEditPage,
DisplaySurveyPage, ProcessSurveyPage} from "../controllers/surveys.controller.server.js";

const router = Router();

router.get('/surveys/list', DisplaySurveyList);
router.get('/surveys/create',DisplayCreateSurveyPage);
router.post('/surveys/create', ProcessSurveyCreatePage);
router.get('/surveys/edit/:id', DisplaySurveyEditPage);
router.post('/surveys/edit/:id', ProcessSurveyEditPage);
router.get('/surveys/view/:id', DisplaySurveyPage);
router.post('/surveys/view/:id',ProcessSurveyPage);


export default router;