const STORAGE_KEY_TOKEN = process.env.REACT_APP_STORAGE_KEY_TOKEN;
const CURRENT_SONG_ID = process.env.REACT_APP_CURRENT_SONG_ID;

export const storageToken = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_TOKEN)) || {};
  },
  set(data) {
    return localStorage.setItem(STORAGE_KEY_TOKEN, JSON.stringify(data));
  },
};

export const storageSongID = {
  get() {
    return JSON.parse(localStorage.getItem(CURRENT_SONG_ID)) || [];
  },
  set(data) {
    return localStorage.setItem(CURRENT_SONG_ID, JSON.stringify(data));
  },
};

export default function storage(keyName) {
  return {
    get() {
      return JSON.parse(localStorage.getItem(keyName));
    },
    set(data) {
      return localStorage.setItem(keyName, JSON.stringify(data));
    },
  };
}
