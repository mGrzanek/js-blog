'use strict';
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optActive = 'active',
    optTitlesActive = '.titles a.active',
    optTitles = '.titles a',
    optArticleActive = 'article.post.active',
    optArticleTagsSelector  = '.post-tags .list';

  const generateTitleLinks = function(customSelector = '') {

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

  const generateTags = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* get tags from data-tags attribute */
      const tagsArticle = article.getAttribute('data-tags');

      /* split tags into array */
      const tagsArray = tagsArticle.split(' ');

      /* START LOOP: for each tag */
      for(let tag of tagsArray) {

        /* generate HTML of the link */
        const linkHtml = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        /* add generated code to html variable */
        tagsWrapper.insertAdjacentHTML('beforeend', linkHtml);

        /* END LOOP: for each tag */
      }      
    /* END LOOP: for every article: */
    }
  };

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let tagLinkActive of tagLinksActive){
      /* remove class active */
      tagLinkActive.classList.remove(optActive);
    /* END LOOP: for each active tag link */
    } 
    /* find all tag links with "href" attribute equal to the "href" constant */
    const currentTagLinks = document.querySelectorAll(`a[href="${href}"`);
    console.log('currentTagLinks: ', currentTagLinks);
    /* START LOOP: for each found tag link */
    for(let tagLink of currentTagLinks) {
      /* add class active */
      tagLink.classList.add(optActive);
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`article[data-tags~="${tag}"]`);
  };
  
  generateTitleLinks();

  generateTags();

}