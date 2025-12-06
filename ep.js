document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburger");
  const menu = document.getElementById("nav-menu");

  hamburgerMenu.addEventListener("click", () => {
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
  });
});

// Scroll reveal effect
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
});

// Fade-in-up animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll(".fade-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // unobserve so animation runs only once
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }   // triggers when 30% of section is visible
  );

  fadeItems.forEach((item) => observer.observe(item));
});

// Subtle 3D movement on mouse move (for images)
document.querySelectorAll(".experience-img").forEach((imgContainer) => {
  imgContainer.addEventListener("mousemove", (e) => {
    const rect = imgContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imgContainer.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  imgContainer.addEventListener("mouseleave", () => {
    imgContainer.style.transform = "rotateY(0) rotateX(0)";
  });
});


const buttons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');
const modalActions = document.querySelectorAll('.modal-action');
// open
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.modal);
    target.style.display = "flex";
  });
});

// close
closes.forEach(x => {
  x.addEventListener('click', () => {
    x.closest(".modal").style.display = "none";
  });
});

// click outside closes
window.addEventListener('click', e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// close modal + scroll to contact
modalActions.forEach(link => {
  link.addEventListener('click', e => {
    const activeModal = e.target.closest(".modal");
    if (activeModal) {
      activeModal.style.display = "none";
    }
  });
});

// ---------------- GALLERY SWIPER ----------------
// document.addEventListener("DOMContentLoaded", () => {
//   if (typeof Swiper === "undefined") {
//     console.error("Swiper is not loaded. Ensure Swiper JS is included before this script.");
//     return;
//   }

//   const gallerySwiper = new Swiper(".myGallerySwiper", {
//     slidesPerView: 3,
//     spaceBetween: 20,
//     loop: true,
//     autoplay: false,

//     breakpoints: {
//       0: { slidesPerView: 1 },
//       640: { slidesPerView: 2 },
//       1024: { slidesPerView: 3 },
//     },
//     navigation: {
//       nextEl: ".gallery-next",
//       prevEl: ".gallery-prev",
//     },

//   });

//   // Start autoplay only when gallery section is visible
//   const gallerySection = document.querySelector("#gallery");
//   let galleryStarted = false;

//   const galleryObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting && !galleryStarted) {
//         gallerySwiper.autoplay.start();
//         galleryStarted = true;
//         galleryObserver.disconnect();
//       }
//     });
//   }, { threshold: 0.2 });

//   galleryObserver.observe(gallerySection);


//   const counterEl = document.querySelector(".slide-counter");

//   const updateCounter = () => {
//     const totalSlides = gallerySwiper.slides.filter(
//       (s) => !s.classList.contains("swiper-slide-duplicate")
//     ).length;
//     const currentIndex = (gallerySwiper.realIndex % totalSlides) + 1;
//     if (counterEl) counterEl.textContent = `${currentIndex} / ${totalSlides}`;
//   };

//   gallerySwiper.on("slideChange", updateCounter);
//   gallerySwiper.on("init", updateCounter);
//   gallerySwiper.init();

//   // Pause autoplay on hover
//   const galleryEl = document.querySelector(".myGallerySwiper");
//   if (galleryEl) {
//     galleryEl.addEventListener("mouseenter", () => gallerySwiper.autoplay.stop());
//     galleryEl.addEventListener("mouseleave", () => gallerySwiper.autoplay.start());
//   }
// });

// function openNav() {
//   document.getElementById("mySidepanel").style.width = "260px";
// }

// function closeNav() {
//   document.getElementById("mySidepanel").style.width = "0";
// }

/* ---------------- AMENITIES SLIDER WITH DOT INDICATOR ---------------- */

let slideIndex = 0;
const slides = document.querySelectorAll(".amenities-slider .slide");
const prevBtn = document.querySelector(".amenities .prev");
const nextBtn = document.querySelector(".amenities .next");
const dotsContainer = document.querySelector(".amenities .dots-container");

/* CREATE DOTS */
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.setAttribute("data-slide", i);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".amenities .dot");

/* Reset all slides */
function resetSlides() {
  slides.forEach(slide => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
    slide.style.zIndex = "0";
  });

  dots.forEach(dot => dot.classList.remove("active"));
}

/* Show slide */
function showSlide(index) {
  resetSlides();

  slides[index].classList.add("active");
  slides[index].style.opacity = "1";
  slides[index].style.zIndex = "1";

  dots[index].classList.add("active");
}

/* Button controls */
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

/* Dot click controls */
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    slideIndex = Number(dot.getAttribute("data-slide"));
    showSlide(slideIndex);
  });
});

/* Auto slide */
let autoSlide; // don't auto start

document.querySelector(".amenities-slider").addEventListener("mouseenter", () =>
  clearInterval(autoSlide)
);
document.querySelector(".amenities-slider").addEventListener("mouseleave", () =>
  autoSlide = setInterval(nextSlide, 5000)
);

/* Initialize */
showSlide(slideIndex);

/* --- START SLIDER ONLY ON SCROLL TO AMENITIES SECTION --- */
let sliderStarted = false;
const amenitiesSection = document.querySelector("#amenities");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !sliderStarted) {
      autoSlide = setInterval(nextSlide, 5000);
      sliderStarted = true;
      observer.disconnect();
    }
  });
}, { threshold: 0.2 });

observer.observe(amenitiesSection);

/* Stop auto slide initially */
clearInterval(autoSlide);

// ---------------- GALLERY SWIPER ----------------
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Swiper
  if (typeof Swiper === "undefined") {
    console.error("Swiper is not loaded.");
    return;
  }

  const gallerySwiper = new Swiper(".myGallerySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev",
    },
  });

  // Pause Swiper on hover
  const galleryEl = document.querySelector(".myGallerySwiper");
  if (galleryEl) {
    galleryEl.addEventListener("mouseenter", () => gallerySwiper.autoplay.stop());
    galleryEl.addEventListener("mouseleave", () => gallerySwiper.autoplay.start());
  }

  // ---------------- LIGHTBOX LOGIC ----------------

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".close-lightbox");
  const playBtn = document.getElementById("lb-play");
  const pauseBtn = document.getElementById("lb-pause");

  // Note: Swiper creates duplicate slides for looping. 
  // We only want to select original images to avoid duplicates in the lightbox.
  // The ':not(.swiper-slide-duplicate)' filter is crucial here.
  const images = Array.from(document.querySelectorAll(".myGallerySwiper .swiper-slide:not(.swiper-slide-duplicate) img"));

  let currentIndex = 0;
  let slideInterval;
  const slideDelay = 2000; // 2 seconds per slide in lightbox

  // Open Lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      // Stop the background swiper autoplay when opening lightbox
      gallerySwiper.autoplay.stop();

      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add("show");

      // Reset play controls
      stopSlideshow();
    });
  });

  // Update Image Function
  function updateLightboxImage() {
    const imgSource = images[currentIndex].src;
    const imgAlt = images[currentIndex].alt;
    // 1. Get the specific image object from your array
    const currentImageObject = images[currentIndex];

    // 2. Update the Source (The Image)
    lightboxImg.src = currentImageObject.src;

    // 3. Update the Caption (The Text)
    // This grabs the text written in the alt="" attribute of your HTML
    lightboxImg.alt = currentImageObject.alt;

    // Check if the caption element exists before setting text to avoid errors
    if (captionText) {
      captionText.textContent = currentImageObject.alt;
    }
  }

  // Change Image (Next/Prev)
  window.changeImage = (direction) => {
    currentIndex += direction;

    // Loop logic
    if (currentIndex >= images.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    updateLightboxImage();
  };

  // Play Slideshow
  playBtn.addEventListener("click", () => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "flex";

    // Immediately show next image then start interval
    changeImage(1);
    slideInterval = setInterval(() => {
      changeImage(1);
    }, slideDelay);
  });

  // Pause Slideshow
  function stopSlideshow() {
    clearInterval(slideInterval);
    playBtn.style.display = "flex";
    pauseBtn.style.display = "none";
  }

  pauseBtn.addEventListener("click", stopSlideshow);

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove("show");
    stopSlideshow();
    lightboxImg.src = ""; // Clear src to stop loading

    // Resume the main gallery swiper
    gallerySwiper.autoplay.start();
  }

  closeBtn.addEventListener("click", closeLightbox);

  // Close on click outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard Support (Esc + Arrows)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
  });
});

// Sidepanel Logic (Existing)
function openNav() {
  document.getElementById("mySidepanel").style.width = "260px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const form = document.getElementById("contactForm");
const promoCheck = document.getElementById("promoCheckbox");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Regex patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;

  // Validate Name
  if (name.length < 3) {
    alert("Please enter your full name (at least 3 characters).");
    return;
  }

  // Validate Email
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate Phone
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Validate Message
  if (message.length < 5) {
    alert("Please enter a message (minimum 5 characters).");
    return;
  }

  // Validate Checkbox
  if (!promoCheck.checked) {
    alert("Please agree to receive updates & promotions to continue.");
    return;
  }

  // If all valid:
  alert("Form Submitted Successfully!");
  form.reset();
});