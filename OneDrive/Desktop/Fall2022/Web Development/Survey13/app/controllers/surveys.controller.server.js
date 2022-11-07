import responsesModel from '../models/responses.js'
import surveyModel from '../models/survey.js';

var today = new Date();


export function DisplaySurveyList(req, res, next) {
    surveyModel.find(function (err, surveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'My Surveys',
            page: 'surveys/list',
            surveys: surveyCollection,
            //displayName: UserDisplayName(req)
        });
    })
}


export function DisplayCreateSurveyPage(req, res, next) {
    res.render('index', {
        title: 'Create Survey',
        page: 'surveys/create',
        //displayName: UserDisplayName(req)
    });
}


export function ProcessSurveyCreatePage(req, res, next) {
    let newSurvey = surveyModel({
        createdBy: "Siddharth Verma",
        template: "Multiple Choice",
        title: req.body.title,
        createdOn: today,
        active: req.body.active,
        expiry: req.body.expire,
        questions: req.body.questionArray,
        options: req.body.optionsArray
    });
    
    
    surveyModel.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
    })
}