const screenWidth = window.screen.width;
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


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
/* const cardCarousel = document.getElementById('card-carousel'); */
const productCarousel = document.querySelector('.product-carousel');
const productCards = [...productCarousel.children];
const cardWidth = productCarousel.querySelector('.card').offsetWidth;
const numOfCards = Math.round(productCarousel.offsetWidth / cardWidth);
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const arrowBtns = document.querySelectorAll('.arrow-btn');

let isSwiping = false, xPosition, scrollLeft;

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
const startSwiping = (e) => {
    isSwiping = true;
    productCarousel.classList.add("swiping")
    xPosition = e.pageX;
    scrollLeft = productCarousel.scrollLeft
}

const swiping = (e) => {
    if(!isSwiping) return;
    productCarousel.scrollLeft = scrollLeft - (e.pageX - xPosition)
}

const stopSwiping = () => {
    isSwiping = false;
    productCarousel.classList.remove("swiping")
}

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

productCarousel.addEventListener("mousedown", startSwiping)
productCarousel.addEventListener("mousemove", swiping)
productCarousel.addEventListener("mouseup", stopSwiping)
productCarousel.addEventListener("scroll", resetScroll)
// Function to calculate the number of cards to display based on screen size
/* function calculateCardsPerPage() {
    if (screenWidth < 640) {
        return 1;
    } else if (screenWidth < 768){
        return 2;
    } else if (screenWidth < 1024) {
        return 3;
    } else if (screenWidth < 1280) {
        return 4;
    }else {
        return 5;
    }
} */

/* let cardsPerPage = calculateCardsPerPage()
let currentCardIndex = 0; */

// Update cardsPerPage when the window size changes
/* window.addEventListener('resize', () => {
    cardsPerPage = calculateCardsPerPage();
    currentCardIndex = Math.min(currentCardIndex, cardCarousel.children.length - cardsPerPage);
    updateCardDisplay();
});
 */
/* function resetCards() {
    for (let i = 0; i < cardCarousel.children.length; i++) {
        cardCarousel.children[i].classList.
        
    }
    cardCarousel.children
} */

// Function to show the next set of cards
/* function showNextCards() {
    if (cardCarousel.children.length <= cardsPerPage) {
        currentCardIndex = 0;
    } else {
        currentCardIndex += cardsPerPage;

        if (currentCardIndex >= cardCarousel.children.length) {
            currentCardIndex = currentCardIndex % cardsPerPage;
        }
    }

    updateCardDisplay();
} */

// Function to show the previous set of cards
/* function showPrevCards() {
    currentCardIndex -= cardsPerPage;
    if (currentCardIndex < 0) {
        currentCardIndex = Math.max(0, cardCarousel.children.length - cardsPerPage);
    }
    updateCardDisplay();
} */

// Function to update the card display based on the currentCardIndex
/* function updateCardDisplay() {
  let activeProducts = 0;
  let remainder = cardCarousel.children.length % cardsPerPage;
  let addition = cardsPerPage - remainder;

  for (let i = 0; i < cardCarousel.children.length; i++) {  
    if (i >= currentCardIndex && i < currentCardIndex + cardsPerPage) {
      cardCarousel.children[i].classList.remove('hidden');
      activeProducts ++
    } else {
      cardCarousel.children[i].classList.add('hidden');
    }
  }

  if(activeProducts != cardsPerPage) {
    currentCardIndex = cardCarousel.children.length;
    for (let i = 0; i < addition; i++) {
        cardCarousel.children[i].classList.remove('hidden');
    }
  }
} */


/* function updateCardDisplay() {
    let activeProducts = 0;
    let remainder = cardCarousel.children.length % cardsPerPage;
    
    for (let i = 0; i < cardCarousel.children.length; i++) {
        if (i >= currentCardIndex && i < currentCardIndex + cardsPerPage) {
            cardCarousel.children[i].classList.remove('hidden');
            activeProducts++;
        } else {
            cardCarousel.children[i].classList.add('hidden');
        }
    }

    if (activeProducts !== cardsPerPage) {
        
        for (let i = 0; i < cardsPerPage - remainder; i++) {
            if(i == 0) {
                console.log('egy')
                cardCarousel.children[i].classList.add(`order-${cardsPerPage - remainder}`);
            }
            cardCarousel.children[i].classList.remove('hidden');
        }
    }
} */

/* function updateCardDisplay() {
    let activeProducts = 0;
    let remainder = cardCarousel.children.length % cardsPerPage;
    let addition = cardsPerPage - remainder;

    for (let i = 0; i < cardCarousel.children.length; i++) {
        if (i >= currentCardIndex && i < currentCardIndex + cardsPerPage) {
            cardCarousel.children[i].classList.remove('hidden');
            activeProducts++;
        } else {
            cardCarousel.children[i].classList.add('hidden');
        }
    }

    if (activeProducts !== cardsPerPage) {
        // Hide any remaining cards first
        for (let i = cardCarousel.children.length - remainder; i < cardCarousel.children.length; i++) {
            cardCarousel.children[i].classList.add('hidden');
        }

        // Show the first (cardsPerPage - remainder) cards
        for (let i = 0; i < cardsPerPage - remainder; i++) {
            cardCarousel.children[i].classList.remove('hidden');
        }
    }
} */

// Initialize the card display
/* updateCardDisplay(); */

// Add click event listeners to the buttons
/* nextButton.addEventListener('click', showNextCards);
prevButton.addEventListener('click', showPrevCards); */