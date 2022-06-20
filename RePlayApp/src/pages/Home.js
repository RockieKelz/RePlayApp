import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateprovider";
import { casesReducer } from "../utils/constants";
import Footer from "../components/Footer";
import { Row, Card } from 'react-bootstrap'
import { AiFillClockCircle } from "react-icons/ai";
import { mainHeader } from "../pages/Header";
import { selectedPage } from "../utils/constants"

const Home = () => {
  const [{ token, recentlyplayed}, dispatch] = useStateProvider();
  const [recentPlays, setRecentPlays] = useState(null);
  
  //get recently played tracks
  const getUserRecentPlays = async() =>{
  await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then(data => {
    setRecentPlays([data.data.items]) 
    console.log(data)
    dispatch({ type: casesReducer.SET_RECENTLYPLAYED, recentlyplayed});
    });
    }
    console.log(recentPlays)


  //get current user
  useEffect(() => {
    if (recentPlays == null)
    {
      getUserRecentPlays();
    }
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: casesReducer.SET_USER, userInfo });
    };
    getUserInfo();


  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: casesReducer.SET_PLAYING, currentPlaying });
      dispatch({ type: casesReducer.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: casesReducer.SET_PLAYER_STATE, playerState: true });
    }
  };

  //get playback state for player
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: casesReducer.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
    

  }, [dispatch, recentlyplayed, token]);
  
  return (
    <Container>
      <div className="bodyContainer" >
        <Sidebar />
          { recentPlays && (<>
            <div className="recent_play">
              <h2 className="home_title">Recently Played Songs</h2>
              <div className='mt-1 w-full'>
							<div className="table flex justify-between w-full">
								<div className="w-4/4 lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
									<div className='w-12/12 lg:w-7/12 text-left'>TRACK</div>
									<div className='w-4/12 hidden lg:block text-left'>ALBUM</div>
									<div className='w-1/12 hidden lg:block text-left'>DURATION</div>
								</div>
					
								<span className="inline-block w-full">
                  
									{recentPlays.map((song) => {
                    return (
										<div className="lg:flex text-gray-400 justify-between w-full object-contain" key={song.played_at}>
											<div className="w-8/12 lg:w-7/12 truncate">
                      <Card >
                      <Card.Img src={[song.track.album.images[0].url]}/>
                      <Card.Body>
                        <Card.Title>
                        {song.track.name} 
                        </Card.Title>
                        <Card.Subtitle>{song.track.artists}</Card.Subtitle>
                         <Card.Text>{song.track.album.name}</Card.Text>
                         </Card.Body>
                         </Card>
											</div>
											<div className='w-4/12 hidden lg:block pr-4'>{song.track.album.name}</div>
											<div className='w-1/12 hidden lg:block'>{(song.track.duration_ms)}</div>
										</div>)
                    })}
                  </span>
							</div>
						</div>
					</div>
				
                  </>)}</div>
      <div className="bodyFooter">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
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
  .body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    &::-webkit-scrollbar {
      width: 0.7rem;
      max-height: 2rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .bodyContents {
    height: 100%;
    width: 100%;
    overflow: auto;
    margin-left: 05%;
    &::-webkit-scrollbar {
      width: 0.7rem;
      max-height: 2rem;
      &-thumb { background-color: rgba(255, 255, 255, 0.6); }
    }
  }
  .playlist {
      margin: 0 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      .image { img { height: 15rem;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        }
      .details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: #e0dede;
        .title { color: white; font-size: 4rem; }
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7); }
        .col {
        display: flex;
        align-items: center;
        color: #dddcdc;
        img {
          height: 40px;
          width: 40px; }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info { display: flex;
            flex-direction: column; }
        }
      }
    }  
  } `;
export default Home;