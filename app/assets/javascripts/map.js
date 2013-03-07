$(function() {
  $('.new_priority_form').hide();
  $('#ajax_update').hide();
  $('#create_new_itinerary').click(show_itinerary_form);
  $('#ajax_connection').click(create_new_itinerary);
  $('#ajax_update').click(edit_existing_itinerary);
  $('.form_locations').on('click', '#remove_location', remove_new_location_from_form);
  $('.new_priority_form').on('click', '#add_new_location', add_new_location_to_form);
  $('.itinerary_list').on('click', '#delete_itinerary', delete_itinerary);
  $('.itinerary_list').on('click', '#show_edit_itinerary_form', show_edit_itinerary_form);
  $('.itinerary_list').on('mouseenter', '.one_itinerary', hover_markers_appear );
  $('.itinerary_list').on('mouseleave', '.one_itinerary', hover_markers_clear );
});

var map;
var destination_li = [];
var markers = [];
var destination_array = [];

///////////////////////////////////////////////////////////////////
// EDIT ITINERARY
///////////////////////////////////////////////////////////////////

function show_edit_itinerary_form() {
  $('#ajax_update').show();
  $('#ajax_connection').hide();
  $('.new_priority_form').slideDown();
  $('#name').val( $(this).parent().find('a').first().text() );
  $('#start').val( $(this).parent().find('span').first().text() );
  $('#end').val( $(this).parent().find('span').last().text() );

  var id = $(this).parent().find('a').first().attr('href').replace('/itineraries/','');
  $('#itinerary_id').val( id );

  var array = $('.itinerary_destinations').first().children();
  $(array[0]).find('ul').remove()
  $('.form_locations').find('.individual_location_field').first().val($(array[0]).text().replace(/\s+/g, ""));
  array.splice(0,1);
  _.each(array, add_existing_location_to_form);

  $(this).parent().remove();
  return false;
}

function add_existing_location_to_form(loc) {
  loc = $(loc).first();
  $(loc[0]).find('ul').remove();
  loc = loc.text().replace(/\s+/g, "");
  var row_div = $('<div>').addClass('row');
  var input_div = $('<div>').addClass('small-9 columns');
  var remove_div = $('<div>').addClass('small-3 columns');
  var location_input = $('<input>').addClass('individual_location_field').attr('placeholder', 'Location').attr('type', 'text').val(loc);
  var location_remove = $('<a>').addClass('button small alert').attr('id', 'remove_location').text('Remove');
  input_div.append(location_input);
  remove_div.append(location_remove);
  row_div.append([input_div, remove_div]);
  $('.form_locations').children().last('a').before(row_div);
  // return false;
}

///////////////////////////////////////////////////////////////////
// AJAX CALL TO ADD ITINERARY & DESTINATIONS (EDIT)
///////////////////////////////////////////////////////////////////

function edit_existing_itinerary() {
  var token = $('input[name=authenticity_token]').val();
  var name = $('#name').val();
  var start = $('#start').val();
  var end = $('#end').val();
  var array = $('.individual_location_field');
  var id = $('#itinerary_id').val();
  _.each(array, pull_location_field_values);
  // _.filter($('h3').find('a'), function(x){ return $(x).attr('href') == ('/itineraries/' + id) }).first().remove();

  $.ajax({
    dataType: 'json',
    type: "PUT",
    url: "/itineraries/" + id,
    data: {_method:'put', authenticity_token:token, 'itinerary[name]':name, 'itinerary[start]':start, 'itinerary[end]':end, destinations:destination_array}
  }).done(render_all_itineraries);

  destination_array = [];
  destination_li = [];
  $('.new_priority_form').hide();

  return false;
}


///////////////////////////////////////////////////////////////////
// DELETE ITINERARY
///////////////////////////////////////////////////////////////////

function delete_itinerary() {
  var token = $('input[name=authenticity_token]').val();
  var id = $(this).parent().find('a').first().attr('href').replace('/itineraries/','');

  $(this).parent().remove();
  $.ajax({
    dataType: 'json',
    type: "DELETE",
    url: "/itineraries/" + id,
    data: {authenticity_token:token}
  }).done();

  return false;
}

///////////////////////////////////////////////////////////////////
// ADDING ITINERARY + DESTINATIONS FORM
///////////////////////////////////////////////////////////////////

function show_itinerary_form() {
  $('.new_priority_form').slideToggle();
  $('#ajax_update').hide();
  $('#ajax_connection').show();

  return false;
}

function add_new_location_to_form() {
  var row_div = $('<div>').addClass('row');
  var input_div = $('<div>').addClass('small-9 columns');
  var remove_div = $('<div>').addClass('small-3 columns');
  var location_input = $('<input>').addClass('individual_location_field').attr('placeholder', 'Location').attr('type', 'text');
  var location_remove = $('<a>').addClass('button small alert').attr('id', 'remove_location').text('Remove');
  input_div.append(location_input);
  remove_div.append(location_remove);
  row_div.append([input_div, remove_div]);
  $('.form_locations').children().last('a').before(row_div);
  return false;
}

function remove_new_location_from_form() {
  $(this).closest('.row').remove();
  return false;
}

///////////////////////////////////////////////////////////////////
// AJAX CALL TO ADD ITINERARY & DESTINATIONS (ADD)
///////////////////////////////////////////////////////////////////

function pull_location_field_values(destination) {
  destination_array.push($(destination).val());
}

function create_new_itinerary() {
  var token = $('input[name=authenticity_token]').val();
  var name = $('#name').val();
  var start = $('#start').val();
  var end = $('#end').val();
  var array = $('.individual_location_field');
  _.each(array, pull_location_field_values);

  $.ajax({
    dataType: 'json',
    type: "POST",
    url: "/itineraries",
    data: {authenticity_token:token, 'itinerary[name]':name, 'itinerary[start]':start, 'itinerary[end]':end, destinations:destination_array}
  }).done(render_all_itineraries);

  destination_array = [];
  destination_li = [];
  $('.new_priority_form').hide();

  return false;
}

///////////////////////////////////////////////////////////////////
// RENDER ITINERARIES
///////////////////////////////////////////////////////////////////

function render_all_itineraries(msg) {

  var container = $('<div>').addClass('one_itinerary');
  var heading3 = $('<h3>');
  var link = $('<a>').attr('href', '/itineraries/' + msg[0].id).text(msg[0].name);
    heading3.append(link);
  var ul_container = $('<ul>').addClass('itinerary_destinations');
  _.each(msg[0].destinations, render_all_destinations);
    ul_container.append(destination_li);
  var span1 = $('<span>').addClass('label').text(msg[0].start);
  var span2 = $('<span>').addClass('label right').text(msg[0].end);
  var clear = $('<div>').css('clear', 'both');
  var edit_link = $('<a>').attr('href', '#').attr('id', 'show_edit_itinerary_form').text('Edit');
  var delete_link = $('<a>').attr('href', '#').attr('id', 'delete_itinerary').addClass('right').text('Delete');
  container.append([heading3, ul_container, span1, span2, clear, $('<hr>'), edit_link, delete_link, $('<hr>')]);
  $('.new_priority_form').after(container);

  clear_input_field();

}

function render_all_destinations(destination) {
  var result = $('<li>').text(destination.address);
  var ul = $('<ul>');
  var lat = $('<li>').addClass('hide').text(destination.lat);
  var long = $('<li>').addClass('hide').text(destination.long);
  ul.append([lat, long]);

  result.append(ul);
  destination_li.push(result);
  // destination.address, destination.lat, destination.long, destination.id
}

///////////////////////////////////////////////////////////////////
// HOVER OVER ITINERARY AND MARKERS APPEAR
///////////////////////////////////////////////////////////////////

function hover_markers_appear() {
  $(this).css('background', '#efefef');
  var array = $(this).find('ul').children();
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

///////////////////////////////////////////////////////////////////
// HOVER OVER ITINERARY AND MARKERS DISAPPEAR
///////////////////////////////////////////////////////////////////

function hover_markers_clear() {
  $(this).css('background', '');
  _.each(markers, function(m){m.setMap(null);});
  markers = [];
  add_marker(home_marker[0], home_marker[1], home_marker[2]);
}

///////////////////////////////////////////////////////////////////
// CLEAR FIELDS
///////////////////////////////////////////////////////////////////

function clear_input_field() {
  var name = $('#name').val('');
  var start = $('#start').val('');
  var end = $('#end').val('');
  var array = $('.individual_location_field');
  _.each(array, clear_location_values);

}

function clear_location_values(loc) {
  loc.val('');
  return false;
}

///////////////////////////////////////////////////////////////////
// BASIC DISPLAY MAP FUNCTION
///////////////////////////////////////////////////////////////////

function display_map(lat, long, zoom) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var canvas = $('#map_canvas')[0];
  map = new google.maps.Map(canvas, mapOptions);
}