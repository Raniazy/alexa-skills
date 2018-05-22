exports.handler = (event, context, callback) => {


    switch (event.request.type) {
      case "LaunchRequest":
        console.log(`LAUNCH REQUEST`)
        break;
      case "IntentRequest":
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name){
          case "GetGithubFollowerCount":
              context.succeed(buildResponse(`You have 30 followers`))
            break;
          default:
          context.succeed(buildResponse("Sorry I couldn't understand"))
        }
        break;
      case "SessionEndedRequest":
        console.log(`SESSION ENDED REQUEST`)
        break;
      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)
    }


}

buildResponse = (outputText) => {
  return {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: outputText
      },
      shouldEndSession: true
    },
    sessionAttributes: {}
  }
}