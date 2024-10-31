{
    'use strict';

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    const clickedTitleHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;

        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* add class 'active' to the clicked link */
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
        console.log(correctArticle);

        /* add class 'active' to the correct article */
        correctArticle.classList.add('active');
    }

    const generateTitleLinks = function() {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        let html = '';

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        for(let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element and get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            linkHtml = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

            /* insert link into titleList */
            html += linkHtml;
        }     

        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        console.log('links: ', links);

        for(let link of links) {
            link.addEventListener('click', clickedTitleHandler);
        }
    }

    generateTitleLinks();
}