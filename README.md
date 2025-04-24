#**SpotifyArtists**
A user can input a name of an artist or an album using the dropdown menu.
After form submission the user receives basic information and an image of a band or album
from Spotify API.  
A local Node.js server listens to GET/POST requests from the client. Routing is with Express framework. 
The app sends user credentials and an API key to Spotify API for basic authorization.  
It then sends a search request to the API and the response is deconstructed using Javascript.
The information and the retrieved image are then displayed on the same page.  
##Usage  
Clone the repo and run npm start in the terminal.

