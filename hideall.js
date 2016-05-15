var show = $('<a class=\'control show\'>Show all</a>');
show.click(function () {
  $('#content article:not(".active") > a').trigger('click');    
});
$('#content').prepend(show);

var hide = $('<a class=\'control hide\'>Hide all</a>');
hide.click(function () {
  $('#content article.active > a').trigger('click');    
});
$('#content').prepend(hide);

// Making our navigation sticky
new Filter($('#sidebar > ul'));
});
require.alias("boot/index.js", "carte/deps/boot/index.js");

require.alias("component-jquery/index.js", "boot/deps/jquery/index.js");

require.alias("filter/index.js", "boot/deps/filter/index.js");
require.alias("component-jquery/index.js", "filter/deps/jquery/index.js");