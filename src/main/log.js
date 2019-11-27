// 日志存放位置
// linux: ~/.config/<app name>/log.log
// mac: ~/Library/Logs/<app name>/log.log
// windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log

import log from 'electron-log';

log.transports.console.level = false;
log.transports.file.level = 'silly';

export default log;