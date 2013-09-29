// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
Ti.App.idleTimerDisabled = true;

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var player = require('/player');
player.init(win1);
win1.open();




//
//  add tabs
//
//tabGroup.addTab(tab1);  


// open tab group
//tabGroup.open();
