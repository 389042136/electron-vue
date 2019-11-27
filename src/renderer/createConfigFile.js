import autoUpdater from '../main/autoUpdater.js';
const fs = require("fs");
const { app } = require('electron').remote;
const configPath = app.getPath('desktop');

export default (value) => {
	const config = `return {
		// 应用名字
		APP_NAME: '智慧航显',

		// 应用地址
		APP_URL: 'http://${value}',

		// movable: true,
		// fullscreen: false,
		// alwaysOnTop: false,
	}`;
	
	fs.writeFileSync(`${configPath}/FIDSFaceConfig.js`, config);
	app.isPackaged && autoUpdater(`http://${value}`);
}
