$(function() {
  $('.itinerary_list').on('mouseenter', '.one_itinerary', hover_markers_appear );
  $('.itinerary_list').on('mouseleave', '.one_itinerary', hover_markers_clear );
});

var map;
var markers = [];

function hover_markers_appear() {
  $(this).css('background', '#efefef');
  var array = $('.one_itinerary').find('ul').children();
  _.each(array, hover_add_markers);
}

function hover_add_markers(x) {
  var lat = parseInt($(x).children().children().first().text());
  var long = parseInt($(x).children().children().last().text());
  add_marker(lat, long, 'x' );
}

function add_marker(lat, long, title){
  var latlng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({position: latlng, map: map, title: title});
  markers.push(marker);
}

function hover_markers_clear() {
  $(this).css('background', '');
  _.each(markers, function(m){m.setMap(null);});
  markers = [];
  add_marker(home_marker[0], home_marker[1], home_marker[2]);
}

function display_map(lat, long, zoom) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var canvas = $('#map_canvas')[0];
  map = new google.maps.Map(canvas, mapOptions);
}
