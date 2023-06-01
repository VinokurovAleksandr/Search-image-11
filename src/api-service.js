import Notiflix from 'notiflix';

        const loadMoreBtn = document.querySelector('.load-more')      

        const KEY = '31471213-f4e1fbc14dde5738e14f2abfa';
        const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService { 
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    };
    

    fetchArtickes() {
       
        
        
        const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&
        orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        return fetch(url)
            
            
            .then(r => r.json())
            
           
            
            .then(data => {
                loadMoreBtn.style.display = 'none';
                if (data.hits.length === 0) {
                  return  Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
                    )
                }          
      
                
                this.incrementPage();
                return data.hits               
            })
            
           

        .catch(error => error(Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      )))
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };


    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

