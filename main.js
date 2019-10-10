const {BrowserWindow, app} = require('electron');
const windowStateKeeper = require('electron-window-state');
const Store = require('./source/scripts/store')
const path = require('path');
const fs = require('fs');

let mainWindow;


const store = new Store({
    configName: 'AppConfigs',
    defaults:{
        windowBounds:{ width: 1000, Height: 800}
    }
})


function createWindow(){
    let winState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

   

    let{width, height} = store.get('windowBounds');
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 300,
        minHeight: 400,
        x: winState.x,
        y: winState.y,
        webPreferences:{
            nodeIntegration: true,
            webviewTag: true, //allows the use of webviews
            partition: 'SystemCheck'
        }
    });

    winState.manage(mainWindow);
     //Uncomment this for release ----------------------------------------
    //mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('source/index.html');

    mainWindow.on('resize',()=>{
        let{width, height} = mainWindow.getBounds();
        //store.set('windowBounds',{width,height});
    });



mainWindow.on('closed', ()=>{
    mainWindow = null;
})
}
app.on('before-quit', e=>{
    console.app("preventing app from quitting.")
    e.preventDefault();
    storeUserdata();
    app.quit();
});

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin') app.quit()
});
app.on('activate', () =>{
    if(mainWindow === null) createWindow();
})