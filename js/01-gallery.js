import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createCardMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createCardMarkup(cards) {
  return cards
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
              <a class="gallery__link" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                />
              </a>
            </div>`;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  const isGalleyImageEl = e.target.classList.contains("gallery__image");
  if (!isGalleyImageEl) {
    return;
  }
  const isUrlOfBigImage = e.target.dataset.source;

  openImageInModal(isUrlOfBigImage);
}

function openImageInModal(url) {
  const instance = basicLightbox.create(
    `
    <img src="${url}">
`
  );

  instance.show();

  const visible = instance.visible();

  if (visible) {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") {
        return;
      }
      instance.close();
    });
  }
}
