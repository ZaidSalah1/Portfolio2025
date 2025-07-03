const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");

let projectsData = [];




fetch('js/projects.json')
  .then(res => res.json())
  .then(data => {
    projectsData = data;
    console.log('Loaded projects:', projectsData);
  })
  .catch(err => console.error('Error loading projects.json:', err));



function openModal(id) {
  modal.style.display = "flex";  // Make it visible immediately
  modal.classList.remove("hide");
  modal.classList.add("show");
  document.body.classList.add("no-scroll");

  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  document.querySelector("#myModal .projectTitle").textContent = project.title;
  document.querySelector("#myModal .overview-left p").textContent = project.description;

  const overviewList = document.querySelector('#myModal .overview-list');
  overviewList.innerHTML = ''; // Clear previous list
  project.overview.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    overviewList.appendChild(li);
  });


  document.querySelector(".projectImgs img").src = project.mainImage;

  document.querySelector("#myModal .overview-right img").src = project.overviewImage;

  document.querySelector(".features .heading h1").textContent = project.headingTitle;
  document.querySelector(".features .heading p").textContent = project.headingText;

  document.querySelector('.github-btn').href = project.github;


  // populateFeatures(project.features, project.color);

  document.querySelector("#tools .left p").innerHTML = `
  ${project.build}
  <br><br>
  <strong>Key integrations include:</strong> ${project.techBuild}
`;

  const img = document.querySelector('.projectImgs img');

  const tools = document.querySelector('#tools .container .right');
  const tools2 = document.querySelector('#tools .container .right.v2');
  const demoBtn = document.querySelector('.demo-btn-wrapper');

  // const nextBtn = document.querySelector('.features-swiper-button-next-feature');
  // const prevBtn = document.querySelector('.features-swiper-button-prev-feature');

  // if (id === "athkar") {
  //   nextBtn.classList.add('green-hover');
  //   prevBtn.classList.add('green-hover');
  // } else if (id === "carRent") {
  //   nextBtn.classList.add('blue-hover');
  //   prevBtn.classList.add('blue-hover');
  // }
  // else {
  //   nextBtn.classList.remove('green-hover');
  //   prevBtn.classList.remove('green-hover');
  // }

  if (id != "qtech" && id != "qtech-dashboard") {
    tools.style.display = "none";
    tools2.style.display = "flex";
    demoBtn.style.display = "none"
  } else {
    tools2.style.display = "none";
    tools.style.display = "flex";
    demoBtn.style.display = "flex"
  }


  projectThem(project.color);

  document.querySelector("#myModal .projectTitle").style.background = `linear-gradient(170deg, ${project.color}, ${project.color2})`;

  const projectImgs = document.querySelector(".projectImgs");

  // Remove previous listeners by cloning the node (optional but clean)
  const newProjectImgs = projectImgs.cloneNode(true);
  projectImgs.parentNode.replaceChild(newProjectImgs, projectImgs);

  newProjectImgs.addEventListener("click", () => {
    if (id !== "qtech" && id !== "qtech-dashboard") {
      openMobileImgs(project);
    } else {
      openImgs(project);
    }
  });


}

function populateFeatures(features, colorCode) {
  const container = document.querySelector(".featuresItem");
  container.innerHTML = ""; // Clear previous content

  features.forEach(feature => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide item";
    slide.innerHTML = `
    ${feature.icon}
    <h1>${feature.title}</h1>
    <p>${feature.description}</p>
  `;

    // Select the <i> inside this slide and set its color
    const iconElement = slide.querySelector('i');
    if (iconElement) {
      iconElement.style.color = colorCode;
    }

    container.appendChild(slide);
  });


  // Optional: reinitialize Swiper if needed
}

function projectThem(colorCode) {
  document.querySelector("#myModal .projectTitle").style.background = colorCode;
  // document.querySelector('.featuresItem i').style.color = colorCode;
}


function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hide");
  document.body.classList.remove("no-scroll");

  // Wait for animation to finish, then hide modal
  modal.addEventListener(
    "animationend",
    () => {
      if (modal.classList.contains("hide")) {
        modal.style.display = "none";
      }
    },
    { once: true } // ensures event fires only once each close
  );
}

closeBtn.onclick = closeModal;

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};


// ============= Main Modal End ============= \\

const closeShowBTn = document.querySelector('.closeShow');
let imageSwiper = null;

function openImgs(project) {
  modal.style.display = "none";
  document.getElementById('showImgs').style.display = "flex";

  const swiper = document.querySelector('.swiper .swiper-wrapper');
  swiper.innerHTML = "";

  if (!project.images || !Array.isArray(project.images)) {
    console.error('project.images is missing or not an array');
    return;
  }

  project.images.forEach((item, index) => {
    swiper.innerHTML += `
      <div class="swiper-slide">
        <img src="${item}" alt="Image ${index + 1}" />
      </div>
    `;
  });

  // 🧹 Destroy old instance if it exists
  if (imageSwiper !== null) {
    imageSwiper.destroy(true, true);
    imageSwiper = null;
  }

  // ✅ Create new swiper and assign to the global reference
  imageSwiper = new Swiper('#imageSwiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    spaceBetween: 20,
    slidesPerView: 1,
  });
}

closeShowBTn.addEventListener('click', () => {
  modal.style.display = "flex";
  document.getElementById('showImgs').style.display = "none";
});


const closeMobileModal = document.querySelector('.closeMobileModal');
let mobileSwiper = null;

function openMobileImgs(project) {
  modal.style.display = "none";
  document.getElementById("mobileMockupModal").style.display = "flex";

  const swiperWrapper = document.querySelector('#mobileImageSwiper .swiper-wrapper');
  swiperWrapper.innerHTML = "";

  if (!project.images || !Array.isArray(project.images)) {
    console.error("project.images is missing or not an array");
    return;
  }

  project.images.forEach((item, index) => {
    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <img src="${item}" alt="Mobile Mockup ${index + 1}" />
      </div>
    `;
  });

  if (mobileSwiper !== null) {
    mobileSwiper.destroy(true, true);
    mobileSwiper = null;
  }

  mobileSwiper = new Swiper('#mobileImageSwiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    spaceBetween: 15,
    slidesPerView: 1,
  });
}

function openUXUXImgs(id) {

  const project = projectsData.find(p => p.id === id);
  if(!project) {
    return;
  }

  modal.style.display = "none";
  document.getElementById("mobileMockupModal").style.display = "flex";

  const swiperWrapper = document.querySelector('#mobileImageSwiper .swiper-wrapper');
  swiperWrapper.innerHTML = "";

  if (!project.images || !Array.isArray(project.images)) {
    console.error("project.images is missing or not an array");
    return;
  }

  project.images.forEach((item, index) => {
    swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <img src="${item}" alt="Mobile Mockup ${index + 1}" />
      </div>
    `;
  });

  if (mobileSwiper !== null) {
    mobileSwiper.destroy(true, true);
    mobileSwiper = null;
  }

  mobileSwiper = new Swiper('#mobileImageSwiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    spaceBetween: 15,
    slidesPerView: 1,
  });
}

closeMobileModal.addEventListener('click', () => {
  document.getElementById("mobileMockupModal").style.display = "none";
});



// function openMobImgs(project, startIndex = 0) {

//   document.getElementById("myModal").style.display = "none";
//   // const imageMobModal = document.getElementById('imageMobModal');
//   const swiperWrapper = document.querySelector('.imageMobSwiper .swiper-wrapper');

//   swiperWrapper.innerHTML = "";

//   if (!project.images || !Array.isArray(project.images)) {
//     console.error('project.images is missing or not an array');
//     return;
//   }

//   project.images.forEach((item, index) => {
//     swiperWrapper.innerHTML += `
//             <div class="swiper-slide">
//                 <img src="${item}" alt="Image ${index + 1}" />
//             </div>
//         `;
//   });

//   imageMobModal.setAttribute("data-mode", "mob");
//   imageMobModal.classList.add('show');
//   document.body.classList.add('no-scroll');
//   imageMobModal.style.display = "flex"; // Optional, if needed

//   // Initialize Swiper properly
//   if (window.imageMobSwiper) {
//     window.imageMobSwiper.destroy(true, true);
//   }
//   window.imageMobSwiper = new Swiper(".imageMobSwiper", {
//     navigation: {
//       nextEl: ".swiper-button-next-mob",
//       prevEl: ".swiper-button-prev-mob",
//     },
//     pagination: {
//       el: ".swiper-pagination-mob",
//       clickable: true,
//     },
//     spaceBetween: 10,
//     slidesPerView: 1,
//     allowTouchMove: true,
//     initialSlide: startIndex,
//   });
// }


// function openDesignImgs(id) {
//   const project = projectsData.find(p => p.id === id);

//   if (!project) {
//     return;
//   }


//   const imageMobModal = document.getElementById('imageMobModal');
//   const swiperWrapper = document.querySelector('.imageMobSwiper .swiper-wrapper');

//   swiperWrapper.innerHTML = "";

//   project.images.forEach((item, index) => {
//     swiperWrapper.innerHTML += `
//       <div class="swiper-slide">
//         <img src="${item}" alt="Image ${index + 1}" />
//       </div>
//     `;
//   });

//   imageMobModal.setAttribute("data-mode", "design");
//   imageMobModal.classList.add('show');
//   document.body.classList.add('no-scroll');
// }


// function closeImageModal() {
//   const mode = imageMobModal.getAttribute("data-mode");

//   imageMobModal.classList.remove('show');
//   imageMobModal.style.display = "none"; // Optional: hide fully
//   document.body.classList.remove('no-scroll');

//   if (mode === "mob") {
//     if (myModal) myModal.style.display = 'flex';
//   }
//   // No need to reopen anything in design mode
// }

// Close button event



// const imageModal = document.getElementById('imageModal');

// function openWebImgs(project, startIndex = 0) {
//   document.getElementById("myModal").style.display = "none";

//   const swiperWrapper = document.querySelector('.imageSwiper .swiper-wrapper');
//   swiperWrapper.innerHTML = "";

//   if (!project.images || !Array.isArray(project.images)) {
//     console.error('project.images is missing or not an array');
//     return;
//   }

//   project.images.forEach((item, index) => {
//     swiperWrapper.innerHTML += `
//       <div class="swiper-slide">
//         <img src="${item}" alt="Image ${index + 1}" />
//       </div>
//     `;
//   });

//   if (window.imageSwiper) {
//     window.imageSwiper.destroy(true, true);
//   }

//   window.imageSwiper = new Swiper(".imageSwiper", {
//     navigation: {
//       nextEl: ".swiper-button-next-image",
//       prevEl: ".swiper-button-prev-image",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     spaceBetween: 10,
//     slidesPerView: 1,
//     allowTouchMove: true,
//     initialSlide: startIndex, // Use startIndex if you want to open at a specific slide
//   });

//   imageModal.classList.add('show');
//   document.body.classList.add('no-scroll');
//   imageModal.style.display = "flex";
// }



// Close main modal \\

