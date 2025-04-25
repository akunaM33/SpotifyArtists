async function fetchData(form) {
  try {
    const response = await fetch('/', { 
      method: 'POST', 
    //  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form
  })
    if (!response.ok) {
        throw new Error(`This entry does not exist!`);
      }
      const data = await response.json();
      return data;
            
    } catch (error) {
      info.textContent = error.message;
      info.style.color = "red";
    }
  }
  const info = document.getElementById('info');
  async function processArtist(form) {
    try {
      const infoObj = await fetchData( form);
                                             
      // Access properties of the object
      info.textContent = infoObj.name;
      const p1 = document.createElement("p");
      p1.textContent = `Genres: ${infoObj.genres.join(', ')}`;
      info.appendChild(p1);
   
      const img = document.createElement('img');
      img.src = infoObj.images[0].url;
      img.alt = "Artist's photo";
      img.style.cssText ="width:100%; height: auto; margin: 0 auto;";
      info.appendChild(img);
      info.style.color = 'black';
    // info.parentNode.insertBefore(img, info.nextSibling);

    } catch (error) {
       console.error('Error processing artist:', error);
    }
  }

  async function processAlbum(form) {
    try {
      const infoObj = await fetchData( form);
                                             
      // Access properties of the object
      info.textContent = infoObj.name;

      const p1 = document.createElement("p");
      p1.textContent = `Release date: ${infoObj.release_date}`;
      const p2 = document.createElement("p");
      p2.textContent = `Artist: ${infoObj.artists[0].name}`;
      const p3 = document.createElement("p");
      p3.textContent = `Number of tracks: ${infoObj.total_tracks}`;
      info.appendChild(p1);
      info.appendChild(p2);
      info.appendChild(p3);
    
      const img = document.createElement('img');
      img.src = infoObj.images[0].url;
      img.alt = "Album's photo";
      img.style.cssText ="width:100%; height: auto; margin: 0 auto;";
      info.appendChild(img);
    // info.parentNode.insertBefore(img, info.nextSibling);

    } catch (error) {
      console.error('Error processing album:', error);
    }
  }
    
  const form1 = document.getElementById("form1");
  form1.addEventListener("submit", function (event) {
    console.log("Clicked submit on form1: ");
    event.preventDefault();
    const formData = new URLSearchParams(new FormData(form1));
    processArtist(formData);
    info.style.display = 'block';
  });

  const form2 = document.getElementById("form2");
  form2.addEventListener("submit", function (event) {
    console.log("Clicked submit on form2: ");
    event.preventDefault();
    const formData = new URLSearchParams(new FormData(form2));
    processAlbum(formData);
    info.style.display = 'block';
  });
  
  ////////////////////////// Button Logic //////////////////////////////////   
  
  const hideButton = document.getElementById('hideButton');
  const replace = document.getElementById('replace');

  hideButton.addEventListener('click', function () {
    info.replaceChildren(replace);
    info.style.color = 'black';
  });