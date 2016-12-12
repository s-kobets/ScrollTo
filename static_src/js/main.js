const ScrollTo = {
	name: '',
	anchors: [],
	currentAnchor: 0,
	isAnimating: false,
	init: function (name) {
		if (name === undefined) {
			return;
		} else {
			this.name = name;
			this._updateAnchors();
			this._curentAnchorTo();
			this._eventScroll();
			this._eventTouch();
		}
	},

	_updateAnchors: function () {
		let anchors = [];
		const elements = document.querySelectorAll(this.name);
		Array.prototype.forEach.call(elements, function(el, i){
			anchors.push(el.offsetTop);
		});
		this.anchors = anchors;
	},

	_curentAnchorTo: function () {
		// reload curentAnchor
		let anchors = this.anchors;
		let currentAnchor = this.currentAnchor;
		let heightWindow = screen.height/2;
		let curentReload = window.pageYOffset;
		let index = 0;

		console.log(currentAnchor, anchors);
		if (curentReload > anchors[anchors.length - 1]) {
			curentReload = anchors[anchors.length - 1];
		}

		if (anchors.indexOf(curentReload) !== -1) {
			currentAnchor = anchors.indexOf(curentReload);
		} else {
			for (let i = 0; i < anchors.length; i++) {
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
		console.log(e);
		e.preventDefault();
		e.stopPropagation();

		let isAnimating = this.isAnimating;
		let currentAnchor = this.currentAnchor;
		let anchors = this.anchors;

		this._curentAnchorTo();
		console.log(isAnimating, 'текущий курент', currentAnchor, anchors);

		if (isAnimating) {
			return false;
		}

		isAnimating  = true;
		// Increase or reset current anchor
		let delta = e.wheelDelta ? e.wheelDelta : -e.detail;
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
		let timer = setInterval( function () {
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

	_eventScroll: function () {
		// For Chrome
		window.addEventListener('mousewheel', function (e) {
			console.log('mousewheel', ScrollTo._blockScroll);
			ScrollTo._blockScroll(e);
		}, false);

		// For Firefox
		// document.addEventListener('DOMMouseScroll', ScrollTo._blockScroll.bind(ScrollTo));

		window.addEventListener('resize', function () {
			ScrollTo._updateAnchors();
		});
	},

	_eventTouch: function () {
		let initialPoint;
		let finalPoint;
		document.addEventListener('touchstart', function (e) {
			alert('touchstart');
			e.preventDefault();
			e.stopPropagation();
			initialPoint = e.changedTouches[0];
		}, false);

		document.addEventListener('touchend', function (e) {
			alert('touchend');
			e.preventDefault();
			e.stopPropagation();
			finalPoint = e.changedTouches[0];
			let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
			let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
			if (xAbs > 20 || yAbs > 20) {
				if (xAbs > yAbs) {
					if (finalPoint.pageX < initialPoint.pageX){
						/*СВАЙП ВЛЕВО*/
					} else{
						/*СВАЙП ВПРАВО*/}
				} else {
					if (finalPoint.pageY < initialPoint.pageY){
						/*СВАЙП ВВЕРХ*/
						ScrollTo._blockScroll.bind(ScrollTo);
						alert('вверх');
					} else {
						/*СВАЙП ВНИЗ*/
						ScrollTo._blockScroll.bind(ScrollTo);
						alert('вниз');
					}
				}
			}
		}, false);
	}
};

export default ScrollTo;
