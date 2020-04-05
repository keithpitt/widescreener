key = "...";
query = "...";

const request = require('request');
const parse = require('node-html-parser');

request('https://api.themoviedb.org/3/search/movie?api_key=' + key + '&language=en-US&query=' + encodeURIComponent(query) + '&page=1&include_adult=false', (error, response, body) => {
  var json = JSON.parse(body);

  request('https://api.themoviedb.org/3/movie/' + json.results[0].id + '?api_key=' + key, (error2, response2, body2) => {
    var json2 = JSON.parse(body2);

    request('https://www.imdb.com/title/' + json2.imdb_id + '/technical', (error3, response3, body3) => {
      const root = parse.parse(body3);
      var text = root.text;

      if(text.search('2.39 : 1') > 1 || text.search('2.35 : 1')) {
        console.log('widesdcreen')
      } else if(text.search('2.00 : 1')) {
        console.log('2-1')
      } else {
        console.log('dunno')
      }
    });
  });
})
