function removeAllBluredBackground() {
    const allPriorityImages = document.querySelectorAll('img[fetchpriority="high"], img[fetchpriority="low"]');
    const MAX_FILE_SIZE = 8.5 * 1024; 
  
    allPriorityImages.forEach((imageElement, index) => { 
      getFileSizeFromServer(imageElement.src, index);
    });
  
    function getFileSizeFromServer(imageUrl, imageIndex) {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', imageUrl, true); 
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const fileSize = parseInt(xhr.getResponseHeader('Content-Length'));
  
          if (fileSize < MAX_FILE_SIZE) {
            allPriorityImages[imageIndex].remove(); 
          }
          else {
            console.log(imageIndex)
          }
        }
      };
      xhr.send(null); 
    }
  } 

const focusImages = () => {
    var bluredContainers = Array.from(document.getElementsByClassName('blurred-container'));
    bluredContainers.forEach( (bluredContainer) => {
        bluredContainer.firstChild.src = bluredContainer.firstChild.src.replace('/blurred/', '/');
        bluredContainer.firstChild.classList.add('bi', 'x0', 'y0', 'w1', 'h1');
        bluredContainer.classList.remove('blurred-container');
    });
}

window.addEventListener('load', function(){
    // Select all elements with the specified data-test-selector attribute
    const buttons = document.querySelectorAll('[data-test-selector="document-viewer-ai-quiz-button"]');

    // Iterate over all found elements
    buttons.forEach(button => {
        // Attach an event listener to each button
        if (button.innerText === "AI Quiz") {
            button.innerText = "Remove blurred background"
            button.addEventListener('click', removeAllBluredBackground);
        }
    });

    // var pages = document.getElementsByClassName('page-content');
    // for(i=0; i<pages.length; i++){
    //     pagecontent=pages[i].parentNode.childNodes;
    //     for(j=0; j<pagecontent.length; j++){
    //         if(pagecontent[j].className != "page-content"){
    //             pagecontent[j].parentNode.removeChild(pagecontent[j]);
    //         }
    //     }
    //     pages[i].classList.add("nofilter");
    // }
    // document.getElementById('viewer-wrapper').addEventListener('scroll', () => {focusImages()});
    // document.getElementById('document-wrapper').addEventListener('scroll', (e) => { focusImages()});
});