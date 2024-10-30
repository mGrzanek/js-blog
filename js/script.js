/*document.getElementById('test-button').addEventListener('click', function() {
    let links = document.querySelectorAll('.titles a');
    console.log("links: ", links);
})*/

const clickedTitleHandler = function() {
    console.log('Link was clicked!', event);

    /* remove class 'active' from all article links  */
    //argLink.classList.remove('active');
    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(const link of links) {
    link.addEventListener('click', clickedTitleHandler);
}