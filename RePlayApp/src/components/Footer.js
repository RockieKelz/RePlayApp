import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/stateprovider";
import { casesReducer } from "../utils/constants";
import styled from "styled-components";
import { Grid, Slider } from "@material-ui/core";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
  } from "react-icons/bs";
  import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
  import { FiRepeat } from "react-icons/fi";

function Footer() {
    const [{ token, currentPlaying, playerState }, dispatch] = useStateProvider();
    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
          `https://api.spotify.com/v1/me/player/${state}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({
          type: casesReducer.SET_PLAYER_STATE,
          playerState: !playerState,
        });
      };
      const changeTrack = async (type) => {
        await axios.post(
          `https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({ type: casesReducer.SET_PLAYER_STATE, playerState: true });
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data !== "") {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist) => artist.name),
        image: response.data.item.album.images[2].url,
      };
      dispatch({ type: casesReducer.SET_PLAYING, currentPlaying });
    } else {
      dispatch({ type: casesReducer.SET_PLAYING, currentPlaying: null });
    }
  };
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );}
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: casesReducer.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: casesReducer.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container>
    <div className="footer">
        <div className="footer__left">
        {currentPlaying && (
            <div className="track">
            <div className="track__image">
                <img src={currentPlaying.image} alt="currentPlaying" />
            </div>
            <div className="track__info">
                <h4 className="track__info__track__name">{currentPlaying.name}</h4>
                <h6 className="track__info__track__artists">
                {currentPlaying.artists.join(", ")}
                </h6>
            </div>
            </div>
        )}
        </div>
      <div className="footer__center">
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="state">
                {playerState ? (
                <BsFillPauseCircleFill onClick={changeState} />
                ) : (
                <BsFillPlayCircleFill onClick={changeState} />
                )}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </div>
    
    <div className="footer__right">
        <Grid item>
            <VolumeDownIcon />
        </Grid>
    <input style={{marginTop:-5}} type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </div>
    </div>
    </Container>
  );
}
const Container = styled.div`
height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #082855;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
.footer {
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    bottom: 0;
    height: 14.7%;
    width: 100%;
    background-color: #282828;
    padding: 20px;
  }
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
  .footer__center{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;
        &:hover {
        color: white;
        }
    }
    .state {
        svg {
        color: white;
        }
    }
    .previous,
    .next,
    .state {
        font-size: 2rem;
    }
}
  .footer__right{
    gap: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-content: center;
  input {
    width: 13rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
}`
export default Footer;