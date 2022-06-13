import React, { useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateprovider";
import { casesReducer } from "../utils/constants";
import { AiFillClockCircle } from "react-icons/ai";

export default function Spotify() {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();
  //get current user
  useEffect(() => {
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

    //get the initially selected playlist
    const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        dispatch({ type: casesReducer.SET_PLAYLIST, selectedPlaylist });
      };
      getInitialPlaylist();
  }, [dispatch, token, selectedPlaylist, selectedPlaylistId ]);


  return (
    <Container>
      <div className="bodyContainer">
        <Sidebar />
          <div className="bodyContents">
          { selectedPlaylist && ( <>
            <div className="playlist">
                <div className="image">
                    <img src={selectedPlaylist.image} alt="selected playlist" />
                </div>
                <div className="details">
                    <span className="type">PLAYLIST</span>
                    <h1 className="title">{selectedPlaylist.name}</h1>
                    <p className="description">{selectedPlaylist.description}</p>
                </div>
            </div>
            <div className="list">
                <div className="header-row">
                <div className="col">
                    <span>#</span>
                </div>
                <div className="col">
                    <span>TITLE</span>
                </div>
                <div className="col">
                    <span>ALBUM</span>
                </div>
                <div className="col">
                    <span>
                    <AiFillClockCircle />
                    </span>
                </div>
                </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div className="row"
                      key={id}
                      onClick={( "")}
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
            </div>
      </div>
      <div className="bodyFooter">
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 90vh 15vh;
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
    .bodyContents {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb { background-color: rgba(255, 255, 255, 0.6);

        .playlist {
            margin: 0 2rem;
            display: flex;
            align-items: center;
            gap: 2rem;
            .image { img { height: 15rem;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;}}
            .details {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              color: #e0dede;
              .title { color: white; font-size: 4rem; }
            }
          }
          .list {
            .header-row {
              display: grid;
              grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
              margin: 1rem 0 0 0;
              color: #dddcdc;
              position: sticky;
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
          }
        `;