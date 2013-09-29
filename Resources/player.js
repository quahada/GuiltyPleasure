(function() {
Titanium.API.log("player");

var songs;
var player = Ti.Media.createAudioPlayer({allowBackground: true});
//var player = Ti.Media.createSound();

var Control = require('net.hoyohoyo.tiremotecontrol');
Control.addEventListener('remotecontrol', function(e) {
  Ti.API.debug('player: remote control event was fired!!!!');
  switch (e.subtype) {
    case Control.REMOTE_CONTROL_PLAY:
      break;
    case Control.REMOTE_CONTROL_PAUSE:
      break;
    case Control.REMOTE_CONTROL_STOP:
      break;
    case Control.REMOTE_CONTROL_PLAY_PAUSE:
      break;
    case Control.REMOTE_CONTROL_PREV:
      break;
    case Control.REMOTE_CONTROL_NEXT:
      break;
  }
});

var loadPlaylist = function(){
	songs = [
		{
			artist: 'Toro Y Moi',
			title: 'All Alone',
			artworkFile:'/songs/Toro Y Moi - All Alone.jpg',
			//songFile:'/songs/Toro Y Moi - All Alone.mp3',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Toro+Y+Moi+-+All+Alone.mp3',
		},
		{
			artist: 'Atlas Genius',
			title: 'Centred On You (St. Lucia Remix)',
			artworkFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).jpg',
			//songFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).mp3',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Atlas+Genius+-+Centred+On+You+(St.+Lucia+Remix).mp3',
		}
	];
};

var init = function(win){

	loadPlaylist();

	var b1 = Ti.UI.createButton({
		title:'Play',
		width:80,
		height:40,
		left:20,
		top:20
	});
	b1.addEventListener('click', function() {
		Control.clearNowPlayingInfo();
		player.stop();
		player.url = songs[0].songFile;
		player.play();
		///*
		Control.setNowPlayingInfo({
		  artist: songs[0].artist,
		  title: 'Happy Birthday to You',
		  albumTitle: 'unknown'
		});
		//*/
	});
	win.add(b1);

	var b3 = Ti.UI.createButton({
		title:'Atlas',
		width:80,
		height:40,
		left:20,
		top:80
	});
	b3.addEventListener('click', function() {
		Control.clearNowPlayingInfo();
		player.stop();
		player.url = songs[1].songFile;
		player.play();
		///*
		Control.setNowPlayingInfo({
		  artist: songs[1].artist,
		  title: 'Happy Birthday to You',
		  albumTitle: 'unknown'
		});
		//*/
	});
	win.add(b3);
	
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