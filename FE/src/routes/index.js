import config from "../config";
import DefaultLayout from "../layout/DefaultLayout";
import SignInSignUp from "../layout/SignInSignUp";
import AddMusic from "../pages/AddMusic";
import Home from "../pages/Home";
import ListPlaylist from "../pages/ListPlaylist";
import Login from "../pages/Login";
import Music from "../pages/Music";
import MusicManager from "../pages/MusicManager";
import EditMusic from "../pages/MusicManager/EditMusic";
import Playlist from "../pages/Playlist";
import Register from "../pages/Register";
import Search from "../pages/Search";

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: config.routes.music,
    component: Music,
  },
  {
    path: config.routes.listPlaylist,
    component: ListPlaylist,
  },
  {
    path: config.routes.playlists,
    component: Playlist,
  },
  {
    path: config.routes.managerMusic,
    component: MusicManager,
  },
  {
    path: config.routes.addMusic,
    component: AddMusic,
  },
  {
    path: config.routes.editMusic,
    component: EditMusic,
  },
  {
    path: config.routes.search,
    component: Search,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: SignInSignUp,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: SignInSignUp,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
