import { app, ipcMain } from 'electron';
import envjs from 'loadenvjs';
import path from 'path';
import createWindow from './createWindow.js';
import autoUpdater from './autoUpdater.js';
import { restart } from "./restart.js";
import startOtherApp from './startOtherApp.js';

// 全局变量
global.sharedObject = {
	__static: 'static',
	formerWindiwId: ''
};

if (app.isPackaged) {
	global.sharedObject.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
}

startOtherApp();

// 添加命令行参数
app.commandLine.appendSwitch("--disable-http-cache");

// 获取配置
const config = envjs({
	mount: false,
	path: app.getPath('desktop') + '/FIDSFaceConfig.js'
});
ipcMain.on('getConfig', event => event.returnValue = config);

// 重启
ipcMain.on('restart', () => restart());

// APP准备就绪
app.on('ready', () => {
	createWindow(config);
	app.isPackaged && config.APP_URL && autoUpdater(config.APP_URL);
});
