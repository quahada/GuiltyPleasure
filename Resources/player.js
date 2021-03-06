(function() {
Titanium.API.log("player");

var hasStreetCred = true;
var songs;
var songIndex = 0;
var player = Ti.Media.createAudioPlayer({allowBackground: true});
//var player = Ti.Media.createSound();
Titanium.Media.addEventListener('volume', function(e){
	Ti.API.debug('player: volume event: e: '+JSON.stringify(e));
	//hasStreetCred = true;
	player.stop();
	player.url = songs[songIndex].songFile;
	player.play();
});

var Control = require('net.hoyohoyo.tiremotecontrol');
Control.addEventListener('remotecontrol', function(e) {
  Ti.API.debug('player: remote control event: e: '+JSON.stringify(e));
  switch (e.subtype) {
    case Control.REMOTE_CONTROL_PLAY:
      player.play();
      break;
    case Control.REMOTE_CONTROL_PAUSE:
      songPause();
      break;
    case Control.REMOTE_CONTROL_STOP:
      player.stop();
      break;
    case Control.REMOTE_CONTROL_PLAY_PAUSE:
      songPause();
      break;
    case Control.REMOTE_CONTROL_PREV:
      songBack();
      break;
    case Control.REMOTE_CONTROL_NEXT:
      songNext();
      break;
  }
});

var navWin;
var playerView = Ti.UI.createView({});
var albumArtView = Ti.UI.createImageView({
	width: 300,
	center: 50,
	top:-15,
	clickName:'photo'
});
playerView.add(albumArtView);

var playerWin = Ti.UI.createWindow({});

var songNext = function(){
	player.stop();
	songIndex = (songIndex+1)%songs.length;
	//player.url = songs[songIndex].songFile;
	player.url = songs[songIndex].alternateSongFile;
	player.play();
	albumArtView.image = songs[songIndex].artworkFile;
	Control.setNowPlayingInfo({
	  artist: songs[songIndex].artist,
	  title: songs[songIndex].title,
	  artwork: songs[songIndex].artworkFile,
	});
	if (songIndex == 3){
		setTimeout(function(){
            var monetizeAlert = Ti.UI.createAlertDialog({
                title:'Pay Us or ELSE!!!!',
                //message:"Retry upload or delete recording?",
                buttonNames: ['Fuck That', 'OK'],
                //dbRowID: e.source.id
                //message:'Receive a notification when '+userData.longName+' leaves a message!'
            });
            monetizeAlert.addEventListener('click', function(e){
                Ti.API.log('monetizeAlert: e: '+JSON.stringify(e));
                Ti.API.log('monetizeAlert: this: '+JSON.stringify(this));
                //var uploadRetry = require('main_windows/upload');
                if (e.index == 1){
                    //uploadRetry.retryUpload(e.source.dbRowID, server);
                }else{
					Control.setNowPlayingInfo({
					  artist: songs[songIndex].alternateArtist,
					  title: songs[songIndex].alternateTitle,
					  artwork: songs[songIndex].alternateArtworkFile,
					});
                }
            });
            monetizeAlert.show();
		},15000);
	}
}

var songBack = function(){
	player.stop();
	songIndex = (songIndex-1)%songs.length;
	if (songIndex < 0){
		songIndex = 0;
	}
	//player.url = songs[songIndex].songFile;
	player.url = songs[songIndex].artworkFile;
	player.play();
	albumArtView.image = songs[songIndex].artworkFile;
	Control.setNowPlayingInfo({
	  artist: songs[songIndex].artist,
	  title: songs[songIndex].title,
	  artwork: songs[songIndex].artworkFile,
	});
}
var songPause = function(){
	player.pause();
}

var loadPlaylist = function(){
	songs = [
		{
			artist: 'Toro Y Moi',
			title: 'All Alone',
			artworkFile:'/songs/Toro Y Moi - All Alone.jpg',
			//songFile:'/songs/Toro Y Moi - All Alone.mp3',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Toro+Y+Moi+-+All+Alone.mp3',
			alternateArtist: 'Lady Gaga',
			alternateTitle: 'Telephone',
			alternateArtworkFile:'/songs/Lady Gaga - Telephone.jpg',
			alternateSongFile:'https://s3.amazonaws.com/titaniumtestfiles/Lady+Gaga+-+Telephone.mp3',
		},
		{
			artist: 'Atlas Genius',
			title: 'Centred On You (St. Lucia Remix)',
			artworkFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).jpg',
			//songFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).mp3',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Atlas+Genius+-+Centred+On+You+(St.+Lucia+Remix).mp3',
			alternateArtist: 'Carly Rae Jepsen',
			alternateTitle: 'Call Me Maybe',
			alternateArtworkFile:'/songs/Carly Rae Jepsen - Call Me Maybe.jpg',
			alternateSongFile:'https://s3.amazonaws.com/titaniumtestfiles/Carly+Rae+Jepsen+-+Call+Me+Maybe.mp3',
		},
		{
			artist: 'Metallica',
			title: 'Master of Puppets',
			artworkFile:'/songs/Metallica - Master of Puppets.jpg',
			//songFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).mp3',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Metallica+-+Master+of+Puppets.mp3',
			alternateArtist: 'Metallica',
			alternateTitle: 'Unforgiven II',
			alternateArtworkFile:'/songs/Metallica - Unforgiven II.jpg',
			alternateSongFile:'https://s3.amazonaws.com/titaniumtestfiles/Metallica+-+Unforgivien+II.mp3',
		},
		{
			artist: 'Local Natives',
			title: 'Wooly Robot',
			artworkFile:'/songs/Local Natives - Wooly Robot.jpg',
			//songFile:'/songs/Atlas Genius - Centred On You (St. Lucia Remix).mp3',
			alternateArtist: 'Justin Bieber',
			alternateTitle: 'Boyfriend',
			songFile:'https://s3.amazonaws.com/titaniumtestfiles/Local+Natives+-+Wooly+Robot.mp3',
			alternateArtworkFile:'/songs/Justin Bieber - Boyfriend.jpg',
			alternateSongFile:'https://s3.amazonaws.com/titaniumtestfiles/Justin+Bieber+-+Boyfriend.mp3',
		},
	];
};

var init = function(win){

	loadPlaylist();
	navWin = Ti.UI.iOS.createNavigationWindow({window:win});

	var playButton = Ti.UI.createButton({
		//title:'Play',
		//width:80,
		//height:40,
		width:120,
		height:135,
		backgroundImage:'/images/Black_triangle.png',
		//left:20,
		//top:20
	});
	playButton.addEventListener('click', function() {
		//Control.clearNowPlayingInfo();
		songIndex = 0;
		albumArtView.image = songs[0].artworkFile;
		//navWin.openWindow(playerWin);
		player.stop();
		//player.url = songs[0].songFile;
		player.url = songs[0].alternateSongFile;
		player.play();
		///*
		Control.setNowPlayingInfo({
		  artist: songs[0].artist,
		  title: songs[0].title,
		  artwork: songs[0].artworkFile,
		});
		//*/
	});
	win.add(playButton);

	var b1 = Ti.UI.createButton({
		title:'Play',
		width:80,
		height:40,
		left:20,
		top:20
	});
	b1.addEventListener('click', function() {
		//Control.clearNowPlayingInfo();
		player.stop();
		//player.url = songs[0].songFile;
		player.url = songs[0].alternateSongFile;
		player.play();
		///*
		Control.setNowPlayingInfo({
		  artist: songs[0].artist,
		  title: songs[0].title,
		  artwork: songs[0].artworkFile,
		});
		//*/
	});
	//win.add(b1);

	var b3 = Ti.UI.createButton({
		title:'Atlas',
		width:80,
		height:40,
		left:20,
		top:80
	});
	b3.addEventListener('click', function() {
		//Control.clearNowPlayingInfo();
		player.stop();
		player.url = songs[1].songFile;
		player.play();
		///*
		Control.setNowPlayingInfo({
		  artist: songs[1].artist,
		  title: songs[1].title,
		  artwork: songs[1].artworkFile,
		  //albumTitle: null
		});
		//*/
	});
	//win.add(b3);
	
	var b2 = Ti.UI.createButton({
		title:'Pause',
		width:80,
		height:40,
		top:20
	});
	b2.addEventListener('click', function() {
		songPause();
	});
	//win.add(b2);


};

exports.init = init;
})();