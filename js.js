import jsonData from './product-list.json' assert { type: 'json' };

// --------------------- Slider Start ---------------------

var swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  preloadImages: false,
  // Enable lazy loading
  lazy: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // ve daha üstündeki ekranlar için >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    // ve daha üstündeki ekranlar için >= 992px
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    // ve daha üstündeki ekranlar için >= 200px
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    // ve daha üstündeki ekranlar için >= 1650px
    1400: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});

// --------------------- Slider End ---------------------

// --------------------- Data Start ---------------------

let categories = jsonData.responses[0][0].params.userCategories;
let items = jsonData.responses[0][0].params.recommendedProducts;

// --------------------- Data End

// --------------------- Nav Start ---------------------

const nav = document.querySelector('.navv');
let navCategories = categories.reduce((acc, category) => {
  let findChar = category.lastIndexOf('>');
  let result = category.slice(findChar + 1);
  if (!acc.includes(result)) {
    acc.push({ fullName: category, nav: result });
  }
  return acc;
}, []);

let categoryHTML = ``;
navCategories.map((category) => {
  return (categoryHTML += `<a href="#" class="btn-item">${category.nav}</a>`);
});
nav.innerHTML = categoryHTML;

// --------------------- Nav End ---------------------

// --------------------- Button Start ---------------------

const button_listen = document.getElementsByClassName('btn-item');
Array.from(button_listen).forEach((element) => {
  element.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    let res = navCategories.filter((m) => m.fullName.includes(value));

    showItem(res[0].fullName);
  });
});

let buttons = document.querySelectorAll('.btn-item');
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    buttons.forEach((btn) => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

// --------------------- Button End ---------------------

// --------------------- Content Start ---------------------

const showItem = (category) => {
  let result = items[category];
  showDOMss(result);
};

const showDOM = document.querySelector('.swiper-wrapper');
let showDOMss = (items) => {
  let showHTML = ``;
  items.forEach((item) => {
    showHTML += ` <div class="swiper-slide">
      <div class="swiper-content">
      <img class="gorsel swiper-lazy" data-src="${item.image}" data-srcset="${item.image}" alt="${item.productId}"/>
      <div class="swiper-lazy-preloader"></div>
      <div class="info"> 
      
      <h4 class="text-mutedd">
       ${item.name}
      </h4>
      </div>
                <div class="price">${item.priceText}</div>
                <span class="free">*Ücretsiz Kargo</span>
                <div><button class="button" onclick="myFunction()" >Sepete Ekle</button></div>
                
      </div>
      </div>

`;
  });
  showDOM.innerHTML = showHTML;
};

showItem('Size Özel');

// --------------------- Content End ---------------------
