
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = '"BQB-_C9NogVfphuZxzad6tRR3JpkfA7bbevbGstRqly0xWjNkqBskHSyzYk8cmv9PcNBJ_HLBoyPIziZa9eDAmM16J3BWb80BKLQ1zoYfOgEmIh8XSHT';

// Function to search for an artist
async function searchArtist(artistName) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    const artists = data.artists.items;
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

// Function to retrieve artist information
async function getArtistInfo(artistId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error retrieving artist information:', error);
    return null;
  }
}

// Function to retrieve an artist's albums
async function getArtistAlbums(artistId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error retrieving artist albums:', error);
    return null;
  }
}

// Function to retrieve album tracks
async function getAlbumTracks(albumId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error retrieving album tracks:', error);
    return null;
  }
}

async function createFamilyTree(artistName) {
  const artist = await searchArtist(artistName);
  if (!artist) return null;

  console.log('Artist:', artist.name);

  const albums = await getArtistAlbums(artist.id);
  if (!albums) return null;

  const albumList = [];
  for (const album of albums) {
    console.log('Album:', album.name);

    const tracks = await getAlbumTracks(album.id);
    if (!tracks) continue;

    const trackList = [];
    for (const track of tracks) {
      console.log('Song:', track.name);
      trackList.push(track.name);
    }

    albumList.push({ albumName: album.name, tracks: trackList });
  }

  return { name: artist.name, albums: albumList };
}

function clearFamilyTree() {
  const familyTreeContainer = document.getElementById('familyTree');
  familyTreeContainer.innerHTML = '';
}

function displayFamilyTree(data) {
  clearFamilyTree();

  const familyTreeContainer = document.getElementById('familyTree');

  if (data) {
    const artistName = document.createElement('h2');
    artistName.textContent = data.name;
    familyTreeContainer.appendChild(artistName);

    const albumsList = document.createElement('ul');
    for (const album of data.albums) {
      const albumItem = document.createElement('li');
      albumItem.textContent = album.albumName;

      const tracksList = document.createElement('ul');
      for (const track of album.tracks) {
        const trackItem = document.createElement('li');
        trackItem.textContent = track;
        tracksList.appendChild(trackItem);
      }

      albumItem.appendChild(tracksList);
      albumsList.appendChild(albumItem);
    }

    familyTreeContainer.appendChild(albumsList);
  } else {
    const errorText = document.createElement('p');
    errorText.textContent = 'Artist not found.';
    familyTreeContainer.appendChild(errorText);
  }
}

// Get the DOM elements
const artistNameInput = document.getElementById('artistNameInput');
const searchButton = document.getElementById('searchButton');

// Add event listener to the search button
searchButton.addEventListener('click', async () => {
  const artistName = artistNameInput.value;
  if (artistName) {
    const data = await createFamilyTree(artistName);
    displayFamilyTree(data);
  }
});
})