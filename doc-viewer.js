let savedStyleContent = ""

function downloadDoc() {
	disableDarkReader()

    var head = document.getElementsByTagName("head")[0].innerHTML;
    var tit = document.getElementsByTagName("h1")[0].innerHTML;
    var pages = document.getElementById('page-container').childNodes;

    var print_opt = "";

    // Iterate through each page to calculate its size
    for (var i = 0; i < pages.length; i++) {
        var pageWidth = pages[i].offsetWidth - 10;
        var pageHeight = pages[i].offsetHeight - 10;
        print_opt += `@page {size: ${pageWidth}px ${pageHeight}px; margin: 0;} `;
        pages[i].childNodes[0].style = "display: block;";
    }

    var pdf = pages[0].parentNode.parentNode.parentNode.innerHTML;

    newWindow = window.open("", "Document", `status=yes,toolbar=no,menubar=no`);

    newWindow.document.getElementsByTagName("head")[0].innerHTML = head + "<style> .nofilter{filter: none !important;} </style>" + "<style> @media print " + print_opt + "</style>";
    newWindow.document.title = tit;
    newWindow.document.getElementsByTagName("body")[0].innerHTML = pdf;
    newWindow.document.getElementsByTagName("body")[0].childNodes[0].style = "";

    newWindow.addEventListener('load', function() {
        // Open print dialog
        newWindow.print();

        // Close window after printing
        newWindow.addEventListener('afterprint', function() {
            newWindow.close();
			enableDarkReader();
        });
    });
}

function disableDarkReader() {
	// Find the <style> element with id "dark-reader-style"
	var darkReaderStyle = document.getElementById('dark-reader-style');

	// Check if the element exists
	if (darkReaderStyle) {
		// Store the content of the <style> element
		savedStyleContent = darkReaderStyle.textContent;

		// Delete the child
		darkReaderStyle.parentNode.removeChild(darkReaderStyle);
	}
}

function enableDarkReader() {
	var restoredStyle = document.createElement('style');
	restoredStyle.id = 'dark-reader-style';
	restoredStyle.textContent = savedStyleContent;
	document.head.appendChild(restoredStyle);
}


function createButton() {
	const buttonTemplate = document.createElement("button"); // Create template outside loop
	buttonTemplate.classList.add("download-button-1");
	buttonTemplate.innerHTML = `
	  <svg aria-hidden="true" focusable="false" data-prefix="fas" class="svg-inline--fa" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
		<path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"></path>
	   </svg>
	  <span class="download-text">Download</span>
	`;
	buttonTemplate.onclick = downloadDoc;

	return buttonTemplate;
}

function scrollToBottomOfDocumentWrapper(callback) {
    const documentWrapper = document.getElementById("document-wrapper");
    if (documentWrapper) {
        const scrollHeight = documentWrapper.scrollHeight;
        const screenHeight = window.innerHeight;
        const scrollStep = 300; // Adjust the scroll step as needed
        
        let scrollTop = 0;
        const scrollInterval = setInterval(function() {
            scrollTop += scrollStep;
            documentWrapper.scrollTo({
                top: scrollTop,
                behavior: 'auto' // Change to 'smooth' if you prefer smooth scrolling
            });

            if (scrollTop >= scrollHeight - screenHeight) {
                clearInterval(scrollInterval);
				callback()
            }
        }, 50); // Adjust the interval duration as needed
    } else {
        console.error("Element with ID 'document-wrapper' not found.");
    }
}

  

function addButtons() {
	const downloadButtons = document.getElementsByClassName("fa-cloud-arrow-down");
  
	for (let i = 0; i < downloadButtons.length; i++) {
	  let newButton = createButton()
	  let downloadButton = downloadButtons[i].parentNode.parentNode;
	//   downloadButton.onclick = null; 
	//   downloadButton.onclick = downloadDoc; // Assign the new event listener

	  let downloadButtonParent = downloadButton.parentNode;
	  downloadButtonParent.removeChild(downloadButton)
	  downloadButtonParent.appendChild(newButton)
	}
  }  

// var observer = new MutationObserver(function(mutations) {
// 	mutations.forEach(function(mutation) {
// 		addButtons();
// 	});
// });



window.addEventListener('load', function(){
	if (window.location.hostname.includes('studocu.com')) {
		const prev_buttons = document.getElementsByClassName("fa-cloud-arrow-down");
	
		if(prev_buttons.length > 0) {
		try{
			addButtons();
			
			const allPriorityImages = document.querySelectorAll('img[fetchpriority="high"], img[fetchpriority="low"]');

			allPriorityImages.forEach(function(image) {
				image.addEventListener('load', function() {
					// This function will be called when the image is loaded
					console.log('Image loaded:', image.src);
					// You can add any additional functionality here
				});
			});

			scrollToBottomOfDocumentWrapper(downloadDoc); 
		}catch(err){
			console.log(err);
		}finally{
			let element = document.getElementById("viewer-wrapper");
			// observer.observe(element, { attributes: true, childList: true, subtree: true});
		}
		}
	}
  });
  
