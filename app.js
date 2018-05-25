var client = algoliasearch('app_id', 'api_key');
var index = client.initIndex('index_name');
var objects;

init();

function loadJSON(callback) {
    console.log("Getting the JSON data...");
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // set as false for synchronouse; set as true for asynchronous
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            console.log("Sending the JSON data...");
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }


 function init() {
   console.log("In the initializer...");
   loadJSON(function(response) {
     // parse JSON string into object
     console.log("Parsing the JSON data...");
     objects = JSON.parse(response);
     console.log("Adding objects...");
     index.addObjects(objects, function(err, content) {
        if (err) {
          console.error(err);
        }
      });
      console.log("All done!");
   })
 }
