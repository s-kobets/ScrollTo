(function () {

	var ScrollTo = {
		anchors: [],
		currentAnchor: 0,
		isAnimating: false,
		_init: function () {
			console.log(this);
			this._updateAnchors();
			this._curentAnchorTo();
		},

		_updateAnchors: function () {
			var anchors = [];
			var elements = document.querySelectorAll('.anchor');
			Array.prototype.forEach.call(elements, function(el, i){
				anchors.push(el.offsetTop);
			});
			this.anchors = anchors;
		},

		_curentAnchorTo: function () {
			// reload curentAnchor
			var anchors = this.anchors;
			var currentAnchor = this.currentAnchor;
			var heightWindow = screen.height/2;
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
					if (anchors[i] > curentReload && anchors[i-1] < curentReload) {
						index = i;
					}
				}

				if ((anchors[index] - curentReload) > heightWindow) {
					currentAnchor = index - 1;
				} else {
					currentAnchor = index;
				}
			}
			this.currentAnchor = currentAnchor;
			console.log('при скроле скролом', currentAnchor, heightWindow, curentReload);
		},

		_blockScroll: function (e) {
			e.preventDefault();
			e.stopPropagation();

			isAnimating = this.isAnimating;
			currentAnchor = this.currentAnchor;
			anchors = this.anchors;

			this._curentAnchorTo();
			console.log(isAnimating, 'текущий курент', currentAnchor, anchors);

			if (isAnimating) {
				return false;
			}

			isAnimating  = true;
			// Increase or reset current anchor
			var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
			if (delta >= 0) {
				currentAnchor--;
			} else {
				currentAnchor++;
			}

			if (currentAnchor > (anchors.length - 1)) {
				currentAnchor = anchors.length - 1;
			} else if (currentAnchor < 0 ) {
				currentAnchor = 0;
			}
			console.log('к нему крутим', currentAnchor);

			var timePassed = window.pageYOffset;
			var finish = parseInt(anchors[currentAnchor], 10);

			console.log('start=', timePassed, finish);
			var timer = setInterval( function () {
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

			this.isAnimating = isAnimating = false;
		}
	};

	ScrollTo._init();

		// For Chrome
	window.addEventListener('mousewheel', ScrollTo._blockScroll.bind(ScrollTo));

	// For Firefox
	window.addEventListener('DOMMouseScroll', ScrollTo._blockScroll.bind(ScrollTo));

	window.addEventListener('resize', function () {
		ScrollTo._updateAnchors();
	});


})();
