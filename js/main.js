/*	*/
objectFitImages(); //IE polyfill


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

if(window.innerWidth < 768) {
	scrollMenu('.site__nav', '.head__nav'); 
}else {
	scrollMenu('.site__nav'); 
}


/* courses */

var mySwiper = new Swiper('.cours__swiper', {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	grabCursor: true,
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
		depth: 50,
		modifier: 20,
		slideShadows: false,
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			pagination: {
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					var next;
					if (current == total) {
						next = 1;
					} else {
						next = current + 1;
					}
					return current + '-' + next + ' / ' + total;
				}
			},
		},
	}
});


/* teacher */

if (window.innerWidth < 768) {
	var mySwiper = new Swiper('.teach__swiper', {
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
	});
}


/*автовысота для textarea 
 var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}*/


/*фокус с клавиатуры на метку для Firefox
 var input = document.getElementById('input_file');      

input.addEventListener('focus', function(){ 
	input.classList.add( 'has-focus' ); 
});
input.addEventListener('blur', function(){ 
	input.classList.remove( 'has-focus' ); 
});*/


/*выбрано файлов input_file кол-во
document.getElementById('input_file').onchange = function(e) {
	var file_name = document.getElementById ('file-name'),
	    files = this.files;
	
	if(files.length == 1) {
			file_name.innerHTML = 'Имя файла: ' + files[0].name;
		} else {
			file_name.innerHTML = 'Выбрано ' + files.length + ' Файла(ов)';
		}
}		*/

/*
document.querySelector(".btn__more").onclick = function() {
  document.querySelector(".droplist").classList.toggle('hidden');
}*/




function slideToggle() {
	slideUp.call(this);
	slideDown.call(this);
}

function slideDown() {
	if ((this.style.display == 'none') || (getComputedStyle(this).display == 'none')) {
		this.style.overflow = 'hidden';
		this.style.display = 'block';
		var height = this.offsetHeight;
		this.style.height = '0px';
		setTimeout(function (elem) {
			elem.style.height = height + 'px';
		}, 20, this);
		setTimeout(function (elem) {
			elem.style.height = '';
		}, 1040, this);
	}
}

function slideUp() {
	if (!((this.style.display == 'none') || (getComputedStyle(this).display == 'none'))) {
		this.style.overflow = 'hidden';
		var height = this.offsetHeight;
		this.style.height = height + 'px';
		setTimeout(function (elem) {
			elem.style.height = '0px';
		}, 20, this);
		setTimeout(function (elem) {
			elem.style.display = 'none';
			elem.style.height = '';
		}, 1040, this);
	}
}


/* teach	*/

(function () {
	var elem = document.querySelectorAll('[data-toggle]');
	var btn_toggle = document.querySelector('[data-btn_toggle_teach]');

	btn_toggle.addEventListener('click', function () {
		this.classList.toggle('oupen'); /*для ротации svg стрелки*/

		for (let i = 0; i < elem.length; i++) {
			slideToggle.call(elem[i]);
		}
	});
}());



/* faq	*/

(function () {
	var elem = document.querySelector('[data-toggle_faq]');
	var btn_toggle = document.querySelector('[data-btn_toggle_faq]');

	btn_toggle.addEventListener('click', function () {
		this.classList.toggle('oupen');
		slideToggle.call(elem);
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

	function showBtnUp() {
		var scrollPos = window.pageYOffset;

		if (scrollPos > 600 && scrollPos < lastScrollPos) {
			btn_up.classList.add('show');
		} else {
			btn_up.classList.remove('show');
		}

		lastScrollPos = scrollPos;
	}

	btn_up.addEventListener('click', scrollUp);

	document.addEventListener('scroll', showBtnUp);

	if (window.innerWidth > 767) {
		document.removeEventListener('scroll', showBtnUp);
	}
}());


/*при клике добавить класс this*/

// document.querySelector('.select-css').onclick = function () {

// 	if (this.classList.contains('oupen')) {
// 		this.classList.remove('oupen');

// 	} else {
// 		this.classList.add('oupen');
// 	}
// };