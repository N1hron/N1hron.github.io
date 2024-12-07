/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/DiffList.js":
/*!************************************!*\
  !*** ./src/js/modules/DiffList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ diffList)
/* harmony export */ });
class diffList {
  constructor(_ref) {
    let {
      listSelector,
      listItemSelector = '.officer__card-item:not(.officer__card-item:last-child)',
      showMoreBtnSelector = '.officer__card-item:last-child'
    } = _ref;
    this.list = document.querySelector(listSelector);
    this.listItems = this.list.querySelectorAll(listItemSelector);
    this.showMoreBtn = this.list.querySelector(showMoreBtnSelector);
    this.numberOfItems = this.listItems.length;
    this.numberOfVisibleItems = 0;
  }
  updateList() {
    for (let i = 0; i < this.numberOfVisibleItems; i++) {
      this.listItems[i].style.display = '';
      this.listItems[i].classList.add('animated', 'fadeIn');
    }
    if (this.numberOfVisibleItems === this.numberOfItems) {
      this.showMoreBtn.classList.add('animated', 'fadeOut');
      this.showMoreBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        this.showMoreBtn.remove();
      }, getComputedStyle(this.showMoreBtn).animationDuration.slice(0, -1) * 1000);
    }
  }
  showMore() {
    this.numberOfVisibleItems++;
    this.updateList();
  }
  init() {
    this.listItems.forEach(item => item.style.display = 'none');
    this.showMoreBtn.addEventListener('click', () => this.showMore());
    this.updateList();
  }
}

/***/ }),

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  constructor(triggerSelector, panelSelector) {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.panels = document.querySelectorAll(panelSelector);
  }
  onTriggerClick(index) {
    const height = this.panels[index].scrollHeight + 'px';
    this.panels[index].style.maxHeight = this.panels[index].style.maxHeight === '0px' ? height : '0px';
  }
  bindTriggers() {
    this.triggers.forEach((trigger, i) => {
      trigger.addEventListener('click', () => this.onTriggerClick(i));
    });
  }
  init() {
    this.panels.forEach(panel => {
      panel.style.display = 'block';
      panel.style.overflow = 'hidden';
      panel.style.transition = 'max-height 0.5s';
      panel.style.maxHeight = '0px';
    });
    this.bindTriggers();
  }
}

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggerSelector, path) {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.path = path;
  }
  download() {
    let path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.path;
    const a = document.createElement('a');
    a.setAttribute('href', path);
    a.setAttribute('download', '');
    a.click();
  }
  bindTriggers() {
    this.triggers.forEach(trigger => trigger.addEventListener('click', () => this.download()));
  }
  init() {
    this.bindTriggers();
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(formSelector, url) {
    this.form = document.querySelector(formSelector);
    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.message = document.createElement('div');
    this.url = url;
    this.allowSubmit = true;
  }
  async sendFormData() {
    const formData = new FormData(this.form);
    this.message.className = 'form__message animated fadeIn';
    this.submitBtn.after(this.message);
    this.message.textContent = 'Loading...';
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Could not send form data, status: ' + response.status + ` (${response.statusText})`);
      const txt = await response.text();
      console.log(txt);
      this.message.classList.add('form__message_success');
      this.message.textContent = 'We will contact you soon!';
      this.form.reset();
    } catch (error) {
      console.error(error);
      this.message.classList.add('form__message_error');
      this.message.textContent = 'Something went wrong...';
    } finally {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.message.classList.add('fadeOut');
        setTimeout(() => {
          this.message.remove();
          this.allowSubmit = true;
        }, getComputedStyle(this.message).animationDuration.replace('s', '') * 1000);
      }, 5000);
    }
  }
  enableEmailValidation() {
    this.form.querySelector('[type="email"]').addEventListener('input', function () {
      this.value = this.value.replace(/[а-яё]/ig, '');
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.allowSubmit) {
      this.allowSubmit = false;
      this.sendFormData();
    }
  }
  init() {
    this.form.addEventListener('submit', event => this.onSubmit(event));
    this.enableEmailValidation();
  }
}

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mask)
/* harmony export */ });
class Mask {
  constructor(inputSelector) {
    let mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+1 (___) ___-____';
    this.inputs = document.querySelectorAll(inputSelector);
    this.mask = mask;
    this.defaultValue = mask.replace(/\D/g, '');
  }
  bindInputs() {
    this.inputs.forEach(input => {
      ['focus', 'input', 'blur'].forEach(eventType => input.addEventListener(eventType, event => this.createMask(event)));
      input.addEventListener('click', () => input.selectionStart = input.value.length);
    });
  }
  createMask(event) {
    this.currentValue = event.target.value.replace(/\D/g, '').slice(0, 11);
    if (event.type === 'blur') {
      if (this.currentValue === this.defaultValue) event.target.value = '';
    } else {
      if (!this.currentValue) this.currentValue = this.defaultValue;
      event.target.value = this.setMaskedValue();
    }
  }
  setMaskedValue() {
    let valueOffset = 0;
    return this.mask.replace(/./g, match => {
      return /[_\d]/.test(match) && valueOffset < this.currentValue.length ? this.currentValue[valueOffset++] : valueOffset >= this.currentValue.length ? '' : match;
    });
  }
  init() {
    this.bindInputs();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/mainSlider.js":
/*!*********************************************!*\
  !*** ./src/js/modules/slider/mainSlider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(_ref) {
    let {
      popupSelector,
      popupSlide,
      ...rest
    } = _ref;
    super(rest);
    this.popup = document.querySelector(popupSelector);
    this.popupSlide = popupSlide;
  }
  updateSlider() {
    this.slider.style.top = `-${(this.currentSlide - 1) * 100}vh`;
    if (this.popup) {
      if (this.currentSlide === this.popupSlide) this.showPopupAfter(3000);else clearTimeout(this.timeoutId);
    }
  }
  showPopupAfter(time) {
    if (this.popup.style.transform !== 'translateY(0px)') {
      this.timeoutId = setTimeout(() => {
        this.popup.style.transform = 'translateY(0)';
      }, time);
    }
  }
  init() {
    super.init();
    this.slider.style.position = 'relative';
    this.slider.style.transition = 'top 0.5s';
    this.slider.style.top = `-0vh`;
    if (this.popup) {
      this.popup.style.transform = 'translateY(100%)';
      this.popup.style.transition = 'transform 0.5s';
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/miniSlider.js":
/*!*********************************************!*\
  !*** ./src/js/modules/slider/miniSlider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  updateSlider() {
    this.setActiveClass();
  }
  nextSlide() {
    this.slides[this.numberOfSlides - 1].after(this.slides[0]);
    super.nextSlide();
  }
  prevSlide() {
    this.slides[0].before(this.slides[this.numberOfSlides - 1]);
    super.prevSlide();
  }
  setActiveClass() {
    ;
    [...this.slides].forEach((slide, i) => {
      i === 0 ? slide.classList.add(this.activeClass) : slide.classList.remove(this.activeClass);
    });
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor(_ref) {
    let {
      sliderSelector,
      slideClassName,
      nextBtnSelector,
      prevBtnSelector,
      resetBtnSelector,
      activeClass,
      auto = false,
      interval = 5000
    } = _ref;
    this.slider = document.querySelector(sliderSelector);
    this.slides = slideClassName ? this.slider.getElementsByClassName(slideClassName) : this.slider.children;
    this.nextBtns = document.querySelectorAll(nextBtnSelector);
    this.prevBtns = document.querySelectorAll(prevBtnSelector);
    this.resetBtns = document.querySelectorAll(resetBtnSelector);
    this.activeClass = activeClass;
    this.numberOfSlides = this.slides.length;
    this.__currentSlide = 1;
    this.auto = auto;
    this.interval = interval;
    this.isVisible = false;
    this.intervalId = null;
  }
  set currentSlide(value) {
    if (value > this.currentSlide) this.__currentSlide = value > this.numberOfSlides ? 1 : value;else this.__currentSlide = value < 1 ? this.numberOfSlides : value;
  }
  get currentSlide() {
    return this.__currentSlide;
  }
  nextSlide() {
    this.currentSlide++;
    if (this.updateSlider) this.updateSlider();
  }
  prevSlide() {
    this.currentSlide = --this.currentSlide < 1 ? this.numberOfSlides : this.currentSlide--;
    if (this.updateSlider) this.updateSlider();
  }
  resetSlider() {
    this.currentSlide = 1;
    if (this.updateSlider) this.updateSlider();
  }
  setupAutoSlideshow() {
    clearInterval(this.intervalId);
    if (this.auto && this.isVisible) this.intervalId = setInterval(() => this.nextSlide(), this.interval);
  }
  setIsVisible() {
    const rect = this.slider.getBoundingClientRect(),
      clientHeight = document.documentElement.clientHeight,
      sliderHeight = this.slider.clientHeight;
    this.isVisible = rect.top < clientHeight && rect.top > -sliderHeight;
  }
  setUpObserver() {
    const target = document.querySelector('.page'),
      config = {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['style']
      };
    const observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        const oldTop = mutation.oldValue ? mutation.oldValue.split(';').find(element => element.includes('top:')) : null;
        const currentTopValue = mutation.target.style.top,
          oldTopValue = oldTop ? oldTop.trim().split(' ')[1] : null;
        if (oldTopValue && oldTopValue !== currentTopValue) {
          setTimeout(() => {
            this.setIsVisible();
            this.setupAutoSlideshow();
          }, getComputedStyle(target).transitionDuration.replace('s', '') * 1000);
        }
      }
    });
    observer.observe(target, config);
  }
  bindBtns() {
    this.nextBtns.forEach(btn => btn.addEventListener('click', () => {
      this.nextSlide();
      this.setupAutoSlideshow();
    }));
    this.prevBtns.forEach(btn => btn.addEventListener('click', () => {
      this.prevSlide();
      this.setupAutoSlideshow();
    }));
    this.resetBtns.forEach(btn => btn.addEventListener('click', () => {
      this.resetSlider();
      this.setupAutoSlideshow();
    }));
  }
  init() {
    this.setIsVisible();
    this.bindBtns();
    if (this.auto) {
      this.setupAutoSlideshow();
      this.setUpObserver();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/videoPlayer.js":
/*!***************************************!*\
  !*** ./src/js/modules/videoPlayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(_ref) {
    let {
      playBtnSelector,
      closeBtnSelector = '.overlay .close',
      overlaySelector = '.overlay',
      moduleClass
    } = _ref;
    this.playBtns = document.querySelectorAll(playBtnSelector);
    this.closeBtn = document.querySelector(closeBtnSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.videoId = null;
    this.player = null;
    this.done = false;
    this.moduleClass = moduleClass;
  }
  openPlayer(id) {
    if (this.videoId !== id) {
      this.videoId = id;
      if (!this.player) this.createPlayer();else this.loadVideoById();
    }
    this.overlay.style.display = 'flex';
    this.overlay.classList.remove('fadeOut');
    this.overlay.classList.add('fadeIn');
  }
  closePlayer() {
    this.pauseVideo();
    this.overlay.classList.remove('fadeIn');
    this.overlay.classList.add('fadeOut');
    setTimeout(() => this.overlay.style.display = '', this.overlay.style.animationDuration.replace('s', '') * 1000);
  }
  createPlayer() {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        'autoplay': 0
      },
      events: {
        'onStateChange': () => this.onPlayerStateChange()
      }
    });
  }
  pauseVideo() {
    this.player.pauseVideo();
  }
  stopVideo() {
    this.player.stopVideo();
  }
  loadVideoById() {
    this.player.loadVideoById(this.videoId);
    this.stopVideo();
  }
  onPlayerStateChange() {
    const duration = this.player.getDuration(),
      currentTime = this.player.getCurrentTime();
    if (currentTime >= duration / 2 && duration !== 0) this.unlockNextModuleIfPossible();
  }
  unlockNextModuleIfPossible() {
    const nextModule = this.currentModule.nextElementSibling;
    if (nextModule && nextModule.classList.contains(this.moduleClass) && nextModule.querySelector('.closed')) {
      const nextModuleOpenBtn = this.pressedBtn.cloneNode(true);
      nextModule.style.filter = 'none';
      nextModule.style.opacity = '1';
      nextModule.querySelector(`.${this.pressedBtn.className}`).replaceWith(nextModuleOpenBtn);
      nextModuleOpenBtn.addEventListener('click', () => this.onPlayBtnClick(nextModuleOpenBtn));
    }
  }
  onPlayBtnClick(btn) {
    if (!btn.querySelector('.closed')) {
      this.openPlayer(btn.getAttribute('data-url'));
      this.pressedBtn = btn;
      if (this.moduleClass) this.currentModule = this.pressedBtn.closest(`.${this.moduleClass}`);
    }
  }
  init() {
    this.overlay.classList.add('animated');
    this.overlay.style.animationDuration = '0.25s';
    this.playBtns.forEach(btn => btn.addEventListener('click', () => this.onPlayBtnClick(btn)));
    this.closeBtn.addEventListener('click', () => this.closePlayer());
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_mainSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/mainSlider */ "./src/js/modules/slider/mainSlider.js");
/* harmony import */ var _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/miniSlider */ "./src/js/modules/slider/miniSlider.js");
/* harmony import */ var _modules_DiffList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/DiffList */ "./src/js/modules/DiffList.js");
/* harmony import */ var _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/videoPlayer */ "./src/js/modules/videoPlayer.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");








window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (location.pathname.includes('modules')) {
    // Code for modules page:

    const mainModulesSlider = new _modules_slider_mainSlider__WEBPACK_IMPORTED_MODULE_0__["default"]({
      sliderSelector: '.moduleapp',
      nextBtnSelector: '.next',
      prevBtnSelector: '.prev',
      resetBtnSelector: '.sidecontrol > a'
    });
    mainModulesSlider.init();

    // Video player:

    const modulesVideoPlayer = new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__["default"]({
      playBtnSelector: '.play',
      moduleClass: 'module__video-item'
    });
    modulesVideoPlayer.init();

    // Accordion:

    const moduleOneAccordion = new _modules_accordion__WEBPACK_IMPORTED_MODULE_4__["default"]('.module__info-show', '.msg');
    moduleOneAccordion.init();

    // Download PDF:

    const pdfDownload = new _modules_download__WEBPACK_IMPORTED_MODULE_5__["default"]('.download', 'assets/dummy.pdf');
    pdfDownload.init();
  } else {
    // Siders:

    const mainSlider = new _modules_slider_mainSlider__WEBPACK_IMPORTED_MODULE_0__["default"]({
      sliderSelector: '.page',
      nextBtnSelector: '.next',
      resetBtnSelector: '.sidecontrol > a',
      popupSelector: '.hanson',
      popupSlide: 3
    });
    mainSlider.init();
    const showupSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
      sliderSelector: '.showup__content-slider',
      nextBtnSelector: '.showup__next',
      prevBtnSelector: '.showup__prev',
      activeClass: 'card-active'
    });
    showupSlider.init();
    const modulesSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
      sliderSelector: '.modules__content-slider',
      nextBtnSelector: '.modules__info-btns .slick-next',
      prevBtnSelector: '.modules__info-btns .slick-prev',
      activeClass: 'card-active',
      auto: true
    });
    modulesSlider.init();
    const feedSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
      sliderSelector: '.feed__slider',
      nextBtnSelector: '.feed__slider .slick-next',
      prevBtnSelector: '.feed__slider .slick-prev',
      slideClassName: 'feed__item',
      activeClass: 'feed__item-active'
    });
    feedSlider.init();

    // Difference lists:

    const tenYearsList = new _modules_DiffList__WEBPACK_IMPORTED_MODULE_2__["default"]({
      listSelector: '.officerold'
    });
    tenYearsList.init();
    const todayList = new _modules_DiffList__WEBPACK_IMPORTED_MODULE_2__["default"]({
      listSelector: '.officernew'
    });
    todayList.init();

    // Video player:

    const mainPageVideoPlayer = new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__["default"]({
      playBtnSelector: '.play'
    });
    mainPageVideoPlayer.init();

    // Forms:

    const helpForm = new _modules_form__WEBPACK_IMPORTED_MODULE_6__["default"]('.join__evolution form', 'assets/question.php');
    helpForm.init();
    const scheduleFrom = new _modules_form__WEBPACK_IMPORTED_MODULE_6__["default"]('.schedule__form form', 'assets/question.php');
    scheduleFrom.init();

    // Phone mask:

    const usPhoneMask = new _modules_mask__WEBPACK_IMPORTED_MODULE_7__["default"]('input[name="phone"]');
    usPhoneMask.init();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map