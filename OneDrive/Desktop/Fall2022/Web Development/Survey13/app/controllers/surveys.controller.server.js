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
        createdBy: req.body.displayName,
        template: "Multiple Choice",
        title: req.body.title,
        createdOn: today,
        active: req.body.activeDate,
        expiry: req.body.expiryDate,
        questions: [],
        options: []
    });
    
    
    for(let i = 0;i < 5; i++) {
        if(req.body[`ques${i+1}`] !== ""){
            newSurvey.questions.push(req.body[`ques${i+1}`]);
        }

        if(req.body[`list${i+1}`] !== ""){
            newSurvey.options.push(req.body[`list${i+1}`].split(','));
        }
    }
    
    surveyModel.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/surveys/list');
    })

   
}