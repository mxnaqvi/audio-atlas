
const accessToken = 'BQA7s22sRzwsshz_0rr88mphIvUj4EpF2EOeZ4ijrxl3h3xBSBvDrRMYDjnnWjhiBUySP4Kq373IhXZ5Bu7jMEMyfs0VN9ZiGh3gvs6DHlD4rL0qgt_N';

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

  const albums = await getArtistAlbums(artist.id);
  if (!albums) return null;

  const familyTree = {
    name: artist.name,
    title: 'Artist',
    children: []
  };

  for (const album of albums) {
    const tracks = await getAlbumTracks(album.id);
    if (!tracks) continue;

    const albumNode = {
      name: album.name,
      title: 'Album',
      children: []
    };

    for (const track of tracks) {
      const trackNode = {
        name: track.name,
        title: 'Song',
        children: []
      };

      albumNode.children.push(trackNode);
    }

    familyTree.children.push(albumNode);
  }
  console.log(familyTree)
  return familyTree;
}

export default createFamilyTree;
