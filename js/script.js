'use strict';
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optActive = 'active',
    optTitlesActive = '.titles a.active',
    optTitles = '.titles a',
    optArticleActive = 'article.post.active';

  const generateTitleLinks = function() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHtml = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      /* insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', linkHtml);
    }     

    const links = document.querySelectorAll(optTitles);

    for(let link of links) {
      link.addEventListener('click', clickedTitleHandler);
    }
  };

  const clickedTitleHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(optTitlesActive);

    for(let activeLink of activeLinks){
      activeLink.classList.remove(optActive);
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add(optActive);
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(optArticleActive);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove(optActive);
    }

    /* get 'href' attribute from the clicked link */
    const hrefAttributeLink = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(hrefAttributeLink);

    /* add class 'active' to the correct article */
    correctArticle.classList.add(optActive);
  };

  generateTitleLinks();
}