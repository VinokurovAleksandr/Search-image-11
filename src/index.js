
// import createCardsImgGallery from './card-gallary';
// import axios from 'axios';

import NewsApiService from './api-service';

import SimpleLightbox from 'simplelightbox';
// import InfiniteScroll from 'infinite-scroll';

import 'simplelightbox/dist/simple-lightbox.min.css';



const refs = {
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    form: document.querySelector('#search-form'),
    inputEl: document.querySelector('input[name="searchQuery"]')
};

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onMore);

refs.loadMoreBtn.style.display = 'none';


const newApiServise = new NewsApiService();


function onSearch(e) {
  e.preventDefault();

  clearConatainer();
  newApiServise.query = e.currentTarget.elements.searchQuery.value;
  
  
  

 if (newApiServise.query === '') {
   return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      } 

  newApiServise.fetchArtickes().then(createCardsImgGallery);

  
  refs.loadMoreBtn.style.display = 'block';
   refs.loadMoreBtn.textContent = 'Please wait ...';
  refs.loadMoreBtn.disabled = true;

  newApiServise.resetPage(); 
};
 
 
function onMore() { 
  
  refs.loadMoreBtn.textContent = 'Please wait ...';
  refs.loadMoreBtn.disabled = true;
  newApiServise.fetchArtickes().then(createCardsImgGallery);
  lightbox.refresh();

};


function createCardsImgGallery(hits) {
  
  const markup = hits
    
      .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
       return `
        
       <div class="photo-card">
       <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image"  src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
     <div class="info">
    <p class="info-item">
      <b>Like ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
        `
      }
      )
    .join('');
  
  refs.gallery.innerHTML += markup;
    
    lightbox.refresh();

    refs.loadMoreBtn.style.display = 'block';
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreBtn.textContent = 'Show more';
 
};

function clearConatainer() {
  refs.gallery.innerHTML = '';
}

// Безкінечний скрол 

// window.addEventListener('scroll', () => {
//   const documentRect = document.documentElement.getBoundingClientRect();
 
//   if (documentRect.bottom < document.documentElement.clientHeight + 200) {
    
//     onMore();
//   }
    

   

  
// })


  


