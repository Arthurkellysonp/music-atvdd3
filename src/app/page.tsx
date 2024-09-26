'use client'

import { useContext, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp, FaVolumeDown, FaBalanceScale } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import { musics } from "./dados/music";

export default function Home() {
  const {
    playing,
    volume,
    muted,
    currentTime,
    totalTime,
    panner,
    audioIndex,
    configPlayPause,
    configAudio,
    configAudioIndex,
    configVolume,
    configPanner,
    configCurrentTime,
    configMuted
  } = useContext(HomeContext);

  useEffect(() => {
    configAudio();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-b from-gray-100 to-white">
      <h1 className="text-3xl font-bold mb-4">{playing ? 'Playing' : 'Paused'}</h1>
      <h2 className="text-xl mb-2">{musics[audioIndex].description}</h2>
      <img src={musics[audioIndex].image} alt={musics[audioIndex].name} className="w-64 h-64 rounded-lg shadow-lg mb-4" />
      
      <div className="flex flex-col items-center mb-5">
        <div className="flex space-x-4">
          <button onClick={() => configMuted()} className="p-2 hover:bg-gray-200 rounded">
            {muted ? <FaVolumeOff className="text-[50px] text-[tomato]" /> : <FaVolumeUp />}
          </button>
          
          <button onClick={() => configPlayPause()} className="p-2 hover:bg-gray-200 rounded">
            {playing ? <FaPause className="text-[50px] text-[tomato]" /> : <FaPlay />}
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <FaVolumeDown className="text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={volume}
              onChange={(e) => configVolume(Number(e.target.value))}
              className="w-full mt-2"
            />
            <FaVolumeUp className="text-gray-500" />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <FaBalanceScale className="text-gray-500" />
            <input 
              type="range" 
              min="-1" 
              max="1" 
              value={panner}
              onChange={e => configPanner(Number(e.target.value))}
              step="0.01" 
              className="w-full mt-2" 
            />
            <span className="text-gray-500">Estéreo</span>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <span className="text-gray-500">{Math.floor(currentTime)}s</span>
            <input 
              type="range"
              min="0"
              max={totalTime}
              value={currentTime}
              onChange={e => configCurrentTime(Number(e.target.value))}
              className="w-full mt-2"
            />
            <span className="text-gray-500">{Math.floor(totalTime)}s</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {
          musics.map((music, index) => (
            <div key={index} onClick={() => configAudioIndex(index)} className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300">
              <img src={music.image} alt={music.name} className="w-full h-32 object-cover rounded-t-lg mb-2" />
              <h1 className="font-bold">{music.name}</h1>
              <p className="text-gray-600">{music.author}</p>
            </div>
          ))
        }
      </div>
    </main>
  );
}
