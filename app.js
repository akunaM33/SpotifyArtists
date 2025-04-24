const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const qs = require('qs');
const axios = require('axios');
require('dotenv').config();

const port = 3000;
const host = 'localhost';

const app = express();
app.use(express.static('public'));
// Parse JSON request bodies
app.use(bodyParser.json());
// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/menu.html'));
});

app.post('/', async (req, res) => {
                                        
    try {
        // 1. Obtain Access Token
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const tokenEndpoint = process.env.TOKEN_ENDPOINT;

        const credentials = qs.stringify({
            grant_type: 'client_credentials',
            client_id: client_id,
            client_secret: client_secret
        });

        const tokenRes = await axios.post(tokenEndpoint, credentials, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenRes.data.access_token;

        // 2. Access Data based on logic of Request:
        if ('artist' in req.body){
            console.log('Received form Artist:', req.body.artist);
       
        try {
            let artistName = req.body.artist;
                                                
            let apiEndpoint = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`;
            const apiResponse = await axios({
                method: 'GET',
                url: apiEndpoint,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
                           
            res.json(apiResponse.data.artists.items[0]);
             
        } catch (error) {
       
            res.status(500).json({ message: 'Error getting Artist' });
        }

    }else if ('album' in req.body){
        console.log('Received form Album:', req.body.album);
        try {
            let albumName = req.body.album;
                                              
            let apiEndpoint = `https://api.spotify.com/v1/search?q=${albumName}&type=album&limit=1`;
            const apiResponse = await axios({
                method: 'GET',
                url: apiEndpoint,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
                            
            res.json(apiResponse.data.albums.items[0]);
            
        } catch (error) {
   
            res.status(500).json({ message: 'Error getting Album' });
        }

    }

    } catch (error) {
  
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`);
});