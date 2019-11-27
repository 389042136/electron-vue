import cpx from 'cpx';
import { app } from 'electron';
import { uniq } from 'lodash';
import { exec } from 'child_process';
import { restart } from "./restart.js";
const fs = require("fs");

export default () => {
	const path = 'C:/ffmpeg';
	const separator = ';';
	
	// const value = fs.readFileSync(global.sharedObject.__static + '/test.txt', 'utf8');
	if (process.platform !== 'darwin') { 
		if (!fs.existsSync(path + '/ffmpeg.exe')) {
			cpx.copySync(global.sharedObject.__static + '/ffmpeg.exe', path);
		}
		
		let envPathArr = uniq(process.env['PATH'].split(separator));
		if (!envPathArr.includes(path)) {
			envPathArr.push(path);
			
			const appName = app.getName();
			const appPath = app.getPath('exe');
			const newEnvPath = envPathArr.join(separator);
			const script = `setx PATH "${newEnvPath}" && taskkill /im ${appName}.exe /f`;
			exec(script);
		} 
	}
}