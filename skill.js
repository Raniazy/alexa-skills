(() => {
  'use strict'

exports.handle = (event, context, callback) => {
    try {
      assert(event.session);
      assert(event.session.application);

      assert(event.request);
      assert(event.request.intent);

    } catch (e) {
      callback(null, {
            "version": "1.0",
            "response": {
              "outputSpeech": {
                "type": "PlainText",
                "text": "hello Alexa"
              }
              "shouldEndSession": true
            },
            "sessionAttributes": {}
      });
    }
  }
})();