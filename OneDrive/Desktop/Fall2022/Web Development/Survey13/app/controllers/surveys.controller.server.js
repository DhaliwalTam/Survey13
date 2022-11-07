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

export function DisplaySurveyEditPage(req, res, next) {
    let id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'Edit Survey',
            page: 'surveys/edit',
            survey: survey,
            //displayName: UserDisplayName(req)
        });
    });


}

export function ProcessSurveyEditPage(req,res,next){
    let id = req.params.id;

    let updatedSurvey = surveyModel({
        _id: req.body.id,
        createdBy: req.body.createdBy,
        template: "Multiple Choice",
        title: req.body.title,
        createdOn: req.body.createdOn,
        expiry: req.body.expiringOn,
        questions: [],
        options: []
    });

    for(var i = 0; i < req.body.ques.length; i++){
        if(req.body.ques[i] !== ""){
            updatedSurvey.questions.push(req.body.ques[i]);
        }

        if(req.body.ques[i] == "undefined" || req.body.ques[i] == null ){
            const index = updatedSurvey.questions.indexOf(req.body.ques[i]);
            if (index > -1) {
                updatedSurvey.questions.splice(index, 1);
            }
        }

        if(req.body[`choices${i+1}`] !== ""){
            updatedSurvey.options.push(req.body[`choices${i+1}`]);
        }

        if(req.body[`choices${i+1}`] == "undefined" || req.body[`choices${i+1}`] == null){
            updatedSurvey.options[i] = [];
        }
    }
    
    surveyModel.updateOne({
        _id: id
    }, updatedSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/surveys/list');
    })
}