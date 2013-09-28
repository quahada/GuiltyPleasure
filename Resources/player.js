(function() {
Titanium.API.log("player");

var loadPlaylist = function(){
	var songs = [
		{
			artist: 'Toro Y Moi',
			title: 'All Alone',
			artworkFile:'/songs/Toro Y Moi - All Alone.jpg',
			songFile:'/songs/Toro Y Moi - All Alone.mp3',
		},
		{
			artist: 'Atlas Genius',
			title: 'Centred On You (St. Lucia Remix)',
			artworkFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).jpg',
			songFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).mp3',
		)
	];
};

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

	var player = Ti.Media.createAudioPlayer({allowBackground: true});

	loadPlaylist();
};

exports.init = init;
})();