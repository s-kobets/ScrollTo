var ScrollTo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ScrollTo = {
		name: '',
		anchors: [],
		currentAnchor: 0,
		isAnimating: false,
		init: function init(name) {
			if (name === undefined) {
				return;
			} else {
				this.name = name;
				this._updateAnchors();
				this._curentAnchorTo();
				this._eventScroll();
			}
		},

		_updateAnchors: function _updateAnchors() {
			var anchors = [];
			var elements = document.querySelectorAll(this.name);
			Array.prototype.forEach.call(elements, function (el, i) {
				anchors.push(el.offsetTop);
			});
			this.anchors = anchors;
		},

		_curentAnchorTo: function _curentAnchorTo() {
			// reload curentAnchor
			var anchors = this.anchors;
			var currentAnchor = this.currentAnchor;
			var heightWindow = screen.height / 2;
			var curentReload = window.pageYOffset;
			var index = 0;

			console.log(currentAnchor, anchors);
			if (curentReload > anchors[anchors.length - 1]) {
				curentReload = anchors[anchors.length - 1];
			}

			if (anchors.indexOf(curentReload) !== -1) {
				currentAnchor = anchors.indexOf(curentReload);
			} else {
				for (var i = 0; i < anchors.length; i++) {
					if (anchors[i] > curentReload && anchors[i - 1] < curentReload) {
						index = i;
					}
				}

				if (anchors[index] - curentReload > heightWindow) {
					currentAnchor = index - 1;
				} else {
					currentAnchor = index;
				}
			}
			this.currentAnchor = currentAnchor;
			console.log('при скроле скролом', currentAnchor, heightWindow, curentReload);
		},

		_blockScroll: function _blockScroll(e) {
			e.preventDefault();
			e.stopPropagation();

			var isAnimating = this.isAnimating;
			var currentAnchor = this.currentAnchor;
			var anchors = this.anchors;

			this._curentAnchorTo();
			console.log(isAnimating, 'текущий курент', currentAnchor, anchors);

			if (isAnimating) {
				return false;
			}

			isAnimating = true;
			// Increase or reset current anchor
			var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
			if (delta >= 0) {
				currentAnchor--;
			} else {
				currentAnchor++;
			}

			if (currentAnchor > anchors.length - 1) {
				currentAnchor = anchors.length - 1;
			} else if (currentAnchor < 0) {
				currentAnchor = 0;
			}
			console.log('к нему крутим', currentAnchor);

			var timePassed = window.pageYOffset;
			var finish = parseInt(anchors[currentAnchor], 10);

			console.log('start=', timePassed, finish);
			var timer = setInterval(function () {
				if (finish >= timePassed) {
					timePassed += 10;
					if (timePassed > finish) {
						clearInterval(timer);
						return;
					}
					window.scroll(0, timePassed);
				} else {
					timePassed -= 10;
					if (timePassed < finish) {
						clearInterval(timer);
						return;
					}
					window.scroll(0, timePassed);
				}
			}, 20);

			this.currentAnchor = currentAnchor;
			this.isAnimating = isAnimating = false;
		},

		_eventScroll: function _eventScroll() {
			// For Chrome
			window.addEventListener('mousewheel', ScrollTo._blockScroll.bind(ScrollTo));

			// For Firefox
			window.addEventListener('DOMMouseScroll', ScrollTo._blockScroll.bind(ScrollTo));

			window.addEventListener('resize', function () {
				ScrollTo._updateAnchors();
			});
		}
	};

	exports.default = ScrollTo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNDhhN2M3NTY0NjlmNWE4ODY3NSIsIndlYnBhY2s6Ly8vc3RhdGljX3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8iXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDQ4YTdjNzU2NDY5ZjVhODg2NzUiLCJjb25zdCBTY3JvbGxUbyA9IHtcblx0bmFtZTogJycsXG5cdGFuY2hvcnM6IFtdLFxuXHRjdXJyZW50QW5jaG9yOiAwLFxuXHRpc0FuaW1hdGluZzogZmFsc2UsXG5cdGluaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5fdXBkYXRlQW5jaG9ycygpO1xuXHRcdFx0dGhpcy5fY3VyZW50QW5jaG9yVG8oKTtcblx0XHRcdHRoaXMuX2V2ZW50U2Nyb2xsKCk7XG5cdFx0fVxuXHR9LFxuXG5cdF91cGRhdGVBbmNob3JzOiBmdW5jdGlvbiAoKSB7XG5cdFx0bGV0IGFuY2hvcnMgPSBbXTtcblx0XHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5uYW1lKTtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbihlbCwgaSl7XG5cdFx0XHRhbmNob3JzLnB1c2goZWwub2Zmc2V0VG9wKTtcblx0XHR9KTtcblx0XHR0aGlzLmFuY2hvcnMgPSBhbmNob3JzO1xuXHR9LFxuXG5cdF9jdXJlbnRBbmNob3JUbzogZnVuY3Rpb24gKCkge1xuXHRcdC8vIHJlbG9hZCBjdXJlbnRBbmNob3Jcblx0XHRsZXQgYW5jaG9ycyA9IHRoaXMuYW5jaG9ycztcblx0XHRsZXQgY3VycmVudEFuY2hvciA9IHRoaXMuY3VycmVudEFuY2hvcjtcblx0XHRsZXQgaGVpZ2h0V2luZG93ID0gc2NyZWVuLmhlaWdodC8yO1xuXHRcdGxldCBjdXJlbnRSZWxvYWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdFx0bGV0IGluZGV4ID0gMDtcblxuXHRcdGNvbnNvbGUubG9nKGN1cnJlbnRBbmNob3IsIGFuY2hvcnMpO1xuXHRcdGlmIChjdXJlbnRSZWxvYWQgPiBhbmNob3JzW2FuY2hvcnMubGVuZ3RoIC0gMV0pIHtcblx0XHRcdGN1cmVudFJlbG9hZCA9IGFuY2hvcnNbYW5jaG9ycy5sZW5ndGggLSAxXTtcblx0XHR9XG5cblx0XHRpZiAoYW5jaG9ycy5pbmRleE9mKGN1cmVudFJlbG9hZCkgIT09IC0xKSB7XG5cdFx0XHRjdXJyZW50QW5jaG9yID0gYW5jaG9ycy5pbmRleE9mKGN1cmVudFJlbG9hZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYW5jaG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoYW5jaG9yc1tpXSA+IGN1cmVudFJlbG9hZCAmJiBhbmNob3JzW2ktMV0gPCBjdXJlbnRSZWxvYWQpIHtcblx0XHRcdFx0XHRpbmRleCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKChhbmNob3JzW2luZGV4XSAtIGN1cmVudFJlbG9hZCkgPiBoZWlnaHRXaW5kb3cpIHtcblx0XHRcdFx0Y3VycmVudEFuY2hvciA9IGluZGV4IC0gMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRBbmNob3IgPSBpbmRleDtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5jdXJyZW50QW5jaG9yID0gY3VycmVudEFuY2hvcjtcblx0XHRjb25zb2xlLmxvZygn0L/RgNC4INGB0LrRgNC+0LvQtSDRgdC60YDQvtC70L7QvCcsIGN1cnJlbnRBbmNob3IsIGhlaWdodFdpbmRvdywgY3VyZW50UmVsb2FkKTtcblx0fSxcblxuXHRfYmxvY2tTY3JvbGw6IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRsZXQgaXNBbmltYXRpbmcgPSB0aGlzLmlzQW5pbWF0aW5nO1xuXHRcdGxldCBjdXJyZW50QW5jaG9yID0gdGhpcy5jdXJyZW50QW5jaG9yO1xuXHRcdGxldCBhbmNob3JzID0gdGhpcy5hbmNob3JzO1xuXG5cdFx0dGhpcy5fY3VyZW50QW5jaG9yVG8oKTtcblx0XHRjb25zb2xlLmxvZyhpc0FuaW1hdGluZywgJ9GC0LXQutGD0YnQuNC5INC60YPRgNC10L3RgicsIGN1cnJlbnRBbmNob3IsIGFuY2hvcnMpO1xuXG5cdFx0aWYgKGlzQW5pbWF0aW5nKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aXNBbmltYXRpbmcgID0gdHJ1ZTtcblx0XHQvLyBJbmNyZWFzZSBvciByZXNldCBjdXJyZW50IGFuY2hvclxuXHRcdHZhciBkZWx0YSA9IGUud2hlZWxEZWx0YSA/IGUud2hlZWxEZWx0YSA6IC1lLmRldGFpbDtcblx0XHRpZiAoZGVsdGEgPj0gMCkge1xuXHRcdFx0Y3VycmVudEFuY2hvci0tO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50QW5jaG9yKys7XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRBbmNob3IgPiAoYW5jaG9ycy5sZW5ndGggLSAxKSkge1xuXHRcdFx0Y3VycmVudEFuY2hvciA9IGFuY2hvcnMubGVuZ3RoIC0gMTtcblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRBbmNob3IgPCAwICkge1xuXHRcdFx0Y3VycmVudEFuY2hvciA9IDA7XG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKCfQuiDQvdC10LzRgyDQutGA0YPRgtC40LwnLCBjdXJyZW50QW5jaG9yKTtcblxuXHRcdHZhciB0aW1lUGFzc2VkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdHZhciBmaW5pc2ggPSBwYXJzZUludChhbmNob3JzW2N1cnJlbnRBbmNob3JdLCAxMCk7XG5cblx0XHRjb25zb2xlLmxvZygnc3RhcnQ9JywgdGltZVBhc3NlZCwgZmluaXNoKTtcblx0XHRsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGZpbmlzaCA+PSB0aW1lUGFzc2VkKSB7XG5cdFx0XHRcdHRpbWVQYXNzZWQgKz0gMTA7XG5cdFx0XHRcdGlmICh0aW1lUGFzc2VkID4gZmluaXNoKSB7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdCAgICBcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0d2luZG93LnNjcm9sbCgwLCB0aW1lUGFzc2VkKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGltZVBhc3NlZCAtPSAxMDtcblx0XHRcdFx0aWYgKHRpbWVQYXNzZWQgPCBmaW5pc2gpIHtcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcblx0ICAgIFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsKDAsIHRpbWVQYXNzZWQpO1xuXHRcdFx0fVxuXHRcdH0sIDIwKTtcblxuXHRcdHRoaXMuY3VycmVudEFuY2hvciA9IGN1cnJlbnRBbmNob3I7XG5cdFx0dGhpcy5pc0FuaW1hdGluZyA9IGlzQW5pbWF0aW5nID0gZmFsc2U7XG5cdH0sXG5cblx0X2V2ZW50U2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRm9yIENocm9tZVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgU2Nyb2xsVG8uX2Jsb2NrU2Nyb2xsLmJpbmQoU2Nyb2xsVG8pKTtcblxuXHRcdC8vIEZvciBGaXJlZm94XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgU2Nyb2xsVG8uX2Jsb2NrU2Nyb2xsLmJpbmQoU2Nyb2xsVG8pKTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRTY3JvbGxUby5fdXBkYXRlQW5jaG9ycygpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxUbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzdGF0aWNfc3JjL2pzL21haW4uanMiLCJ1bmRlZmluZWRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FEQ0E7QUFDQTtBQUNBO0FBQ0E7QUNDQTtBQUNBO0FBQ0E7QUE3SEE7QUFDQTtBQStIQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=