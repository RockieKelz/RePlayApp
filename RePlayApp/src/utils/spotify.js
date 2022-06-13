import axios from 'axios';

/*=======================================================
=            Authorization Logic            =
=======================================================*/
const authEndpoint = "https://accounts.spotify.com/authorize";
const refreshUri = `https://accounts.spotify.com/api/token`;
const redirectUri = "http://localhost:3000";
const clientId = "fa3defefdad641c9bc8540d03281e562";
const clientSecret = "e3c666b77dfd4c0ca891a3682ca05029"

const scopes = [
    "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify"
  ];

//request authorization to for user to use spotify's data within the app 
export const handleLoginAuth = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

/*=======================================================
=            Token Logic            =
=======================================================*/
  //retrieve the the access token, token type, and expire time from the url once the login auth is successfully
  export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };


export const refreshAccessToken = (access_token) => {
  return (
    refreshUri +
    "?grant_type=authorization_code&" +
    "code=" +
    access_token +
    "&redirect_uri=" +
    redirectUri +
    "&client_id=" +
    clientId +
    "&client_secret=" +
    clientSecret
  );
};

const getAccessToken = () => {
  try{
    let substring = window.location.hash.substring(1);
    let subs = substring.split("&");
    const access_token = subs[0]?.split("=")[1] || "";
    const type = subs[1]?.split("=")[1];
    const expire_in = subs[2]?.split("=")[1] || 0;
    return { access_token, type, expire_in };
  }

  catch(e){
      logOut()
  }
}

export const token = getAccessToken()

export const logOut = () => {
  window.localStorage.removeItem('token_timestamp')
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('refresh_token')
  window.location.href='/'
}

/*============================================================================
\                    =            API Calls            =
==============================================================================*/
    

/*----------  User API Calls  ----------*/

export const getUser = () => axios.get('https://api.spotify.com/v1/me')

export const getUsersTopArtists = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=20')

export const getUsersTopTracks = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=20')

export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist')

export const getRecentlyPlayed = () => axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10')

export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists')

/*----------  Artists API Calls  ----------*/

export const getArtist = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}`)

export const getArtistsTopTracks = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`)

export const getArtistsAlbums = id => axios.get(`https://api.spotify.com/v1/artists/${id}/albums?limit=30&include_groups=album`)

export const getArtistsRelatedArtists = id => axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists?limit=5`)

export const isArtistFollowedByUser = id => axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`)

export const followArtist = id => axios.put(`https://api.spotify.com/v1/me/following?type=artist`, {ids:[id]})

export const unfollowArtist = id => axios.delete(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`)

/*----------  Track API Calls  ----------*/

export const getSong = id => axios.get(`https://api.spotify.com/v1/tracks/${id}`)

export const getSongFeatures = id => axios.get(`https://api.spotify.com/v1/audio-features/${id}`)

export const getTracksFeatures = ids => axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`)

/*----------  Library API Calls  ----------*/

export const getLikedSongs = () => axios.get('https://api.spotify.com/v1/me/tracks?limit=50')

export const getUsersPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists')

export const getAPlaylist = id => axios.get(`https://api.spotify.com/v1/playlists/${id}`)

export const getAPlaylistsTracks = id => axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`)

export const getAnAlbum = id => axios.get(`https://api.spotify.com/v1/albums/${id}`)

export const getAnAlbumsTracks = id => axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`)


export const search = query => axios.get(`https://api.spotify.com/v1/search/?q=${query}&type=artist,track&limit=3`)

/*=====  End of API Calls  ======*/