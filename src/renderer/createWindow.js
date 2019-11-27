const path = require('path');
const { BrowserWindow, getCurrentWindow, globalShortcut } = require('electron').remote;
const allWindows = BrowserWindow.getAllWindows();

if (allWindows.length > 1) allWindows[0].close();

export default ({ width, height }) => {
	let backWindow = new BrowserWindow({
		width, 
		height,
		useContentSize: true,
		show: false,
		webPreferences: {
			webSecurity: false,
			backgroundThrottling: false
		}
	});
	
	const mainWindowID = getCurrentWindow().id;
	const detectionFacePath = path.join(__static, '/detection-face/detectionFace.html');
	backWindow.loadFile(detectionFacePath);
	
	backWindow.webContents.on('did-finish-load', () => backWindow.webContents.send('initFaceComponent', mainWindowID));
	backWindow.on('closed', () => backWindow = null);
	
	globalShortcut.register('F1', () => backWindow.webContents.toggleDevTools());
	
	return backWindow;
}
