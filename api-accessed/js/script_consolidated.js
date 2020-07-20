/*

{

  "channel": {"id":293833,"name":"espnew","latitude":"13.331149","longitude":"77.094484","field1":"sensor1","field2":"sensor2","field3":"sensor3","field4":"sensor4","created_at":"2017-06-26T15:30:04Z","updated_at":"2020-07-17T10:05:37Z","last_entry_id":18},
  
  "feeds":[ {"created_at":"2020-07-17T11:27:21Z","entry_id":9,"field1":"17"},
            {"created_at":"2020-07-17T11:37:21Z","entry_id":10,"field1":"11"},
            {"created_at":"2020-07-17T11:47:21Z","entry_id":11,"field1":"7"},
            {"created_at":"2020-07-17T11:57:21Z","entry_id":12,"field1":"8"},
            {"created_at":"2020-07-17T12:07:21Z","entry_id":13,"field1":"3"},
            {"created_at":"2020-07-17T12:17:21Z","entry_id":14,"field1":"9"},
            {"created_at":"2020-07-19T15:02:25Z","entry_id":15,"field1":"0"},
            {"created_at":"2020-07-19T15:03:51Z","entry_id":16,"field1":"25"},
            {"created_at":"2020-07-20T06:25:28Z","entry_id":17,"field1":"135"},
            {"created_at":"2020-07-20T06:31:02Z","entry_id":18,"field1":"20"}
          ]
  
  }
  
  
  {
      
      "channel": {"id":293833,"name":"espnew","latitude":"13.331149","longitude":"77.094484","field1":"sensor1","field2":"sensor2","field3":"sensor3","field4":"sensor4","created_at":"2017-06-26T15:30:04Z","updated_at":"2020-07-17T10:05:37Z","last_entry_id":18},
      "feeds":[
      
                  {"created_at":"2020-07-17T11:27:21Z","entry_id":9,"field1":"17","field2":"27","field3":"48","field4":"57"},
                  {"created_at":"2020-07-17T11:37:21Z","entry_id":10,"field1":"11","field2":"22","field3":"42","field4":"66"},
                  {"created_at":"2020-07-17T11:47:21Z","entry_id":11,"field1":"7","field2":"35","field3":"43","field4":"77"},
                  {"created_at":"2020-07-17T11:57:21Z","entry_id":12,"field1":"8","field2":"33","field3":"54","field4":"76"},
                  {"created_at":"2020-07-17T12:07:21Z","entry_id":13,"field1":"3","field2":"32","field3":"65","field4":"73"},
                  {"created_at":"2020-07-17T12:17:21Z","entry_id":14,"field1":"9","field2":"31","field3":"60","field4":"80"},
                  {"created_at":"2020-07-19T15:02:25Z","entry_id":15,"field1":"0","field2":null,"field3":null,"field4":null},
                  {"created_at":"2020-07-19T15:03:51Z","entry_id":16,"field1":"25","field2":"25","field3":"25","field4":"25"},
                  {"created_at":"2020-07-20T06:25:28Z","entry_id":17,"field1":"135","field2":"35","field3":"13","field4":"55"},
                  {"created_at":"2020-07-20T06:31:02Z","entry_id":18,"field1":"20","field2":"40","field3":"60","field4":"80"}
                  
              ]
          
  }
  
*/

/*
Sample data that can be plotted - example:

var data = {
    header: ["Name", "Death toll"],
    rows: [
      ["San-Francisco (1906)", 1500, 1222],
      ["Messina (1908)", 87000, 1222],
      ["Ashgabat (1948)", 175000, 1222],
      ["Chile (1960)", 10000, 1222],
      ["Tian Shan (1976)", 242000, 242000],
      ["Armenia (1988)", 25000, 242000],
      ["Iran (1990)", 50000, 242000]
  ]};

*/


anychart.onDocumentReady(function() {

  // GET the data from API
  const url = 'https://api.thingspeak.com/channels/293833/feeds.json?results=10';
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

      //console.log(data);
      
      let final_data = {};
      var arr1 = [];
      arr1.push(data.channel.field1);
      var arr2 = [];
      arr2.push(data.channel.field2);
      var arr3 = [];
      arr3.push(data.channel.field3);
      var arr4 = [];
      arr4.push(data.channel.field4);
      var header = [];
      header.push("Sensor no.");
      var rows = [];

      for (let i = 0; i < data.feeds.length; i++) {
        //console.log(data.feeds[0]);
        //console.log(data.feeds[0]["entry_id"]);
        header.push(data.feeds[i]["created_at"]);
        arr1.push(data.feeds[i]["field1"]);
        arr2.push(data.feeds[i]["field2"]);
        arr3.push(data.feeds[i]["field3"]);
        arr4.push(data.feeds[i]["field4"]); 
      }

      rows.push(arr1);
      rows.push(arr2);
      rows.push(arr3);
      rows.push(arr4);

      final_data["header"] = header;
      final_data["rows"] = rows;

      console.log(header);
      console.log(rows);
      console.log(final_data);

      var chart = anychart.column();

      // add data
      chart.data(final_data);

      // set the chart title
      chart.title("Visualize API data");

      // draw
      chart.container("container");
      chart.draw();
      
    })
    .catch(function(error) {
      console.log(error);
    })
  
});