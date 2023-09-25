const screenWidth = window.screen.width;
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('closeBtn');

let hiddenMenu = true;

mobileMenuButton.addEventListener('click', handleMenu)
closeBtn.addEventListener('click', handleMenu)

document.addEventListener('mouseup', (e) => {
    if (!hiddenMenu && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden')
        hiddenMenu = !hiddenMenu;
    }
})

function handleMenu() {
    if(hiddenMenu) {
        mobileMenu.classList.remove('hidden')
        mobileMenu.classList.add('fixed', 'top-0', 'left-0', 'w-auto', 'h-full', 'bg-white', 'shadow-lg')
    } else {
        mobileMenu.classList.add('hidden')
    }
    hiddenMenu = !hiddenMenu;
}


// Hero carousel
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let sliding = false;

function showSlide(index) {
    
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'flex';
            dots[i].classList.add('active');
        } else {
            slide.style.display = 'none';
            dots[i].classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

function autoSlide() {
    nextSlide();
}

// Initialize the first slide
showSlide(currentIndex);

// Automatic slide every 6 seconds
setInterval(autoSlide, 6000);

// Event listeners for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});


// Product carousel
const productCarousel = document.querySelector('.product-carousel');
const productCards = [...productCarousel.children];
const cardWidth = productCarousel.querySelector('.card').offsetWidth;
const numOfCards = Math.round(productCarousel.offsetWidth / cardWidth);
const arrowBtns = document.querySelectorAll('.arrow-btn');

productCards.slice( - numOfCards).reverse().forEach(card => {
    productCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

productCards.slice(0, numOfCards).forEach(card => {
    productCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        productCarousel.scrollLeft += btn.id == "prev-button" ? - cardWidth : cardWidth;
    })
})

const resetScroll = () => {
    // Scroll to the end
    if(productCarousel.scrollLeft === 0) {
        productCarousel.scrollLeft = productCarousel.scrollWidth - (2*productCarousel.offsetWidth);
    }
    // Scroll to the beginning
    else if(productCarousel.scrollLeft === productCarousel.scrollWidth - productCarousel.offsetWidth) {
        productCarousel.scrollLeft = productCarousel.offsetWidth;
    }
}

productCarousel.addEventListener("scroll", resetScroll)