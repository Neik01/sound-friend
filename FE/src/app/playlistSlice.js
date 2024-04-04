import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState: {
    playList: [],
    playMusicIndex: 0,
    isPlaying: false,
    music: null,
  },
  reducers: {
    addMusicToPlaylist: (state, action) => {
      state.playList = [action.payload];
      state.isPlaying = true;
      state.music = action.payload;
    },
    addPlaylist: (state, action) => {
      if (action.payload.length > 0) {
        state.playList = [...action.payload];
      }
    },
    nextPlay: (state, action) => {
      console.log("next");

      if (state.playMusicIndex < state.playList.length - 1) {
        state.playMusicIndex = state.playMusicIndex + 1;
      } else {
        state.playMusicIndex = 0;
      }
      state.music = state.playList[state.playMusicIndex];
      state.isPlaying = true;
    },
    prePlay: (state, action) => {
      if (state.playMusicIndex !== 0) {
        state.playMusicIndex = state.playMusicIndex - 1;
      }
      state.music = state.playList[state.playMusicIndex];
      state.isPlaying = true;
    },
    playMusic: (state) => {
      state.isPlaying = true;
    },
    stopMusic: (state) => {
      console.log("stop");
      state.isPlaying = false;
    },
  },
  extraReducers: {},
});

const { reducer: playlistReducer } = playlistSlice;

export const playlistActions = playlistSlice.actions;

export default playlistReducer;
