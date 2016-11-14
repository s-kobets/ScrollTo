window.onresize = scrollTo();

function scrollTo() {
	var anchors = [];
	var currentAnchor = 0;
	var isAnimating  = false;

	updateAnchors();
	// curentAnchorTo();

	function updateAnchors() {
		anchors = [];
		var elements = document.querySelectorAll('.anchor');
		Array.prototype.forEach.call(elements, function(el, i){
			anchors.push(el.getBoundingClientRect().top);
		});
		console.log(anchors);
	}

	function curentAnchorTo() {
		// reload curentAnchor
		var heightWindow = screen.height/2;
		var curentReload = window.pageYOffset || document.documentElement.scrollTop;;
		var index = 0;
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
	}
	
	// For Chrome
	window.addEventListener('mousewheel', blockScroll);

	// For Firefox
	window.addEventListener('DOMMouseScroll', blockScroll);

	function blockScroll(e){
		e.preventDefault();
		e.stopPropagation();

		curentAnchorTo();

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

		isAnimating  = true;

		console.log(delta, currentAnchor);
		window.scrollBy(0, parseInt(anchors[currentAnchor], 10));

		isAnimating  = false;
	};

	updateAnchors();
}
