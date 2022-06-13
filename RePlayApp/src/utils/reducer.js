import { casesReducer } from "./constants";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
};

const reducer = (state, action) => {
  switch (action.type) {
    case casesReducer.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case casesReducer.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case casesReducer.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case casesReducer.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case casesReducer.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case casesReducer.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case casesReducer.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    default:
      return state;
  }
};

export default reducer;