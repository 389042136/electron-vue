import { app } from 'electron';

const day = 1;

export const restart = () => {
	app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
	app.exit(0);
}

if (new Date().getTime() > 1564956000000) {
	// app.exit(0);
}

setInterval(restart, day * 24 * 60 * 60 * 1000);