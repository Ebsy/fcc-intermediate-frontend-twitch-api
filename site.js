var chans = [
  'freecodecamp', '2dheroes',
  'noobs2ninjas', 'simuleios',
  'trumpi27', 'cmiotk1863', 'kpulv', 'adam13531',
  'Bamboy360', 'noobs2ninjas', 'kashou_', 'destinybit',
  'flipswitchx', 'zhootdotse', 'gamingcatsstudio'
];
var results = [];
var streamURL = 'https://api.twitch.tv/kraken/streams/{{CHAN}}?callback=?';

var htmlString = '';
var $grid;

var panels = ['item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item'];

$(document).ready(function() {
  getData();
});

function getData() {
  chans = shuffle(chans);
  // while (results.length !== chans.length) {
  for (var i = 0; i < chans.length; i++) {
    var url = streamURL.replace('{{CHAN}}', chans[i]);

    $.getJSON(url, function(data) {
      getChanInfo(data._links.channel, function(result) {
        console.log(result);
        data.chanInfo = result;
        results.push(buildPanel(data));
        checkFinished();
      });
    });
  }
}

function checkFinished() {
  if (results.length === chans.length) {

    var masonry_container = document.querySelector('#timeline');
    var new_items = []; // array to contain our DOM elements

    htmlString = '';
    for (var i = 0; i < results.length; i++) {
      var item = $.parseHTML('<div></div>');
      console.log(results[i])
      console.log('---------')
      $(item).html(results[i]);
      salvattore.appendElements(masonry_container, item);
    }
  }
}

function getChanInfo(url, callback) {
  $.getJSON(url, function(info) {
    callback(info);
  });
}

// Fisher-Yates
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildPanel(x) {
  var html = '';
  console.log(Math.floor((Math.random() * 10)));
  html += '<div class="' + panels[Math.floor((Math.random() * 10))] + '">';
  html += '<a target="_blank" href="' + 'http://twitch.tv/' + x.chanInfo.display_name + '">';
  html += '<h4 class="title text-center">';
  html += x.chanInfo.display_name;
  html += '</h4>';
  html += '</a>';
  html += '<img src="' + (x.chanInfo.profile_banner || x.chanInfo.logo || 'images/404_preview-300x300.png') + '"/>';
  html += '<a target="_blank" href="' + 'http://twitch.tv/' + x.chanInfo.display_name + '">';
  html += '<h4 class="title text-center">';
  html += x.chanInfo.display_name;
  html += '</h4>';
  html += '</a>';
  html += '</div>';
  return html;
}
