const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
const config = require('./config.json');



/*
const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
//const key_var = 'c93eee6b9dab47299eff9ebae6ced048';

if (!process.env.key_var) {
    throw new Error('please set/export the following environment variable: ' + key_var);
}
const subscription_key = process.env.key_var;

const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
//const endpoint_var = 'https://eastus.api.cognitive.microsoft.com/';
if (!process.env.endpoint_var) {
    throw new Error('please set/export the following environment variable: ' + endpoint_var);
}
const endpoint = process.env.endpoint_var;
*/

const subscription_key = config.azureToken;
const endpoint = config.azureEndpoint;

const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

export async function analyzeSentence(sentence){

    const inputDocuments = {documents:[
        {language:"en", id:"1", text:sentence}
    ]};

    const result = await client.sentiment({multiLanguageBatchInput: inputDocuments});

    console.log(result.documents[0].score);
    console.log(inputDocuments);
    return(parseFloat(result.documents[0].score));
   
}

export async function analyzeMultipleSentences(sentences){

    const inputDocuments = {documents:[]};
    let count = 1;

    sentences.forEach(element => {
        inputDocuments.documents[count-1] = ({language:"en", id:count.toString(), text:element});
        count++;    
    });

    //console.log(inputDocuments);
    //console.log(inputDocuments2);

    const result = await client.sentiment({multiLanguageBatchInput: inputDocuments});

    let documentScores = 0;

    result.documents.forEach(element => {
        //console.log(element.score);
        documentScores += element.score;
    });

    documentScores /= result.documents.length;
    
    //console.log(result);
    //console.log(documentScores);
    return documentScores;
}

export function analyzeUser(userID){
    

}