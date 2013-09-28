(function() {
Titanium.API.log("player");

var init = function(win){

	var b1 = Ti.UI.createButton({
		title:'Play',
		width:80,
		height:40,
		left:20,
		top:20
	});
	b1.addEventListener('click', function() {
		player.play();
	});
	win.add(b1);
	
	var b2 = Ti.UI.createButton({
		title:'Pause',
		width:80,
		height:40,
		top:20
	});
	b2.addEventListener('click', function() {
		player.pause();
	});
	win.add(b2);
};

exports.init = init;
})();