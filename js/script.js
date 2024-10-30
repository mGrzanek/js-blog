/*document.getElementById('test-button').addEventListener('click', function() {
    let links = document.querySelectorAll('.titles a');
    console.log("links: ", links);
})*/

const clickedTitleHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!', event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement: ', clickedElement);
    clickedElement.classList.add('active');
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const hrefAttributeLink = clickedElement.getAttribute('href')
    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(hrefAttributeLink);
    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links) {
    link.addEventListener('click', clickedTitleHandler);
}