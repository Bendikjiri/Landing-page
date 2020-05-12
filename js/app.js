/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let navigation = document.querySelector('#navbar__list');
let sections= document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// check which element is active
function ActiveElement() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function addSections() {
    for (let item of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navigation.appendChild(section);
    };
};

// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = ActiveElement();
        section.classList.add('your-active-class');

        for (let item of sections) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        }

        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('active__link');

        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {
            console.log(item);
            if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
};

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navigation.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();
    });
};

function start_menu() {
  // Build menu
  addSections();
  // Scroll to section on link click
  scrollToClick();
  // Set sections as active
  setActive();
}
/**
 * End Main Functions
 * Begin Events
 *
*/
start_menu();
