const axios = require('axios');

const accessToken = 'BQDPL-cudQ37PJBJuqaSI1PAOLpo3UZ6CSvTraKzPE9k4Ql21bd6_2fUblf7XT5fKi9TuthDRXDrSraHSbFAjqoB-7ZUZUJ8ZxdSYzzXXvgqFgIZS1gC'; 


async function searchArtist(artistName) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: artistName,
        type: 'artist',
        limit: 1
      }
    });

    const artists = response.data.artists.items;
    if (artists.length > 0) {
      return artists[0];
    } else {
      console.log('Artist not found.');
      return null;
    }
  } catch (error) {
    console.error('Error searching for artist:', error);
    return null;
  }
}


async function getArtistInfo(artistId) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error retrieving artist information:', error);
    return null;
  }
}


async function getArtistAlbums(artistId) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('Error retrieving artist albums:', error);
    return null;
  }
}


async function getAlbumTracks(albumId) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('Error retrieving album tracks:', error);
    return null;
  }
}


async function createFamilyTree(artistName) {
  const artist = await searchArtist(artistName);
  if (!artist) return;

  console.log('Artist:', artist.name);

  const albums = await getArtistAlbums(artist.id);
  if (!albums) return;

  for (const album of albums) {
    console.log('Album:', album.name);

    const tracks = await getAlbumTracks(album.id);
    if (!tracks) continue;

    for (const track of tracks) {
      console.log('Song:', track.name);
    }
  }
}

function displayFamilyTree(data) {
    const familyTreeContainer = document.getElementById('family-tree');
  
    
    familyTreeContainer.innerHTML = '';
  
    
    const artistElement = document.createElement('h2');
    artistElement.textContent = `Artist: ${data.artist.name}`;
    familyTreeContainer.appendChild(artistElement);
  
  
    const albumsElement = document.createElement('ul');
    albumsElement.innerHTML = 'Albums:';
    familyTreeContainer.appendChild(albumsElement);
  
    
    const tracksElement = document.createElement('ul');
    tracksElement.innerHTML = 'Songs:';
    familyTreeContainer.appendChild(tracksElement);
  
   
    for (const album of data.albums) {
      
      const albumItem = document.createElement('li');
      albumItem.textContent = album.name;
      albumsElement.appendChild(albumItem);
  
      
      for (const track of album.tracks) {
        
        const trackItem = document.createElement('li');
        trackItem.textContent = track.name;
        tracksElement.appendChild(trackItem);
      }
    }
}
  

createFamilyTree('ARTIST_NAME')
    .then((data) => {
      displayFamilyTree(data);
    })
    .catch((error) => {
      console.error('Error:', error);
});


