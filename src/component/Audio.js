import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
  BsRepeat,
  BsRepeat1,
  BsShuffle,
  BsVolumeDown,
  BsVolumeMute,
} from "react-icons/bs";
import { React, useRef, useState, useEffect } from "react";
import { songsdata } from "../data/Songs";

export default function Audio() {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(NaN);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); //keep track of the current song index
  const audioElem = useRef();
  const clickRef = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  useEffect(() => {
    audioElem.current.addEventListener("loadedmetadata", () => {
      setTotalDuration(audioElem.current.duration);
    });
    return () => {
      audioElem.current.removeEventListener("loadedmetadata", () => {});
    };
  }, []);

  useEffect(() => {
    audioElem.current.addEventListener("ended", () => {
      if (repeat) {
        audioElem.current.currentTime = 0;
        audioElem.current.play();
      } else {
        // Play the next song when the current song ends
        const nextSongIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextSongIndex);
        setCurrentSong(songs[nextSongIndex]);
        audioElem.current.play();
      }
    });
    return () => {
      audioElem.current.removeEventListener("ended", () => {});
    };
  }, [currentSongIndex, repeat, songs]);

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skipNext = () => {
    if (shuffle) {
      // If shuffle is enabled, select a random song from the playlist
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex]);
    } else {
      const index = songs.findIndex((x) => x.title === currentSong.title);
      if (index === songs.length - 1) {
        setCurrentSong(songs[0]);
      } else {
        setCurrentSong(songs[index + 1]);
      }
    }
    audioElem.current.currentTime = 0;
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(Number(secs / 60));
    const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
    const seconds = Math.floor(Number(secs % 60));
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }; // calculating the current and total duration

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const currenttTime = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (currenttTime / duration) * 100,
      length: duration,
      currentTime: currenttTime,
    });

    setCurrentTime(currenttTime);

    if (totalDuration === currentSong.length) {
      setTotalDuration(duration);
    }

    // Check if the song has ended and repeat is enabled
    if (currenttTime >= duration && repeat) {
      audioElem.current.currentTime = 0;
      audioElem.current.play();
    }

    // Check if the song has ended and shuffle is enabled
    if (currenttTime >= duration && shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex]);
      audioElem.current.currentTime = 0;
      audioElem.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    console.log(newVolume <= 0);
    setVolume(newVolume);
    audioElem.current.volume = newVolume;
  };

  const mute = () => {
    setVolume(0);
    audioElem.current.volume = 0;
  };

  const unMute = () => {
    setVolume(1);
    audioElem.current.volume = 1;
  };

  return (
    <>
      <div className="current-play rounded-ss-[50px] rounded-es-[50px] flex sm:flex-row flex-col gap-x-6 gap-y-4 items-center md:px-7 px-4 pt-5 pb-2 mb-6">
        <div className="w-[200px] h-[200px]">
          <img className="max-w-full" src={currentSong.img} alt="current" />
        </div>
        <div className="flex flex-col sm:w-[70%] w-[100%]">
          <h1 className="text-white sm:text-[3.125rem] text-[2.19rem] leading-none font-extrabold overflow-hidden">
            {currentSong.title}
          </h1>
          <p className="place-self-end font-medium text-white sm:text-xl text-lg">
            By {currentSong.artist}
          </p>
          <div className="flex-row flex justify-center my-4 gap-x-3 items-center audio-icons">
            {repeat ? (
              <BsRepeat1
                onClick={toggleRepeat}
                className="text-2xl cursor-pointer text-[#14DD94] hover:text-white rounded-[100%]"
              />
            ) : (
              <BsRepeat
                onClick={toggleRepeat}
                className="text-2xl cursor-pointer text-white hover:text-[#14DD94] rounded-[100%]"
              />
            )}
            <BsFillSkipStartCircleFill
              className="text-4xl text-gray-400 hover:text-white cursor-pointer"
              onClick={skipBack}
            />
            {isplaying ? (
              <BsFillPauseCircleFill
                onClick={PlayPause}
                className="text-4xl text-[#14DD94] cursor-pointer"
              />
            ) : (
              <BsFillPlayCircleFill
                onClick={PlayPause}
                className="text-4xl text-[#14DD94] cursor-pointer"
              />
            )}

            <BsFillSkipEndCircleFill
              onClick={skipNext}
              className="text-4xl text-gray-400 hover:text-white cursor-pointer"
            />
            <BsShuffle
              onClick={toggleShuffle}
              className={`text-2xl cursor-pointer ${
                shuffle ? "text-[#14DD94]" : "text-white hover:text-[#14DD94]"
              }`}
            />
          </div>
          <audio ref={audioElem} onTimeUpdate={onPlaying}>
            <source src={currentSong.url}></source>
          </audio>
          <div className="flex flex-row items-center gap-x-2">
            <p className="time">{calculateTime(currentTime)}</p>

            {/* The play bar starts*/}
            <div className="w-[75%]">
              <div
                className="min-w-full h-[5px] rounded-[5px] bg-[#777777C7] cursor-pointer"
                onClick={checkWidth}
                ref={clickRef}
              >
                <div
                  className="seek_bar"
                  style={{ width: `${currentSong.progress + "%"}` }}
                ></div>
              </div>
            </div>
            {/* The play bar ends*/}

            <p className="time">{calculateTime(totalDuration)}</p>
          </div>
          <div className="flex flex-row items-center gap-x-1 justify-end mt-4">
            {volume <= 0 ? (
              <BsVolumeMute
                onClick={unMute}
                className="text-2xl text-gray-400 hover:text-white cursor-pointer"
              />
            ) : (
              <BsVolumeDown
                onClick={mute}
                className="text-2xl text-[#14DD94] hover:text-white cursor-pointer"
              />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
