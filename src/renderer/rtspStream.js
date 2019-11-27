const Stream = require('node-rtsp-stream');
import rtspStream from './jsmpeg.js';

let videoStream;
export default (rtspStreamVideo) => {
	if (!rtspStreamVideo) {
		return;
	}
	
	const wsPort = 6680;
	const streamUrl = rtspStreamVideo.dataset.url;
	
	// server
	videoStream && videoStream.stop();
	videoStream = new Stream({
		name: 'name',
		wsPort,
		streamUrl,
		ffmpegOptions: { // options ffmpeg flags
			'-stats': '', // an option with no neccessary value uses a blank string
			'-r': 30 // options with required values specify the value after the key
		}
	});
	
	// client
	rtspStream(rtspStreamVideo, wsPort);
}
