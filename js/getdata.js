//Generic Function called "onload" in the HTML file
function startNow(){
  getDate();
}

//Step 1: Get the current day of the month
function getDate(){
  console.log("getDate");
  var d = new Date();
  dayOfMonth = d.getDate();
  makeURL(d.getDate());
}

//Step 2: Use that day to Make the URL for the api data pull
function makeURL(day){
	console.log("makeURL");
  var url = "https://cors-anywhere.herokuapp.com/https://labs.bible.org/api/?passage=" + book + "%20" + day + "&type=json";
  getChapterData(url);
  //reset the future title
  quiztitle = "Proverbs "+ dayOfMonth;
}
//Api source - http://labs.bible.org/api_web_service  NET Bible

//Step 3: Collect JSON data of the Proverb of the day
function getChapterData(url){
	console.log("getChapterData");
  $.getJSON(url, function(json) {
    //bring in the data with stringify
    var stringData = JSON.stringify(json);

    //convert new string into a usable javascript object
    var objectData = JSON.parse(stringData);
    
    makeQandA(objectData);
  }); 
}

//Step 5: Make the Q and A items - Last 3 words of each line are the "A"
//Could change the # of word for the "Difficulty level"**
function makeQandA(rawChapter){
	console.log("rawChapter");
  //future home of the questions and answer banks
  var qBank = [];
  var aBank = [];

  //A home for the string per loop
  var iArray=[];

  //Number of words in the answer
  var numWords = 3;//**
  
  //The split verse into last 3 words (answer) and rest of the verse (question)
  for(var i=0;i<rawChapter.length;i++){

    iArray=rawChapter[i]["text"].split(" ");
    
    qBank.push(iArray.slice(0, iArray.length-numWords).join(" "));//**
    aBank.push(iArray.slice(iArray.length-numWords,iArray.length).join(" "));
  }
  buildObject(qBank,aBank);
 }


//Step 5: Build an object of quiz data to pass to quiz.js quiz template
//Could change the # of answers for the "Difficulty level"**
function buildObject(q,a){
	console.log("buildObject");
  var objectData = [];
  for (var i = 0; i < q.length; i++) {
    objectData.push({
            "question"      :   q[i],
            "choices"       :   shuffledAnswerArray(a,i,4),//**
            "correct"       :   a[i],
        });
  }
  //Set the quiz data
  quiz=objectData;

  //Creat the start button, now that they data is finished loading
  startButton(objectData);
}

//Unique Appendix Functions

//Returns a shuffled answer bank including the correct answer
function shuffledAnswerArray(fullAnswerArray,correctIndex,numberOfAnswers){
  var localAbank= [];//all the possible answers in

  var iArray = randomArray(0,fullAnswerArray.length);
  iArray.splice(correctIndex,1)//take out the correct answer 
  iArray = shuffle(iArray);//shuffle the order of all but the right one
  iArray = iArray.splice(0,numberOfAnswers-1);//take your first 3 (now in random order)
  iArray.push(correctIndex);//add on the right one
  iArray = shuffle(iArray);//Shuffle once more

  for (var i = 0; i < iArray.length; i++) {
    localAbank.push(fullAnswerArray[iArray[i]]);
  }

  return localAbank;
}

