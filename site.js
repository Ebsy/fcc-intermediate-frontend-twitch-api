var chans = [
  'freecodecamp', 'cheatbanned', 'terakilobyte', 'habathcx',
  'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff',
  'freecodecamp', 'cheatbanned', 'terakilobyte', 'habathcx',
  'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff'
];
var results = [];
var streamURL = 'https://api.twitch.tv/kraken/streams/{{CHAN}}?callback=?';

var htmlString = '';
var $grid

var panels = ['grid-item', 'grid-item--width2', 'grid-item--width3', 'grid-item', 'grid-item--width2', 'grid-item--width3', 'grid-item', 'grid-item--width2', 'grid-item--width3', 'grid-item', 'grid-item--width2', 'grid-item--width3'];

$(document).ready(function() {
  $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  $grid.imagesLoaded().progress(function() {
    $grid.masonry();
  });
  getData();

});

function getData() {
  // while (results.length !== chans.length) {
  for (var i = 0; i < chans.length; i++) {
    var url = streamURL.replace('{{CHAN}}', chans[i]);

    $.getJSON(url, function(data) {
      getChanInfo(data._links.channel, function(result) {
        data.chanInfo = result;
        console.log(data)
        results.push(buildPanel(data));
        // $grid.imagesLoaded().progress(function() {
        //   $grid.masonry('layout');
        // });
        checkFinished();
      });
    });
  }
}

function checkFinished() {
  if (results.length === chans.length) {
    htmlString = '';
    for (var i = 0; i < results.length; i++) {
      htmlString += results[i];
    }

    $('#content').html(htmlString)


    console.log(htmlString)
  }
}

function getChanInfo(url, callback) {
  $.getJSON(url, function(info) {
    callback(info);
  });
}

function buildPanel(x) {
  var html = '';
  //html += '<div class="row">'
  console.log(Math.floor((Math.random() * 10)));
  html += '<div class="' + panels[Math.floor((Math.random() * 10))] + '">'
    //html += '<div class="col-sm-4 col-xs-4 text-right bordercol">'
    //html += '<div class="grid-item">'
  html += '<img class="img-responsive" src="' + (x.chanInfo.logo || 'images/404_preview-300x300.png') + '"/>'
  html += '<a target="_blank" href="' + 'http://twitch.tv/' + x.chanInfo.display_name + '">'
  html += '<h4 class="title">'
  html += x.chanInfo.display_name
  html += '</h4>'
  html += '</a>'
    //html += '</div>' //first col
    //  html += '<div class="col-md-8 col-sm-8 col-xs-8 borderleft">'

  //html += '<div class="storyDesc">' + story.metaDescription + '</div>'
  //html += '<div class="storyPosted"><i class="fa fa-calendar-o fa-fw"></i>' + new Date(story.timePosted) + '</div>'
  //html += '<div class="upVotes"><i class="fa fa-thumbs-o-up fa-fw"></i>' + story.upVotes.length + '</div>'
  //html += '<a target="_blank" href="http://freecodecamp.com/' + story.author.username + '">'
  //html += '<span><i class="fa fa-fire fa-fw"></i>' + story.author.username + '</span>'
  //html += '</a>'
  html += '</div>' //second col
    //html += '</div>' //row
  return html

}
