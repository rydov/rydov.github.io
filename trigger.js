const controller = new ScrollMagic.Controller();

const text1 = document.getElementById("text1");

const texts = ["My name is Ahmad Rydo  ", "I am a frontend developer  "];

let currentIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 100; // Speed of typing in milliseconds

function type() {
  if (!isDeleting && currentIndex === texts.length) {
    currentIndex = 0; // Reset to the first text when completed
  }

  if (isDeleting && currentText.length === 0) {
    isDeleting = false;
    currentIndex++;
  }

  currentText = isDeleting
    ? texts[currentIndex].substring(0, currentText.length - 1)
    : texts[currentIndex].substring(0, currentText.length + 1);

  if (currentIndex === texts.length) {
    typingSpeed = 50; // Speed up deleting
  }

  if (currentText === texts[currentIndex]) {
    isDeleting = true;
    typingSpeed = 100; // Reset typing speed
  }

  text1.textContent = currentText;

  setTimeout(type, typingSpeed);
}

// Membuat trigger ScrollMagic
const scene = new ScrollMagic.Scene({
  triggerElement: "#text1",
  triggerHook: "onLeave",
  duration: "100%", // Mengejar elemen hingga akhir
})
  .setPin("#text1") // Menetapkan elemen pin selama animasi
  .on("leave", function (event) {
    // Callback saat scroll meninggalkan scene
    if (currentIndex === texts.length) {
      currentIndex = 0; // Reset ke teks pertama
      type(); // Mulai animasi lagi
    }
  })
  .addTo(controller);

type();
