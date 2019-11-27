<template>
	<div id="app">
		<iframe :src="src" frameborder="0" id="iframe" v-show="src"></iframe>
	</div>
</template>

<script>
	import { MessageBox } from 'element-ui';
	import shortcut from './shortcut.js';
	import rtspStream from './rtspStream.js';
	import createConfigFile from './createConfigFile.js';
	
	export default {
		data() {
			return {
				src: this.$config.APP_URL,
				iframeIsLoad: false,
			}
		},
		methods: {
			init() {
				if (this.src) { 
					const iframe = document.getElementById('iframe');
					iframe.onload = () => this.iframeOnloadCallback(iframe.contentWindow);
				} else {
					this.inputURL();
				}
			},
			
			inputURL() {
				MessageBox.prompt('', '请输入服务器IP：', {
					showClose: false,
					showCancelButton: false,
					closeOnClickModal: false,
					closeOnPressEscape: false,
					inputPattern: /\S/,
					inputErrorMessage: '请输入服务器IP'
				}).then(({ value }) => {
					this.src = 'http://' + value;
					createConfigFile(value);
					this.init();
				});
			},
			
			/**
			 * iframe加载完成后，获取页面相关元素
			 * @param {Object} contentWindow
			 */
			iframeOnloadCallback(contentWindow) {
				shortcut(contentWindow);
				rtspStream(contentWindow.document.getElementById('rtsp-stream-video'));
			},
		},
		mounted() {
			this.init();
		},
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	
	#app {
		cursor: none;
		width: 100vw;
		height: 100vh;
		user-select: none;
		overflow: hidden;
	}

	iframe {
		width: 100vw;
		height: 100vh;
	}
</style>
