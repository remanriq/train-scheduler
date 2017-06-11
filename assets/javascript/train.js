

var config = {
	apiKey: "AIzaSyACFRW1qLBaEgXZMxkVH8COhhkgJeZ-WXI",
    authDomain: "superawesome-8ecb1.firebaseapp.com",
    databaseURL: "https://superawesome-8ecb1.firebaseio.com",
    projectId: "superawesome-8ecb1",
    storageBucket: "superawesome-8ecb1.appspot.com",
    messagingSenderId: "817744031809"

};
firebase.initializeApp(config);

var database = firebase.database();


//$(some_button_Goes_HERE").ON(click;, function(){
  //collect the data from the html form, create variables to hold the data 
  //train name...etc

$("#add-train").on("click", function(){



var train =   $("#train-name").val().trim();
var destination = $("#destination-input").val().trim();
var firstTime =  $("#first-input").val().trim();
var frequency = $("#frequency-input").val().trim();


var newTrain = {
	train: train, 
	destination: destination,
	firstTime: firstTime,
	frequency: frequency,

}
	database.ref().push(newTrain);

$("#train-name").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");

console.log("newTrain: " + newTrain);
console.log("train: " + newTrain.train);
console.log("destination: " + newTrain.destination);
console.log("firstTime: " + newTrain.firstTime);
console.log("frequency: " + newTrain.frequency);

return false;


});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

console.log("child SnapShot value:" + childSnapshot.val());

var train = childSnapshot.val().train;
var destination = childSnapshot.val().destination;
var firstTime = childSnapshot.val().firstTime;
var frequency = childSnapshot.val().frequency;


      console.log('firstTime: ' , firstTime);
      console.log('train: ' + train );
      console.log('destionation: ' + destination);
      console.log('frequency: ' + frequency);

  	

    // First Time (pushed back 1 year to make sure it comes before current time)

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));


    var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "days");
    

    // Current Time

    // Difference between the times
     timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + firstTime);

    // Time apart (remainder)
    var remainder = timeDiff % frequency;
    console.log("Remainder: " + remainder);

    // Minute Until Train
    var minutesTillTrain = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
     

	$("#train-list > tbody").append("<tr><td>" + train + "</td><td>" + 
	destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + minutesTillTrain);
       
	return false; 




});











 //when retrieving the train data, make sure to parse intinto a unix timestamp
//  FIRST MAKE THE TALBE ROW SHOW UP WITH EMPTY STRINGS for timeinMINUTES




  //'push' that data into firebase (assume that the child_added listener updates HTMl)
  //alert that train was added
  //clear out our html form for the next input

//});