$(document).ready(function(){
  $('#update').on('click', function(){
    var thing = map.getCenter().toJSON();
    var sSON = '{"lat" : ' + thing.lat + ', "lng" : ' + thing.lng + '}'
    $('#epicenter').val(sSON);
    console.log('Epicenter Updated');
  })
})

//Can you save the zoom amount?
