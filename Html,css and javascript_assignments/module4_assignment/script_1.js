(function (window) {
   var helloSpeaker = {}
    var speakWord = "Hello";
    helloSpeaker.sayHello = function speak(names) {
        console.log(speakWord + " " +names);
    }
    window.helloSpeaker = helloSpeaker;
    
})(window);

