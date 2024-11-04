"use client"

import React, { useState, useEffect } from 'react';
import VideoControls from "@/components/result/video-player/video-controls";
import CubeDisplay from "@/components/result/video-player/video-cube";
import {State} from "@/types/state";

interface VideoPlayerProps {
    stateAwal: State;
    cubeData: State[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stateAwal, cubeData }) => {

    const [CubeNumbers, setCubeNumbers] = useState<State>(stateAwal);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    console.log(cubeData);

    // Play the video
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 124 ? prev + 1 : 0));
            }, 1000 / playbackSpeed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed]);

    // Progress the video
    useEffect(() => {
        if (cubeData[progress]) {
            setCubeNumbers(cubeData[progress]);
            console.log(cubeData[progress]);
        } else {
            console.warn(`No data at index ${progress}`);
        }
    }, [cubeData, progress]);

    return (
        <div className="video-player w-screen">
            <CubeDisplay cubeNumbersData={CubeNumbers}/>
            <VideoControls
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                progress={progress}
                setProgress={setProgress}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        </div>
    );
};

export default VideoPlayer;
