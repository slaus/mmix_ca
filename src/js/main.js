const htmlTag = document.querySelector('html');


// CLOSE BACKDOOR IFRAME
if (window !== window.top) {
    window.top.location.href = window.location.href;
}


// PRELOADER
try {
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';

        var content = document.getElementById('content');
        content.style.display = 'block';

        var resources = document.querySelectorAll('img, script, link[rel="stylesheet"], audio, video, iframe');
        var totalResources = resources.length;
        var loadedResources = 0;

        for (var i = 0; i < totalResources; i++) {
            var resource = resources[i];

            if (resource.tagName === 'IMG') {
                var img = new Image();
                img.onload = function () {
                    loadedResources++;

                    if (loadedResources === totalResources) {
                        preloader.style.display = 'none';
                    }
                };
                img.src = resource.src;
            } else {
                if (resource.complete) {
                    loadedResources++;

                    if (loadedResources === totalResources) {
                        preloader.style.display = 'none';
                    }
                } else {
                    resource.onload = function () {
                        loadedResources++;

                        if (loadedResources === totalResources) {
                            preloader.style.display = 'none';
                        }
                    };
                }
            }
        }
    });
} catch (e) { }


// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const htmlTag = document.querySelector('html');
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active');
            burger.classList.add('active');
            htmlTag.classList.add('locked');
        } else {
            menu.classList.remove('active');
            burger.classList.remove('active');
            htmlTag.classList.remove('locked');
        }

        // MOBILE SUBMENU
        const menuUl = document.querySelector('ul.menu.active');

        if (menuUl) {
            const menuDropdownItems = menuUl.querySelectorAll('.menu__dropdown');

            menuDropdownItems.forEach(function (menuItem) {
                const menuLink = menuItem.querySelector('.menu__link');
                if (menuLink && !menuLink.querySelector('span')) {
                    const spanElement = document.createElement('span');
                    menuLink.appendChild(spanElement);
                }

                menuItem.querySelectorAll('span').forEach(function (item) {
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                        const submenu = item.closest(".menu__dropdown").querySelector(".submenu");
                        if (submenu) {
                            if (submenu.style.display === 'block') {
                                submenu.style.display = '';
                                item.closest(".menu__dropdown").classList.remove("active");
                            } else {
                                submenu.style.display = 'block';
                                item.closest(".menu__dropdown").classList.add("active");
                            }
                        }
                    })
                });
            });
        }
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            menu.classList.remove('active')
            burger.classList.remove('active')
            htmlTag.classList.remove('locked')
        }
    })
}

burgerMenu()


// CREATING MENU IN ARTICLE PAGE FROM HEADERS
try {
    var section = document.getElementById('section');
    var headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');

    var sidebarMenu = document.getElementById('sidebar-menu');

    headings.forEach(function (heading, index) {
        var listItem = document.createElement('li');

        var anchor = document.createElement('a');
        anchor.textContent = heading.textContent;

        var headingId = heading.id || 'heading' + index;
        heading.id = headingId;

        anchor.href = '#' + headingId;

        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });

        listItem.appendChild(anchor);

        sidebarMenu.appendChild(listItem);
    });
} catch (e) { }


// DISCUSS THE PROJECT
try {
    const discussBlock = document.querySelectorAll(".discuss__block");
    const consultBlock = document.getElementById("consult");

    discussBlock.forEach(item => {
        item.addEventListener("click", (e) => {
            const discussParentSection = item.closest('section.err404__section, section#consult');
            const hasParentClass = discussParentSection !== null;

            if (!hasParentClass) {
                e.preventDefault();
                consultBlock.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
} catch (e) { }




// TO TOP
const toTopButton = document.getElementById('to-top-button');

window.addEventListener('scroll', function () {
    if (window.scrollY > 1000) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }
});

toTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// TABS
try {
    function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });

            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }

        hideTabContent();

        showTabContent();

        header.addEventListener('click', e => {
            const target = e.target
            if (target.classList.contains(tabSelector.replace(/\./, '')) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }

    tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active');

    const tabsHeader = document.querySelector(".tabs__header");
    const tabsPrev = document.getElementById("tabs__prev");
    const tabsNext = document.getElementById("tabs__next");

    tabsPrev.addEventListener("click", () => {
        tabsHeader.classList.add("visible__next");
        tabsHeader.classList.remove("visible__prev");
    });

    tabsNext.addEventListener("click", () => {
        tabsHeader.classList.add("visible__prev");
        tabsHeader.classList.remove("visible__next");
    });

} catch (e) { }



// STEP FORM
try {
    function stepForm(form) {
        const steps = form.querySelectorAll('.form__step');
        const prevBtn = form.querySelector('.prev__step');
        const nextBtn = form.querySelector('.next__step');
        const stepNumbers = form.querySelectorAll('.step__number');
        const progress = form.querySelector('.progress__success');

        let formSteps = 0;

        form.addEventListener('submit', (e) => e.preventDefault());

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Проверяем, все ли обязательные поля заполнены
            const requiredInputs = form.querySelectorAll('input[required]');
            const isAllRequiredFilled = Array.from(requiredInputs).every(input => input.value.trim() !== '');

            if (formSteps < steps.length - 1 && isAllRequiredFilled) {
                formSteps++;
                updateFormSteps();
            } else if (isAllRequiredFilled) {
                sendOrder();
                formSteps = 0;
                updateFormSteps();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (formSteps > 0) {
                formSteps--;
            }
            updateFormSteps();
        });

        function updateFormSteps() {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === formSteps);
            });

            stepNumbers.forEach((number, index) => {
                number.parentElement.classList.toggle('active', index === formSteps);
                number.classList.toggle('active__number', index === formSteps);
            });

            prevBtn.disabled = formSteps === 0;
            // nextBtn.disabled = formSteps === steps.length - 1;

            const actives = form.querySelectorAll('.active__number');
            const percent = ((actives.length - 1) / (stepNumbers.length - 1)) * 100 + '%';
            progress.style.width = percent;
        }

        updateFormSteps();
    }

    document.querySelectorAll('.steps__form').forEach(form => {
        stepForm(form);
    });

    const sendOrder = () => {
        alert('We did it!');
        clearInputs();
        clearDropdown();
    }

    const detailedBtn = document.querySelectorAll(".stepform__btn-detailed");
    const basicBtn = document.querySelectorAll(".stepform__btn-basic");

    detailedBtn.forEach(item => {
        item.addEventListener("click", () => {
            item.closest(".steps").previousElementSibling.classList.remove("hidden");
            item.classList.add("active");
            item.nextElementSibling.classList.remove("active");
        })
    });

    basicBtn.forEach(item => {
        item.addEventListener("click", () => {
            item.closest(".steps").previousElementSibling.classList.add("hidden");
            item.classList.add("active");
            item.previousElementSibling.classList.remove("active");
        })
    });
} catch (e) { }


// REQUIRED INPUTS
const requiredInputs = document.querySelectorAll('input[required]');

requiredInputs.forEach(input => {
    const parent = input.parentElement;

    if (parent) {
        const asteriskSpan = document.createElement('span');
        asteriskSpan.innerHTML = '*';
        asteriskSpan.classList.add('required-asterisk');

        const label = parent.querySelector('label');
        if (label) {
            label.appendChild(asteriskSpan);
        }
    }
});


// SELECTED ITEM IN DROPDOWN
const dropdowns = document.querySelectorAll(".steps .dropdown");

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('select');

    select.addEventListener('change', function () {
        if (this.value) {
            dropdown.classList.add('filled');
        } else {
            dropdown.classList.remove('filled');
        }
    });
});




// SELECTED INPUTS
const inputSteps = document.querySelectorAll('.input__step');

inputSteps.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});


// CLEAR INPUTS
const clearInputs = () => {
    const inputSteps = document.querySelectorAll('.input__step');

    inputSteps.forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });
}

// CLEAR DROPDOWN
const clearDropdown = () => {
    const dropdowns = document.querySelectorAll(".steps .dropdown");

    dropdowns.forEach(item => {
        const select = item.querySelector('select');
        item.classList.remove('filled');
        select.selectedIndex = 0;
    });
}


// INTRO ANIMATE
try {
    const animate = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth > 576) {
            const introCanvas = document.getElementById('intro__canvas');

            if (introCanvas) {
                particlesJS('intro__canvas',
                    {
                        "particles": {
                            "number": {
                                "value": 250,
                                "density": {
                                    "enable": false,
                                    "value_area": 750
                                }
                            },
                            "color": {
                                "value": "#db3454"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 4
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": true,
                                    "speed": .1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 4,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 15,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#db3454",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 3,
                                "direction": "none",
                                "random": true,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                },
                                "onclick": {
                                    "enable": false,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 200,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 200,
                                    "size": 14,
                                    "duration": 5,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 4
                                }
                            }
                        },
                        "retina_detect": true
                    }
                );
            }
        }

    }

    document.addEventListener('DOMContentLoaded', animate);
} catch (e) { }


// FILTER
try {
    let sortBtn = document.querySelector('.filter').children;
    let filterList = document.querySelector('.filter__list');
    let sortItem = filterList.children;

    for (let i = 0; i < sortBtn.length; i++) {
        sortBtn[i].addEventListener('click', function () {
            for (let j = 0; j < sortBtn.length; j++) {
                sortBtn[j].classList.remove('current');
            }

            this.classList.add('current');

            let targetData = this.getAttribute('data-target');

            for (let k = 0; k < sortItem.length; k++) {
                filterList.style = "";
                filterList.classList.add("filtered");
                sortItem[k].classList.remove('active__item');
                sortItem[k].classList.add('delete__item');

                if (targetData == "all") {
                    for (let k = 0; k < sortItem.length; k++) {
                        filterList.classList.remove("filtered");
                        sortItem[k].classList.remove('delete__item');
                    }
                } else {
                    for (let k = 0; k < sortItem.length; k++) {
                        if (sortItem[k].getAttribute('data-item') == targetData) {
                            sortItem[k].classList.remove('delete__item');
                            sortItem[k].classList.add('active__item');
                        }
                    }
                }
            }
        });
    }
} catch (e) { }



// READ MORE
try {
    const readMore = document.querySelectorAll(".read__more");
    readMore.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const nestedElements = item.previousElementSibling.querySelectorAll("*");
            nestedElements.forEach((element) => {
                element.style.display = 'block';
            });
            item.style.display = "none";
        });
    });
} catch (e) { }


// GALLERY IN MODAL
function galleryInModal(classButton, idModal, galleryItem, classImage) {

    const galleryItems = document.querySelectorAll(classButton);
    const modal = document.getElementById(idModal);
    const modalImage = document.getElementById("modalImage");
    const nextImage = document.getElementById("next-image");
    const prevImage = document.getElementById("prev-image");
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            currentIndex = index;
            openModal(currentIndex);
        });
    });

    function openModal(index) {
        htmlTag.classList.add('locked');
        modal.style.display = "block";
        modalImage.src = galleryItems[index].closest(galleryItem).querySelector(classImage).src;

        const closeButton = document.querySelector(".close");
        closeButton.addEventListener("click", function () {
            closeModal();
        });

        window.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
            }
        };

        window.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                showPreviousImage();
            } else if (event.key === "ArrowRight") {
                showNextImage();
            }
        });

        prevImage.addEventListener("click", function (event) {
            event.preventDefault();
            showPreviousImage();
        });

        nextImage.addEventListener("click", function (event) {
            event.preventDefault();
            showNextImage();
        });
    }

    function closeModal() {
        modal.style.display = "none";
        htmlTag.classList.remove('locked');
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImage.src = galleryItems[currentIndex].closest(galleryItem).querySelector(classImage).src;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        modalImage.src = galleryItems[currentIndex].closest(galleryItem).querySelector(classImage).src;
    }
}

galleryInModal(".gallery__btn", "galleryModal", ".gallery__link", ".gallery__image-img");



// ACTIVE BLOCK IF SCROLLING PAGE
try {

    const structureList = document.querySelector(".structureblock__list");
    const structureItem = structureList.querySelectorAll(".structureblock__item");

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementCenter = (rect.top + rect.bottom) * 1;

        return rect.top >= 0 && rect.bottom <= windowHeight && elementCenter >= 0 && elementCenter <= windowHeight;
    }

    function handleScroll() {
        structureItem.forEach((child) => {
            if (isElementInViewport(child)) {
                child.classList.add("active");
            } else {
                child.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();
} catch (e) { }



// SWIPER SLIDER
const swiperPortfolio = new Swiper('.swiper-portfolio', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

const swiperNews = new Swiper('.swiper-news', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

const swiperPartners = new Swiper('.swiper-partners', {
    slidesPerView: 6,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

const swiperTeam = new Swiper('.swiper-team', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        1449: {
            slidesPerView: 4,
            spaceBetween: 30
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

var swiperScrollBlock = new Swiper(".swiper-scrollblock", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    mousewheel: true,
    grabCursor: true,
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        767: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 20
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

var swiperScrollBlock = new Swiper(".swiper-testimonial", {
    direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    mousewheel: true,
    grabCursor: true,
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 20
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});

var swiperScrollBlock = new Swiper(".swiper-faq", {
    direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    mousewheel: true,
    grabCursor: true,
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        991: {
            slidesPerView: 2,
            spaceBetween: 20
        },
    },
    on: {
        click: function () {
            this.slideNext();
        }
    }
});