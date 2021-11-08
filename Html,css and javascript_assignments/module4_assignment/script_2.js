(function (window) {
    var byeSpeaker = {}
    var speakWord = "Goodbye";
   byeSpeaker.sayGoodbye = function speak(names) { //an object that call byespeaker can say goobye/ by 
       console.log(speakWord + " " + names);
   }

   window.byeSpeaker = byeSpeaker;

   
})(window)

