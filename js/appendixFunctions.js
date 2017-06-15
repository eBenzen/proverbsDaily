//Function to shuffle an array
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
//Source - https://solidfoundationwebdev.com/blog/posts/how-to-shuffle-an-array-in-javascript

//Create a Random Array of Numbers
function randomArray(minNum, length){
  var iArray=[];
  for (var i = minNum; i < length; i++) {
    iArray.push(i);
  }
  return iArray;
}