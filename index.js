var request = require('request');

exports.handler = (event, context, callback) => {
    try {
        if (event.request.type === 'LaunchRequest') {
            callback(null, buildResponse('Hello from Lambda'));
        } else if (event.request.type === 'IntentRequest') {
            const intentName = event.request.intent.name;

            if (intentName === 'deployProject') {
                buildCircleCiProject(function (err, result) {
                    if(!err) callback(null, buildResponse("The build was launched. make sure you take a look. See you."));
                    else callback(null, buildResponse("Please check your build logs. Something went wrong."));
                });
            } else {
                callback(null, buildResponse("Sorry, i don't understand"));
            }
        } else if (event.request.type === 'SessionEndedRequest') {
            callback(null, buildResponse('Session Ended'));
        }
    } catch (e) {
        context.fail(`Exception: ${e}`);
    }
};

function buildResponse(response) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: response,
            },
            shouldEndSession: true,
        },
        sessionAttributes: {},
    };
}

function buildCircleCiProject(callback) {
    var options = {
        url: `https://circleci.com/api/v1.1/project/github/Raniazy/bot-backend/tree/dockerized-bot?circle-token=${process.env.CIRCLE_CI_TOKEN}`,
        headers: {
            'User-Agent': 'alexa-skill'
        }
    };
    request.post(options, function(error, response, body){
        if(error){
            callback("ERROR");

        } else {
            callback(null,"SUCCESS");
        }
    });
}