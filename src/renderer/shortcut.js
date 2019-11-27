const { getCurrentWindow, globalShortcut } = require('electron').remote;
const mainWindow = getCurrentWindow();

export default (contentWindow) => {
	// F12打开控制台
	const toggleDevTools = () => mainWindow.webContents.toggleDevTools();
	globalShortcut.register('F12', toggleDevTools);
	globalShortcut.register('Ctrl+F12', toggleDevTools);
	
	// F11全屏
	let isFullScreen = false;
	globalShortcut.register('F11', () => {
		mainWindow.setFullScreen(!isFullScreen);
		isFullScreen = !isFullScreen;
	});
	
	// F5刷新
	globalShortcut.register('F5', () => {
		globalShortcut.unregisterAll();
		mainWindow.reload();
		// contentWindow.location.reload(true);
	});
}



