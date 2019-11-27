import { app, BrowserWindow, globalShortcut } from 'electron';
import { merge } from 'lodash';
import { exec } from 'child_process';

export default (config) => {
	let winURL = 'http://localhost:9080';
	let specialConfig = {};
	
	const isProd = process.env.NODE_ENV == 'production';
	if (isProd) {
		winURL = `file://${__dirname}/index.html`;
		specialConfig = {
			movable: false,
			// closable: false,
			fullscreen: true,
			alwaysOnTop: true,
		}
	}
	
	// Initial window options
	const winOptions = {
		width: 460,
		height: 880,
		useContentSize: true,
		kiosk: false,
		disableAutoHideCursor: true,
		frame: false,
		resizable: false,
		transparent: true,
		minimizable: false,
		ignoringCache: false,
		title: config.APP_NAME,
		webPreferences: {
			webSecurity: false,
			plugins: true,
			allowRunningInsecureContent: true,
			nodeIntegration: true,
			backgroundThrottling: false
		},
		...specialConfig
	};

	let mainWindow = new BrowserWindow(merge(winOptions, config));

	// 加载第三方页面
	mainWindow.loadURL(winURL);
	
	// 注销所有快捷键
	mainWindow.on('closed', () => {
		globalShortcut.unregisterAll();
		
		const allWindows = BrowserWindow.getAllWindows();
		allWindows.forEach(item => item.close());
		mainWindow = null;
		
		if (process.platform !== 'darwin') { 
			const appName = app.getName();
			exec(`taskkill /im ${appName}.exe /f`);
		}
	});
	
	return mainWindow;
};
