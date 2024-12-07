/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ accordion)
/* harmony export */ });
function accordion(contentSelector, triggerSelector) {
  const contents = document.querySelectorAll(contentSelector),
    triggers = document.querySelectorAll(triggerSelector);
  triggers.forEach((trigger, i) => trigger.addEventListener('click', () => toggleVisibility(i)));
  function toggleVisibility(index) {
    const trigger = triggers[index],
      content = contents[index];
    trigger.parentElement.classList.toggle('ui-accordion-header-active');
    content.classList.toggle('accordion-block-visible');
    content.style.maxHeight = content.classList.contains('accordion-block-visible') ? content.scrollHeight + 30 + 'px' : 0;
  }
}

/***/ }),

/***/ "./src/js/modules/burgerMenu.js":
/*!**************************************!*\
  !*** ./src/js/modules/burgerMenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ burgerMenu)
/* harmony export */ });
function burgerMenu(menuSelector, triggerSelector) {
  const menu = document.querySelector(menuSelector),
    trigger = document.querySelector(triggerSelector);
  menu.style.display = 'none';
  document.addEventListener('click', event => {
    if (!(event.target.closest('.burger-menu') || event.target.closest('.burger'))) menu.style.display = 'none';
  });
  trigger.addEventListener('click', handleClick);
  function handleClick() {
    if (screen.availWidth <= 992) {
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
  }
}

/***/ }),

/***/ "./src/js/modules/dragAndDrop.js":
/*!***************************************!*\
  !*** ./src/js/modules/dragAndDrop.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dragAndDrop)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/js/modules/forms.js");

function dragAndDrop() {
  const fileInputs = document.querySelectorAll('[type="file"]');
  fileInputs.forEach(input => {
    ['dragover'].forEach(eventType => input.addEventListener(eventType, () => highlight(input)));
    ['dragleave', 'drop'].forEach(eventType => input.addEventListener(eventType, () => unhighlight(input)));
    input.addEventListener('drop', event => {
      event.preventDefault();
      input.files = event.dataTransfer.files;
      (0,_forms__WEBPACK_IMPORTED_MODULE_0__.setFileName)(input);
    });
  });
}
function highlight(input) {
  input.closest('.file_upload').style.cssText = `background-color: #d0d0d0;border-radius: 26px;`;
}
function unhighlight(input) {
  input.closest('.file_upload').style.cssText = '';
}

/***/ }),

/***/ "./src/js/modules/fixOverflow.js":
/*!***************************************!*\
  !*** ./src/js/modules/fixOverflow.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMargin: () => (/* binding */ addMargin),
/* harmony export */   removeMargin: () => (/* binding */ removeMargin)
/* harmony export */ });
const scrollbarWidth = calcScrollbarWidth();
function addMargin(element) {
  if (element) element.style.marginRight = scrollbarWidth + 'px';
  document.body.style.marginRight = scrollbarWidth + 'px';
}
function removeMargin(element) {
  if (element) element.style.marginRight = 0;
  document.body.style.marginRight = 0;
}
function calcScrollbarWidth() {
  const element = document.createElement('div');
  element.style.cssText = 'height: 50px; width: 50px; overflow-y: scroll; visibility: hidden;';
  document.body.appendChild(element);
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  element.remove();
  return scrollbarWidth;
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms),
/* harmony export */   setFileName: () => (/* binding */ setFileName)
/* harmony export */ });
const messages = {
  loading: {
    description: 'Загрузка...',
    image: 'assets/img/spinner.gif'
  },
  success: {
    description: 'Спасибо! Скоро мы с вами свяжемся',
    image: 'assets/img/ok.png'
  },
  failure: {
    description: 'Что-то пошло не так...',
    image: 'assets/img/fail.png'
  }
};
const urls = {
  designer: 'assets/server.php',
  question: 'assets/question.php'
};
function forms() {
  const forms = document.querySelectorAll('form'),
    fileInputs = document.querySelectorAll('[type="file"]');
  fileInputs.forEach(fileInput => {
    setFileName(fileInput);
    fileInput.addEventListener('input', () => setFileName(fileInput));
  });
  forms.forEach(form => {
    const message = document.createElement('div'),
      description = document.createElement('p'),
      image = document.createElement('img'),
      fileInput = form.querySelector('[type="file"]');
    message.classList.add('status-message', 'animated', 'fadeIn');
    let timeoutId;
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.style.display = 'none';
      message.append(description, image);
      form.parentElement.appendChild(message);
      const formData = new FormData(form);
      if (form.closest('.calc')) {
        formData.append('price', form.querySelector('.calc-price').textContent.replace(/\D/g, ''));
      }
      setMessage('loading');
      postData(urls.designer, formData).then(res => {
        console.log(res);
        setMessage('success');
      }).catch(error => {
        console.log(error);
        setMessage('failure');
      }).finally(() => timeoutId = setTimeout(resetForm, 5000));
    });
    enableValidation(form);
    function resetForm() {
      form.reset();
      if (fileInput) fileInput.parentElement.querySelector('[data-file]').textContent = 'Файл не выбран';
      form.style.display = '';
      message.remove();
    }
    function setMessage(type) {
      description.textContent = messages[type].description;
      image.setAttribute('src', messages[type].image);
    }
  });
}
function setFileName(fileInput) {
  if (fileInput.files.length) {
    let [name, extension] = fileInput.files[0].name.split('.');
    name = name.length > 7 ? name.slice(0, 7).trim() + '...' : name;
    fileInput.closest('.file_upload').querySelector('[data-file]').textContent = name + '.' + extension;
  }
}
function enableValidation(form) {
  form.querySelectorAll('input, textarea').forEach(item => {
    if (!item.classList.contains('promocode') && item.getAttribute('name') !== 'email') {
      item.addEventListener('keypress', event => {
        if (event.key.match(/[^а-яё0-9]/i)) event.preventDefault();
      });
    }
  });
}
async function postData(url, data) {
  console.log(data);
  return await fetch(url, {
    method: 'POST',
    body: data
  }).then(res => {
    if (!res.ok) throw new Error('Could not post data, status: ' + res.status);
    return res.text();
  });
}

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
/* harmony import */ var _fixOverflow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixOverflow */ "./src/js/modules/fixOverflow.js");

let isModalActive = false,
  triggerPressed = false;
function modal(triggerSelector, modalSelector, closeSelector) {
  let removeTrigger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let showAtTheEnd = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let closeOnOverlayClick = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  function bindModal() {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = modal.querySelector(closeSelector);
    triggers.forEach(trigger => {
      trigger.addEventListener('click', event => {
        triggerPressed = true;
        event.preventDefault();
        if (removeTrigger) trigger.remove();
        showModal(modal);
      });
    });
    close.addEventListener('click', () => hideModal(modal));
    if (closeOnOverlayClick) {
      modal.addEventListener('click', event => {
        if (event.target === modal) hideModal(modal);
      });
    }
    if (showAtTheEnd) {
      let scrollHeight;
      window.addEventListener('scroll', () => {
        scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        if (scrollHeight <= document.documentElement.clientHeight + window.scrollY && !triggerPressed) {
          document.querySelectorAll(triggerSelector).forEach(trigger => trigger.click());
          showModal(modal);
        }
      });
    }
    function showModalAfterTime(time) {
      setTimeout(() => {
        if (!isModalActive) showModal(modal);
      }, time);
    }
    return {
      showModalAfterTime
    };
  }
  function showModal(modal) {
    hideAllModals();
    isModalActive = true;
    modal.classList.add('fadeIn');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    (0,_fixOverflow__WEBPACK_IMPORTED_MODULE_0__.addMargin)(document.querySelector('.fixed-gift'));
  }
  function hideModal(modal) {
    isModalActive = false;
    modal.classList.remove('fadeIn');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    (0,_fixOverflow__WEBPACK_IMPORTED_MODULE_0__.removeMargin)(document.querySelector('.fixed-gift'));
  }
  function hideAllModals() {
    isModalActive = false;
    document.querySelectorAll('[data-modal]').forEach(modal => hideModal(modal));
    (0,_fixOverflow__WEBPACK_IMPORTED_MODULE_0__.removeMargin)();
  }
  return bindModal();
}

/***/ }),

/***/ "./src/js/modules/paintingsHover.js":
/*!******************************************!*\
  !*** ./src/js/modules/paintingsHover.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ paintingsHover)
/* harmony export */ });
function paintingsHover() {
  const paintings = document.querySelectorAll('.sizes-block'),
    srcBase = 'assets/img/';
  paintings.forEach(painting => {
    const image = painting.querySelector('img');
    painting.addEventListener('mouseover', () => showImage(image));
    painting.addEventListener('mouseleave', () => hideImage(image));
  });
  function showImage(image) {
    image.src = `${srcBase}${image.className}-1.png`;
    Array.from(image.parentElement.children).forEach(element => {
      element.style.display = element === image || element.classList.contains('sizes-hit') ? '' : 'none';
    });
  }
  function hideImage(image) {
    image.src = `${srcBase}${image.className}.png`;
    Array.from(image.parentElement.children).forEach(element => element.style.display = '');
  }
}

/***/ }),

/***/ "./src/js/modules/phoneMask.js":
/*!*************************************!*\
  !*** ./src/js/modules/phoneMask.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ phoneMask)
/* harmony export */ });
function phoneMask(inputSelector) {
  const mask = '+7 (___) ___ __ __',
    defaultValue = mask.replace(/\D/g, ''),
    inputs = document.querySelectorAll(inputSelector);
  inputs.forEach(input => {
    ['focus', 'input', 'blur'].forEach(eventType => input.addEventListener(eventType, createMask));
    input.addEventListener('click', () => input.selectionStart = input.value.length);
  });
  function createMask(event) {
    let currentValue = this.value.replace(/\D/g, '').slice(0, 11);
    if (event.type === 'blur') {
      if (currentValue === defaultValue) this.value = '';
    } else {
      if (!currentValue) currentValue = defaultValue;
      this.value = setMaskedValue(currentValue);
    }
  }
  function setMaskedValue(value) {
    let valueOffset = 0;
    return mask.replace(/./g, match => {
      return /[_\d]/.test(match) && valueOffset < value.length ? value[valueOffset++] : valueOffset >= value.length ? '' : match;
    });
  }
}

/***/ }),

/***/ "./src/js/modules/photoFilter.js":
/*!***************************************!*\
  !*** ./src/js/modules/photoFilter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ photoFilter)
/* harmony export */ });
function photoFilter() {
  const menu = document.querySelector('.portfolio-menu'),
    photos = document.querySelectorAll('.portfolio-block'),
    emptyMessage = document.querySelector('.portfolio-no');
  emptyMessage.classList.add('animated', 'fadeIn');
  menu.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName === 'LI') {
      makeActive(target);
      let isEmpty = true;
      photos.forEach(photo => {
        photo.classList.add('animated', 'fadeIn');
        if (photo.classList.contains(target.className.split(' ')[0])) {
          photo.style.display = 'block';
          isEmpty = false;
        } else photo.style.display = 'none';
        emptyMessage.style.display = isEmpty ? 'block' : 'none';
      });
    }
  });
  function makeActive(btn) {
    menu.querySelectorAll('LI').forEach(element => {
      if (element === btn) element.classList.add('active');else element.classList.remove('active');
    });
  }
}

/***/ }),

/***/ "./src/js/modules/priceCalcuator.js":
/*!******************************************!*\
  !*** ./src/js/modules/priceCalcuator.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ priceCalcuator)
/* harmony export */ });
function priceCalcuator() {
  const size = document.querySelector('#size'),
    material = document.querySelector('#material'),
    options = document.querySelector('#options'),
    promocode = document.querySelector('#promocode');
  const priceContainer = document.querySelector('.calc-price'),
    defaultValue = 'Для расчета нужно выбрать размер картины и материал картины';
  const fields = [size, material, options, promocode];
  fields.forEach(field => field.addEventListener('input', updatePrice));
  priceContainer.closest('form').addEventListener('reset', () => priceContainer.textContent = defaultValue);
  updatePrice();
  function updatePrice() {
    let price;
    if (size.value && material.value && options.value) {
      price = (Number(size.value) + Number(material.value)) * options.value;
      if (promocode.value === 'IWANTPOPART') price *= 0.7;
    } else price = 0;
    priceContainer.textContent = price ? `${Math.floor(price)}руб.` : defaultValue;
  }
}

/***/ }),

/***/ "./src/js/modules/scroll.js":
/*!**********************************!*\
  !*** ./src/js/modules/scroll.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ scroll)
/* harmony export */ });
function scroll() {
  const up = document.querySelector('.pageup'),
    firstSection = document.querySelector('section'),
    links = document.querySelectorAll('[href^="#"]');
  const firstSectionOffsetTop = window.scrollY + firstSection.getBoundingClientRect().top,
    pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  up.classList.add('animated');
  up.style.display = 'none';
  up.style.pointerEvents = 'none';
  window.addEventListener('scroll', () => {
    if (window.scrollY >= firstSectionOffsetTop) {
      up.style.display = '';
      up.style.pointerEvents = '';
      up.classList.remove('fadeOut');
      up.classList.add('fadeIn');
    } else {
      up.style.pointerEvents = 'none';
      up.classList.remove('fadeIn');
      up.classList.add('fadeOut');
    }
  });
  let requestId;
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (link.hash) {
        const destination = document.querySelector(link.hash);
        let offset = Math.round(destination.getBoundingClientRect().top);
        const direction = offset > 0 ? 'forward' : 'backward',
          speed = 40;
        cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(frame);
        ['wheel', 'touchstart'].forEach(eventType => window.addEventListener(eventType, () => cancelAnimationFrame(requestId)));
        window.addEventListener('keydown', event => {
          const keyCode = event.keyCode;
          if ([32, 33, 34, 38, 40].includes(keyCode) || event.ctrlKey && [36, 35].includes(keyCode)) cancelAnimationFrame(requestId);
        });
        function frame() {
          let offset = Math.round(destination.getBoundingClientRect().top);
          switch (direction) {
            case 'forward':
              if (offset > 0 && window.pageYOffset + document.documentElement.clientHeight < pageHeight) {
                scrollTo(0, scrollY + speed);
                requestId = requestAnimationFrame(frame);
              } else {
                location.hash = link.hash;
              }
              break;
            case 'backward':
              if (offset < 0) {
                scrollTo(0, scrollY - speed);
                requestId = requestAnimationFrame(frame);
              } else {
                location.hash = link.hash;
              }
              break;
          }
        }
      }
    });
  });
}

/***/ }),

/***/ "./src/js/modules/showMoreStyles.js":
/*!******************************************!*\
  !*** ./src/js/modules/showMoreStyles.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showMoreStyles)
/* harmony export */ });
function showMoreStyles() {
  const button = document.querySelector('.button-styles'),
    styles = button.previousElementSibling.querySelectorAll('div');
  button.addEventListener('click', () => {
    styles.forEach(style => {
      if (getComputedStyle(style).display === 'none') {
        style.className = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1 animated fadeIn';
      }
    });
    button.remove();
  });
}

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider(sliderSelector, slideSelector, nextSelector, prevSelector) {
  let auto = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'horizontal';
  const slider = document.querySelector(sliderSelector),
    slides = slider.querySelectorAll(slideSelector),
    next = slider.querySelector(nextSelector),
    prev = slider.querySelector(prevSelector);
  let slidesTotal = slides.length,
    currentSlide = 1,
    prevSlide = slidesTotal,
    nextClass = type === 'vertical' ? 'fadeInDown' : 'fadeInRight',
    prevClass = type === 'vertical' ? 'fadeInUp' : 'fadeInLeft',
    intervalId = null;
  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlide - 1 ? '' : 'none';
    slide.classList.add('animated');
  });
  try {
    next.addEventListener('click', () => {
      showNextSlide();
      resetInterval();
    });
    prev.addEventListener('click', () => {
      showPrevSlide();
      resetInterval();
    });
  } catch (e) {}
  initInterval();
  function updateSlider() {
    slides[currentSlide - 1].style.display = 'block';
    slides[prevSlide - 1].style.display = 'none';
    slides[prevSlide - 1].classList.remove(nextClass, prevClass);
  }
  function showNextSlide() {
    prevSlide = currentSlide;
    currentSlide = (currentSlide + 1) % (slidesTotal + 1) || 1;
    slides[currentSlide - 1].classList.add(nextClass);
    updateSlider();
  }
  function showPrevSlide() {
    prevSlide = currentSlide;
    currentSlide = (currentSlide - 1) % (slidesTotal + 1) || slidesTotal;
    slides[currentSlide - 1].classList.add(prevClass);
    updateSlider();
  }
  function initInterval() {
    if (auto) intervalId = setInterval(showNextSlide, 5000);
  }
  function resetInterval() {
    clearInterval(intervalId);
    initInterval();
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
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_phoneMask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/phoneMask */ "./src/js/modules/phoneMask.js");
/* harmony import */ var _modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/showMoreStyles */ "./src/js/modules/showMoreStyles.js");
/* harmony import */ var _modules_priceCalcuator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/priceCalcuator */ "./src/js/modules/priceCalcuator.js");
/* harmony import */ var _modules_photoFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/photoFilter */ "./src/js/modules/photoFilter.js");
/* harmony import */ var _modules_paintingsHover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/paintingsHover */ "./src/js/modules/paintingsHover.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_burgerMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/burgerMenu */ "./src/js/modules/burgerMenu.js");
/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/scroll */ "./src/js/modules/scroll.js");
/* harmony import */ var _modules_dragAndDrop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/dragAndDrop */ "./src/js/modules/dragAndDrop.js");












window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Modals:
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.button-design', '.popup-design', '.popup-close');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.button-consultation', '.popup-consultation', '.popup-close').showModalAfterTime(60000);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.fixed-gift', '.popup-gift', '.popup-close', true, true);

  // Sliders:
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider', '.main-slider-item', null, null, true, 'vertical');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider', '.feedback-slider-item', '.main-next-btn', '.main-prev-btn', true);

  // Forms functionality:
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Phone mask:
  (0,_modules_phoneMask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name="phone"]');

  // Showing more styles in styles section:
  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_4__["default"])();

  // Price calculator:
  (0,_modules_priceCalcuator__WEBPACK_IMPORTED_MODULE_5__["default"])();

  // Photo filtration:
  (0,_modules_photoFilter__WEBPACK_IMPORTED_MODULE_6__["default"])();

  // Show image on hover in sizes section:
  (0,_modules_paintingsHover__WEBPACK_IMPORTED_MODULE_7__["default"])();

  // Accordion:
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_8__["default"])('.accordion-block', '.accordion-heading > span');

  // Burger menu that shows only when screen width is less than 993px:
  (0,_modules_burgerMenu__WEBPACK_IMPORTED_MODULE_9__["default"])('.burger-menu', '.burger');

  // Smooth scroll:
  this.window.addEventListener('load', _modules_scroll__WEBPACK_IMPORTED_MODULE_10__["default"]);

  // Drag and drop for file inputs:
  (0,_modules_dragAndDrop__WEBPACK_IMPORTED_MODULE_11__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map