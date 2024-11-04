import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

const MusicLoader = () => {
  
  const playlist = [
    '/music/BesokMingguOst1.mp3',
    '/music/BesokMingguOst2.mp3',
  ];
  
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const playNextTrack = () => {
    
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    
  };

  useEffect(() => {
    try{

        const audio = audioRef.current;
        if(!audio){
            return;
        }
        // Load the initial track
        audio.src = playlist[currentTrack];
        audio.volume = volume;
    
        const playAudio = () => {
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        };
    
        const handleCanPlayThrough = () => {
          playAudio();
        };
    
        // Add event listeners
        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('ended', playNextTrack);    
        return () => {
          audio.removeEventListener('ended', playNextTrack);
          audio.pause(); 
        };
    }catch(e){
        console.log(e)
    }
  }, [currentTrack, volume, playlist]);

  return (
    <div className='flex flex-col gap-4 mt-7'>
    <h1 className="text-3xl text-white text-center font-bold">
        Music Controller
    </h1>
      <Button onClick={() => audioRef.current.play()} className="text-xl font-semibold py-4 w-full bg-white text-black flex flex-row gap-x-4">
            <h2>Play</h2></Button>
      <Button onClick={() => audioRef.current.pause()} className="text-xl font-semibold py-4 w-full bg-white text-black flex flex-row gap-x-4">
            <h2>Pause</h2></Button>
        <Button onClick={() => playNextTrack()} className="text-xl font-semibold py-4 w-full bg-white text-black flex flex-row gap-x-4">
        <h2>Next Track</h2></Button>
    </div>
  );
};

export default MusicLoader;