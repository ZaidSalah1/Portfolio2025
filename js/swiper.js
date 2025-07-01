document.addEventListener("DOMContentLoaded", () => {
  const projectImgs = document.querySelector(".projectImgs");
  const modal = document.querySelector(".imageModal");
  const closeBtn = document.querySelector(".close-imageModal");

  let imageSwiper; // ✅ declare globally

  const featuresSwiper = new Swiper('.features-swiper', {
    
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.features-swiper-button-next-feature',
      prevEl: '.features-swiper-button-prev-feature',
    }

  });
});


const imageMobModal = document.getElementById('imageMobModal');

const imageMobSwiper = new Swiper('.imageMobSwiper', {

  navigation: {
    nextEl: '.swiper-button-next-mob',
    prevEl: '.swiper-button-prev-mob',
  },
  pagination: {
    el: '.swiper-pagination-mob',
    clickable: true,
  },
});
