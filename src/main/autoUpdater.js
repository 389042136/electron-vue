import log from './log.js';
import { autoUpdater } from "electron-updater";

export default (updateURL) => {
	const autoUpdaterTime = 0.5; // 单位：h
	
	const message = {
		error: '更新异常',
		checking: '正在检查应用程序更新',
		updateAva: '检测到新版本,正在下载,请稍后...',
		updateNotAva: '您现在使用的版本为最新版本,无需更新!',
	};
	
	autoUpdater.setFeedURL(updateURL + '/app-download');
	
	// 更新错误
	autoUpdater.on('error', (error) => log.error(error));
	
	// 当前版本为最新版本
	autoUpdater.on('update-not-available', () => log.info(message.updateNotAva));
	
	// 发现新版本
	// autoUpdater.on('checking-for-update', () => log.info(message.checking));
	
	// 下载中
	autoUpdater.on('update-available', () => log.info(message.updateAva));
	
	// 更新进度
	autoUpdater.on('download-progress', ({ percent }) => log.info(`当前更新进度为：${parseInt(percent)}%`));
	
	// 下载完成
	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
		log.info('下载完成,正在重启,请稍后...');
		autoUpdater.quitAndInstall();
	});
	
	// 定时执行更新检查
	autoUpdater.checkForUpdates();
	setInterval(() => autoUpdater.checkForUpdates(), autoUpdaterTime * 60 * 60 * 1000);
}

