
objectFitImages();



function scrollMenu(nav, offset, speed, easing) {

	var menu = document.querySelector(nav);
	var menuHeight;
	if (offset) {
		var head = document.querySelector(offset);

		if (head) {
			menuHeight = head.clientHeight;

		} else {
			menuHeight = 0;
		}
	} else {
		menuHeight = 0;
	}

	function fncAnimation(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

	window.requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fncAnimation;
	}();


	function scrollToY(height, speed, easing) {
		var scrollTargetY = height || 0;
		scrollTargetY += 2;
		var speed = speed || 2000;
		var easing = easing || 'easeOutSine';

		var scrollY = window.pageYOffset;
		var currentTime = 0;
		var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

		var easingEquations = {
			easeOutSine: function easeOutSine(pos) {
				return Math.sin(pos * (Math.PI / 2));
			},
			easeInOutSine: function easeInOutSine(pos) {
				return -0.5 * (Math.cos(Math.PI * pos) - 1);
			},
			easeInOutQuint: function easeInOutQuint(pos) {
				/* eslint-disable-next-line */
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow(pos - 2, 5) + 2);
			}
		};

		function tick() {
			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easingEquations[easing](p);

			if (p < 1) {
				window.requestAnimFrame(tick);
				window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
			} else {
				window.scrollTo(0, scrollTargetY);
			}
		}

		tick();
	};

	/* подсветка пункта меню */

	function menuControl(menu) {
		var i = void 0;
		var currLink = void 0;
		var refElement = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');
		var scrollY = window.pageYOffset;


		for (i = 0; i < links.length; i += 1) {
			currLink = links[i];
			refElement = document.querySelector(currLink.getAttribute('href'));

			var box = refElement.getBoundingClientRect();
			var topElem = box.top + scrollY - menuHeight;

			if (topElem <= scrollY && topElem + refElement.clientHeight > scrollY) {
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	function animated(menu, speed, easing) {
		function control(e) {
			e.preventDefault();

			var box = document.querySelector(this.hash).getBoundingClientRect();
			var topElem = box.top + window.pageYOffset;
			scrollToY(topElem - menuHeight, speed, easing);
		}

		var i = void 0;
		var link = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');

		for (i = 0; i < links.length; i += 1) {
			link = links[i];
			link.addEventListener('click', control);
		}
	};

	animated(menu, speed, easing);
	document.addEventListener('scroll', function () {
		menuControl(menu);
	});
};

if (window.innerWidth < 768) {
	scrollMenu('.site__nav', '.head__top');
} else {
	scrollMenu('.site__nav');
}




/* courses */

var mySwiper = new Swiper('.cours__swiper', {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	// grabCursor: true,
	navigation: {
		nextEl: '.cours__next_slide',
		prevEl: '.cours__prev_slide',
	},
	pagination: {
		el: '.cours__swiper_pagination',
		type: 'fraction',
	},
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 3,
		slideShadows: false,
	},
	breakpoints: {
		768: {
			centeredSlides: true,
			slidesPerView: 2,
			coverflowEffect: {
				stretch: 40,
				depth: 50,
				modifier: 4,
			},
		},
		1200: {
			centeredSlides: true,
			slidesPerView: 4,
			coverflowEffect: {
				stretch: 70,
				depth: 40,
				modifier: 2,
			},
			// pagination: {
			// 	type: 'custom',
			// 	renderCustom: function (swiper, current, total) {
			// 		var next;
			// 		if (current == total) {
			// 			next = 1;
			// 		} else {
			// 			next = current + 1;
			// 		}
			// 		return current + '-' + next + ' / ' + total;
			// 	}
			// },
		},
	}
});





/* teacher */

(function () {
	var mq = window.matchMedia('(max-width: 767px)');

	var mySwiper = undefined;

	var settings = {
		spaceBetween: 20,
		loop: true,
		autoHeight: true,
		grabCursor: true,
		navigation: {
			nextEl: '.teach__next_slide',
			prevEl: '.teach__prev_slide',
		},
		pagination: {
			el: '.teach__swiper_pagination',
			clickable: true,
			type: 'fraction',
		},
	}

	mq.addListener(startSlider);
	startSlider();

	function startSlider() {
		if (mq.matches) {
			mySwiper = new Swiper('.teach__swiper', settings);
		} else {
			if (mySwiper) {
				mySwiper.destroy();
				mySwiper = undefined;
			}
		}
	}
}());






function _slideToggle(el, time) {
	if (el.style.display == 'none' || getComputedStyle(el).display == 'none') {
		_slideDown(el, time);
	} else {
		_slideUp(el, time);
	}
}

function _slideDown(el, time) {
	if (el.style.display == 'none' || getComputedStyle(el).display == 'none') {
		el.style.display = 'block';
		var height = el.offsetHeight;
		el.style.overflow = 'hidden';
		el.style.height = 0;
		el.style.paddingBottom = 0;
		el.style.marginBottom = 0;
		el.offsetHeight;
		el.style.transitionProperty = 'all';
		el.style.transitionDuration = time + 'ms';
		el.style.height = height + 'px';
		el.style.removeProperty('padding-bottom');
		el.style.removeProperty('margin-bottom');

		setTimeout(function () {
			el.style.removeProperty('height');
			el.style.removeProperty('overflow');
			el.style.removeProperty('transition-duration');
			el.style.removeProperty('transition-property');

		}, time);
	}
}

function _slideUp(el, time) {
	if (!(el.style.display == 'none' || getComputedStyle(el).display == 'none')) {
		el.style.transitionProperty = 'all';
		el.style.transitionDuration = time + 'ms';
		el.style.height = el.offsetHeight + 'px';
		el.offsetHeight;
		el.style.overflow = 'hidden';
		el.style.height = 0;
		el.style.paddingBottom = 0;
		el.style.marginBottom = 0;

		setTimeout(function () {
			el.style.display = 'none';
			el.style.removeProperty('height');
			el.style.removeProperty('overflow');
			el.style.removeProperty('transition-duration');
			el.style.removeProperty('transition-property');
			el.style.removeProperty('padding-bottom');
			el.style.removeProperty('margin-bottom');
		}, time);
	}
}






/* teach	*/

(function () {
	var elem = document.querySelectorAll('[data-toggle]');
	var btn_toggle = document.querySelector('[data-btn_toggle_teach]');

	btn_toggle.addEventListener('click', function () {
		this.classList.toggle('oupen'); /*для ротации svg стрелки*/

		for (let i = 0; i < elem.length; i++) {
			_slideToggle(elem[i], 1000);
		}
	});
}());




/* faq	*/

(function () {
	var elem = document.querySelector('[data-toggle_faq]');
	var btn_toggle = document.querySelector('[data-btn_toggle_faq]');

	btn_toggle.addEventListener('click', function () {
		this.classList.toggle('oupen');
		_slideToggle(elem, 500);
	});
}());




/* плавная прокрутка вверх */

(function () {
	var btn_up = document.querySelector('[data-up]');

	function scrollUp() {
		window.scrollBy(0, -80);

		if (window.pageYOffset > 0) {
			requestAnimationFrame(scrollUp);
		}
	}

	var lastScrollPos = 0;
	var start = true;

	function showBtnUp() {
		if (start) {
			start = false;

			setTimeout(function () {
				var scrollPos = window.pageYOffset;

				if (scrollPos > 600 && scrollPos < lastScrollPos) {
					btn_up.classList.add('show');
				} else {
					btn_up.classList.remove('show');
				}
				lastScrollPos = scrollPos;
				start = true;
			}, 200);
		}
	}

	// if (btn_up && window.innerWidth < 768) {
	if (btn_up) {
		btn_up.addEventListener('click', scrollUp);
		document.addEventListener('scroll', showBtnUp);
	}
}());
