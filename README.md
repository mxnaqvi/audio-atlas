
## Welcome to Audio Atlas!
Audio Atlas is a JavaScript data visualizer that allows users to enter the name of an artist and get a collpsible tree chart containing the entire discography of their albums and songs off those albums. 

## Technologies Used
Audio Atlas was built using JavaScript, D3.js, and the Spotify API.

## Features
Allows users to search for an artist annd interact with the data by allowing them to collapse and expand the nodes of the tree chart.

## Code Snippets

The following code snippet shows the function that creates the object that will be used to generate the tree chart. The function takes in the name of an artist as a parameter and returns an object containing the artist's name, the title of the node, and an array of the artist's albums. Each album object contains the album's name, the title of the node, and an array of the album's songs. Each song object contains the song's name and the title of the node.
This is done by Utilizing spotify's API to get the artist's id, then using that id to get the artist's albums, and then using the album's id to get the album's tracks. The function returns null if the artist does not exist or if the artist does not have any albums.


---
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
---


## Future Implementations
* Add a feature that allows users to play a snippet of a song by clicking on the song node.
* Clean up the island graphic and make it more visually appealing.
* Add a branch that allows users to see the songs that an artist has been featured on.