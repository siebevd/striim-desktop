//Custom scroll animator w/ easing support & requestAnimationFrame, who needs jQuery ^ ^
//Supports window (use 'window') and element (use document.querySelector(...)[0]) scrolling
//Want features? Use jQuery.

//properties:
// - Element: [required] The element you want the scroll to apply to. Use 'window' for window
// - To: [required] the offset (in px) to scroll to. Note that it will add this to the current position
// - Duration: [required] the duration (in ms) for the scrolling animation
// - Direction: [optional] (default: 'horizontal') The direction for the scrolling animation (horizontal | vertical)

export default function scrollTo(element, to, duration, direction) {
	if (animating || !element || to === undefined || !duration) {
		//stop when already triggered or missing args
		return false;
	}
	var _requestAnimationFrame = (function(win, t) {
			return (
				win["webkitR" + t] ||
				win["r" + t] ||
				win["mozR" + t] ||
				win["msR" + t] ||
				function(fn) {
					setTimeout(fn, 60);
				}
			);
		})(window, "requestAnimationFrame"),
		easeInOutCubic = function(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		}, //Or get your own: http://gizma.com/easing/
		end = +new Date() + duration,
		from = element === "window" ? window.pageXOffset : element.scrollLeft,
		animating = true;

	if (direction === "vertical") {
		from = element === "window" ? window.pageYOffset : element.scrollTop;
	}

	var step = function() {
		var current = +new Date(),
			remaining = end - current;

		if (remaining < 0) {
			animating = false;
		} else {
			var ease = easeInOutCubic(1 - remaining / duration);

			if (!direction || direction === "horizontal") {
				element === "window"
					? window.scrollTo(from + ease * (to - from), window.pageYOffset)
					: (element.scrollLeft = from + ease * (to - from));
			} else if (direction === "vertical") {
				element === "window"
					? window.scrollTo(window.pageXOffset, from + ease * (to - from))
					: (element.scrollTop = from + ease * (to - from));
			}
		}

		_requestAnimationFrame(step);
	};
	step();
}
