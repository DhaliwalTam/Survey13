import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    createdBy: String,
    template: String, 
    title: String,
    createdOn: Date,
    active: Date,
    expiry: Date,
    questions: [String],
    options: []
}, {
    timestamps: true,
    collection: 'survey'
});

export default mongoose.model('Surveys', SurveySchema);