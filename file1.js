var stringSimilarity = require('string-similarity');

const fetch = require("node-fetch");
url = "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences";
fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
      var arr1 = data.paid;
      var arr2 = data.free;
      console.log(arr1.length)
      console.log(arr2.length)
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };

    arr2.sort(sortByProperty('confStartDate'));
    arr1.sort(sortByProperty('confStartDate'));

    let results1 = [];
    let results2 = [];
  for (let i = 0; i < arr1.length - 1; i++) {
      results1.push(arr1[i])
      var similarity = stringSimilarity.compareTwoStrings(arr1[i]["confName"], arr1[i+1]["confName"]); 
    if((arr1[i + 1]["confStartDate"] == arr1[i]["confStartDate"])&&(arr1[i + 1]["venue"] == arr1[i]["venue"])&&(similarity>0.6)) {
      console.log("Duplicate  "+arr1[i].confName+"----"+arr1[i].confStartDate+"----"+arr1[i].venue+"----"+arr1[i].confUrl)
      i++;
      while((arr1[i + 1]["confStartDate"] == arr1[i]["confStartDate"])&&(arr1[i + 1]["venue"] == arr1[i]["venue"])&&(similarity>0.6))
      i++;
    }
  }

  for (let i = 0; i < arr2.length - 1; i++) {
    results2.push(arr2[i])
    var similarity = stringSimilarity.compareTwoStrings(arr2[i]["confName"], arr2[i+1]["confName"]);
  if((arr2[i + 1]["confStartDate"] == arr2[i]["confStartDate"])&&(arr2[i + 1]["venue"] == arr2[i]["venue"])&&(similarity>0.6)) {
    console.log("Duplicate  "+arr2[i].confName+"----"+arr2[i].confStartDate+"----"+arr2[i].venue+"----"+arr2[i].confUrl)
    i++;
    while((arr2[i + 1]["confStartDate"] == arr2[i]["confStartDate"])&&(arr2[i + 1]["venue"] == arr2[i]["venue"])&&(similarity>0.6))
    i++;

  }
}
      console.log("Free Conferences : ")
      for(i in results2)
      {
          console.log(i+")")
          console.log(results2[i].confName+"----"+results2[i].confStartDate+"----"+results2[i].venue+"----"+results2[i].confUrl);
      }
      console.log("Paid Conferences : ")
      for(i in results1)
      {
          console.log(i+")")
          console.log(results1[i].confName+"----"+results1[i].confStartDate+"----"+results1[i].venue+"----"+results1[i].confUrl);
      }
  }).catch(function(err) {
    console.log(err);
  });

  