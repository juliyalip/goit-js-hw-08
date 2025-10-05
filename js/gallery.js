const images = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryList = document.querySelector('.gallery');

const makeImageMarkup = element => {
    const { preview, original, description } = element;
    return `<li class="gallery-item">
  <a class="gallery-link" href="large-image.jpg">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
};

const makeGalleryMarkup = images.map(makeImageMarkup).join('');

galleryList.insertAdjacentHTML('beforeend', makeGalleryMarkup);

galleryList.addEventListener('click', onOpenModal);

function onOpenModal(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;

    const currentSrc = e.target.dataset.source;
    let currentIndex = images.findIndex(img => img.original === currentSrc);

    const instance = basicLightbox.create(
        `<div class="lightbox-container">
        <button class="close-modal">X </button>
        <div class="counter">${currentIndex + 1} / ${images.length}</div>
        <button class="prev">&lt;</button>
        <img class="lightbox-image" 
        src="${images[currentIndex].original}" alt="${images[currentIndex].description
        }" />
        <button class="next">&gt;</button>
        </div>
        `,
        {
            onShow: instance => {
                const modalEl = instance.element();
                modalEl.querySelector('.close-modal').onclick = () => instance.close();
                modalEl.querySelector('.next').onclick = showNext;
                modalEl.querySelector('.prev').onclick = showPrev;
                document.addEventListener('keydown', onEscKeyPress);
            },
            onClose: () => document.removeEventListener('keydown', onEscKeyPress),
        }
    );
    instance.show();

    function updateImage() {
        const imgEl = instance.element().querySelector('.lightbox-image');
        const counterEl = instance.element().querySelector('.counter');
        imgEl.src = images[currentIndex].original;
        imgEl.alt = images[currentIndex].description;
        counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }
    function onEscKeyPress(e) {
        if (e.code === 'Escape') instance.close();
        if (e.code === 'ArrowRight') showNext();
        if (e.code === 'ArrowLeft') showPrev();
    }
}
