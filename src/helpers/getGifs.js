export const getGifs = async( category ) => {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=DH3D3NDe2pluaI0rAJXjG1TFwwFT58P1&q=${ category }&limit=12`
    const resp = await fetch( url );
    const { data } = await resp.json();

    const gifs = data.map( img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }))

    // console.log(gifs);
    return gifs;
}