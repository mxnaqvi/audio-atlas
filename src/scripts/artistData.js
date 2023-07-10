
const clientId = '9556daa5983e436886ab5cad5a62e674';
const clientSecret = 'bd138acae7584b8e904aaad476f264b9';

let accessToken = '';

async function refreshAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    accessToken = data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

async function searchArtist(artistName) {
  if (!accessToken) {
    await refreshAccessToken();
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
;


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

  const uniqueAlbums = [];
  const uniqueAlbumNames = new Set();

  for (const album of albums) {
    if (!uniqueAlbumNames.has(album.name)) {
      uniqueAlbums.push(album);
      uniqueAlbumNames.add(album.name);
    }
  }

  for (const album of uniqueAlbums) {
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

  return familyTree;
}

export default createFamilyTree;
