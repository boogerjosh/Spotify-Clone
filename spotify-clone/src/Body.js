import React from 'react';
import './Body.css';
import Header from './Header';
import { useDataLayerValue } from './DataLayer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';

function Body({ spotify }) {
  const [{ discover_weekly, item, playing }, dispatch] = useDataLayerValue();

    const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };
  

  const playPlaylist = () => {
      spotify.play({
        context_uri: `spotify:playlist:37i9dQZEVXcKVIOZBDjXvx`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

   const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };
  
  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className='body__info'>
        <img src={discover_weekly?.images[0].url} alt='' />
        <div className='body__infoText'>
          <strong>PUBLIC PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

        <div className="body__songs">
        <div className="body__icons">
          {playing ? <PauseCircleFilledIcon className="body__shuffle" onClick={handlePlayPause}/> :
            <PlayCircleFilledIcon
             className="body__shuffle"
             onClick={() => playPlaylist()}
            />}
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
          </div>

            {discover_weekly?.tracks.items.map(item => (
              <SongRow playSong={playSong} track={item.track}/>
            ))}

        </div>
    </div>
  );
};

export default Body;