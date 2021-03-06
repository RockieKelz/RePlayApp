import React, { useEffect, useRef, useState } from "react";
import { casesReducer } from "../utils/constants";
import axios from "axios";
import Sidebar from "../components/SideBar";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useStateProvider } from "../utils/stateprovider";
import { Row, Card } from 'react-bootstrap'
import _ from 'lodash';

const Search = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const setCategory = (category) => {
    setSelectedCategory(category);
  };
/*
  const loadMore = async (type) => {
    const { dispatch, albums, artists, playlist } = props;
    switch (type) {
      case 'albums':
        await dispatch({ type: casesReducer.ADD_ALBUMS, data: albums.next});
        break;
      case 'artists':
        await dispatch({type: casesReducer.ADD_ARTISTS, data: artists.next});
        break;
      case 'playlist':
        await dispatch({type: casesReducer.ADD_PLAYLIST, data :playlist.next});
        break;
      default:
  }
};
  
 const initiateLoadMoreAlbums = async (searchTerm) => {
    return async (dispatch) => {
      try {
        const result = await axios.get(`https://api.spotify.com/v1/search?query=${encodeURIComponent(
          searchTerm
        )}&type=album,playlist,artist`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
      });
        return dispatch({type: casesReducer.ADD_ALBUMS, data: result.albums});
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
 const initiateLoadMoreArtists = async (searchTerm)=> {
    return async (dispatch) => {
      const result = await axios.get(`https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
    });
        return dispatch({type: casesReducer.ADD_ARTISTS, data: result.artists});
      } 
    };
  
 const initiateLoadMorePlaylist = async (searchTerm) => {
    return async (dispatch) => {
      const result = await axios.get(`https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
    });
        return dispatch({type: casesReducer.ADD_PLAYLIST, data: result.playlist});
    */
const [searchInput, setSearchInput] = useState("");  
const [artists, setArtists] = useState(null);
const [tracks, setTracks] = useState(null);
const [albums, setAlbums] = useState(null);

const [{ token }, dispatch] = useStateProvider();
async function GetResult(){
  console.log("Searching for " + searchInput)

  var SearchParameters ={
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  }
  await axios.get('https://api.spotify.com/v1/search?q=' + 
      searchInput + '&type=artist,track,album', SearchParameters)
     .then((data) => {
      console.log(data)
      setArtists(data.data.artists.items)
      setAlbums(data.data.albums.items)
      setTracks(data.data.tracks.items)

      dispatch(casesReducer.SET_ALBUMS, data.data.albums);
      dispatch({type: casesReducer.SET_ARTISTS, data: data.data.artists});
      dispatch({type: casesReducer.SET_PLAYLIST, data: data.data.playlist});
  
    }); 
  }

return (
  <Container>
    <div className="bodyContainer">
      <Sidebar />
      <div className="searchbody">
        <div className="upperbody">
          <h2 style={{ marginLeft : '85px' , marginTop : '75px'}}> Search</h2>
        <div className="search__bar">
          <FaSearch onClick={GetResult}/>
          <input 
              placeholder="Artists, songs, albums"
              type = "input"
              onKeyPress={event =>{
                if(event.key === "Enter"){
                  GetResult();
                }
              }}
              onChange = {event => setSearchInput(event.target.value)}
              />
              </div>

              <div className="search-buttons">
                  {!_.isEmpty(albums) && (
                    <button
                      className={`${
                        selectedCategory === 'albums' ? 'btn active' : 'btn'
                      }`}
                      onClick={() => setCategory('albums')}
                    >
                      Albums
                    </button>
                  )}
                  {!_.isEmpty(artists) && (
                    <button
                      className={`${
                        selectedCategory === 'artists' ? 'btn active' : 'btn'
                      }`}
                      onClick={() => setCategory('artists')}
                    >
                      Artists
                    </button>
                  )}
                  {!_.isEmpty(tracks) && (
                    <button
                      className={`${
                        selectedCategory === 'tracks' ? 'btn active' : 'btn'
                      }`}
                      onClick={() => setCategory('tracks')}
                    >
                      Songs
                    </button>
                  )}
                </div>

          </div>
              
            <div className = "lowerbody" style={{margin: '2rem auto' }}>
              <Row className = "searchRows">
              <div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
              { albums && (<>
                {albums.map( (album) => {
                  return (
                    <React.Fragment key={album.id}>
                  <Card >
                    <a href={album.external_urls.spotify}
                    target= "_blank"
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    <Card.Img src= {album.images[0].url} />
                    <Card.Body>
                      <Card.Title>
                      {album.name}
                      </Card.Title>
                    </Card.Body></a>
                  </Card>
                  </React.Fragment>)
                })}
                </>)}
                </div>
                <div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
                { artists && (<>
                {artists.map( (artist) => {
                  return (
                    <React.Fragment key={artist.id}>
                  <Card >
                    <a target="_blank"
                    href={artist.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >{artist.images.length ?
                    <Card.Img src= {artist.images[0].url} /> :
                    <></>}
                    <Card.Body>
                      <Card.Title>
                      {artist.name}
                    </Card.Title>
                  </Card.Body>
                  </a>
                </Card>
                </React.Fragment>
                )})}
                </> )}
                </div>
                <div className={`${selectedCategory === 'tracks' ? '' : 'hide'}`}>
                { tracks && (<>
                {tracks.map( (track) => {
                  return (
                    <React.Fragment key={track.id}>
                  <Card >
                    <a target="_blank"
                    href={track.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >{track.album.images.length ?
                    <Card.Img src= {track.album.images[0].url} /> :
                    <></>}
                    <Card.Body>
                      <Card.Title>
                      {track.name}
                    </Card.Title>
                  </Card.Body>
                  </a>
                </Card>
                </React.Fragment>
                )})}
                </> )}
                </div>

              </Row>
            </div>
            
          </div>
        </div>
      </Container>
  );
};
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  grid-template-rows: 85vh 15vh;
  display: grid;
  .bodyContainer {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: shadow-radius: 0px;
    border-style: solid;
    background-image: linear-gradient(137.81043556406863deg, rgba(12,90,249,1) 26%, rgba(48,138,239,1) 51%, rgba(3,138,219,1) 78%, rgba(37,183,99,1) 95%, rgba(0,255,96,1) 100%);
    box-shadow: 3px 3px 0px  1px rgba(0,0,0,1) ;;
    background-color: rgb(32, 87, 100);
  }
  .searchbody{
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      max-height: 2rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', -apple-system, system-ui, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 20px;
    letter-spacing: 1px;
    }
    .upperbody{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
      height: 23vh;

    }
  .search__bar {
    justify-content: space-between;
    height: 5vh;
    position: sticky;
    top: 0;
    background-color: green;
    width: 30%;
    margin-left: 5vh;
    padding: 0.4rem 1.2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: 1px solid;
      height: 1.8rem;
      width: 100%;
      &:focus {
        outline: none;
        display: flex;
      }
    }
  }
  .searchRows {
      display: flex;
      flex-wrap: wrap;
    margin-left: 05%;
  }
      
  }
  .card {
    margin: 1rem;
    max-width: 250px;
    height: 320px;
    box-shadow: 0 1px 1px 1px #0000ff;
  }
  
  .card .card-image-link {
    text-align: center;
  }

  .card .title{
    flex-wrap: wrap;
  }
  
  .card img {
    max-width: 250px;
    height: 250px;
  }
  .search-buttons {
    display: flex;
    justify-content: center;
    padding-left: 5rem;
    align-items: center;
    border-radius: 3rem;
    margin-top: -3rem;
  }
  
  .search-buttons .btn {
    margin: 0.8rem;
    font-size: 1.2rem;
    letter-spacing: 1px;
    font-weight: bold;
    color: #778298;
  }
  .hide {
    display: none;
  }
  
  .active {
    border: 2px solid #566273;
  }
  `
export default Search;
