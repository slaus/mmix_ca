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

// ПЕРВЫЙ аргумент - класс кнопки открытия картинки.
// ВТОРОЙ аргумент - id модального окна
// ТРЕТИЙ аргумент - класс элемента галереи
// ЧЕТВЕРТЫЙ аргумент - класс картинки эдемента галереи
galleryInModal(".gallery__btn", "galleryModal", ".gallery__link", ".gallery__image-img");