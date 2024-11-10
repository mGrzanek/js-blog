'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-authors-links').innerHTML)
  };
  
  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };
    
  const select = {
    all: {
      articles: {
        article: '.post',
        articleActive: 'article.post.active',
      },
      linksTo: {
        tags: 'a[href^="#tag-"]',
        tagsActive: 'a.active[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
        authorsActive: 'a.active[href^="#author-"]',
        titles: '.titles a',
        titlesActive: '.titles a.active',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
    class: {
      active: 'active',
    }
  };

  const generateTitleLinks = function(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(select.all.articles.article + customSelector);
    for(let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHtml = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', linkHtml);
    }     

    const links = document.querySelectorAll(select.all.linksTo.titles);

    for(let link of links) {
      link.addEventListener('click', clickedTitleHandler);
    }
  };

  const clickedTitleHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(select.all.linksTo.titlesActive);

    for(let activeLink of activeLinks){
      activeLink.classList.remove(select.class.active);
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add(select.class.active);
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(select.all.articles.articleActive);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove(select.class.active);
    }

    /* get 'href' attribute from the clicked link */
    const hrefAttributeLink = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(hrefAttributeLink);

    /* add class 'active' to the correct article */
    correctArticle.classList.add(select.class.active);
  };

  const calculateTagsParams = function(tags) {
    const params = {
      min: 999999,
      max: 0
    };

    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }

      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  };

  const calculateTagClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);

    return opts.tagSizes.classPrefix+classNumber;
  };

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles.article);

    /* START LOOP: for every article: */
    for(let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);

      /* get tags from data-tags attribute */
      const tagsArticle = article.getAttribute('data-tags');

      /* split tags into array */
      const tagsArray = tagsArticle.split(' ');

      /* START LOOP: for each tag */
      for(let tag of tagsArray) {

        /* generate HTML of the link */
        const linkHTMLData = {tagName: tag};
        const linkHtml = templates.articleTag(linkHTMLData);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* add generated code to wrapper */
        tagsWrapper.insertAdjacentHTML('beforeend', linkHtml);

        /* END LOOP: for each tag */
      }      
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tagObj in allTags){

      /* [NEW] generate code of a link and add it to tagList */
      const linkHTMLData = {tagName: tagObj, count: allTags[tagObj], className: calculateTagClass(allTags[tagObj], tagsParams)};
      const tagObjLink = templates.tagCloud(linkHTMLData);
      tagList.insertAdjacentHTML('beforeend', tagObjLink);

    /* [NEW] END LOOP: for each tag in allTags: */
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
    const tagLinksActive = document.querySelectorAll(select.all.linksTo.tagsActive);

    /* START LOOP: for each active tag link */
    for(let tagLinkActive of tagLinksActive){

      /* remove class active */
      tagLinkActive.classList.remove(select.class.active);

    /* END LOOP: for each active tag link */
    } 
    /* find all tag links with "href" attribute equal to the "href" constant */
    const currentTagLinks = document.querySelectorAll(`a[href="${href}"`);

    /* START LOOP: for each found tag link */
    for(let tagLink of currentTagLinks) {

      /* add class active */
      tagLink.classList.add(select.class.active);

    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(select.all.linksTo.tags);

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  };
  
  const generateAuthors = function(){
    /* create new variable allAuthors with empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles.article);
    /* START LOOP: for every article: */
    for(let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      /* get author from data-author attribute*/
      const authorAttribute = article.getAttribute('data-author');
      /* generate html link with author */
      const linkHtmlData = {author: authorAttribute};
      const linkHtml = templates.articleAuthor(linkHtmlData);
      /* check if this link isn't already in allAuthors */
      if(!allAuthors[authorAttribute]){
        allAuthors[authorAttribute] = 1;
      } else {
        allAuthors[authorAttribute]++;
      }
      /* add generated code to author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHtml);
    /* END LOOP */
    }
    /* find list of authors in sidebar */
    const authorSidebarsWrapper = document.querySelector(select.listOf.authors);

    /* START LOOP for each author in allAuthors */
    for(let author in allAuthors){
      /* generate code of a link and add it to authorSidebarWrapper */
      const linkHtmlData = {author: author, count: allAuthors[author]};
      const authorLinkSidebar = templates.authorLink(linkHtmlData);
      authorSidebarsWrapper.insertAdjacentHTML('beforeend', authorLinkSidebar);
    /* END LOOP */
    }
  };

  const authorClickHandler = function(event) {
    /* add preventDefault */
    event.preventDefault();
    /* add clickedElement constant with this */
    const clickedElement = this;
    /*  get href attribute from clickedElement*/
    const href = clickedElement.getAttribute('href');
    /* extract author from href */
    const author = href.replace('#author-', '');
    /* find all active author links */
    const authorActiveLinks = document.querySelectorAll(select.all.linksTo.authorsActive);
    /* START LOOP for author active links */
    for(let authorActive of authorActiveLinks){
      authorActive.classList.remove(select.class.active);
    /* END LOOP */
    }
    /* find all author with href attribute equal to the href constant */
    const authorsCurrent = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP for each found author link */
    for(let authorCurrent of authorsCurrent){
      /* add active class */
      authorCurrent.classList.add(select.class.active);
      /* END LOOP */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-author="${author}"]`);
  };

  const addClickListenersToAuthors = function() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll(select.all.linksTo.authors);

    /*START LOOP for each author link */
    for(let authorLink of authorLinks){

      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP */
    }
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}