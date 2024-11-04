import React from "react";

const VideoControls = ({
                           playbackSpeed,
                           setPlaybackSpeed,
                           progress,
                           setProgress,
                           setIsPlaying
                       }: {
    playbackSpeed: number,
    setPlaybackSpeed: React.Dispatch<React.SetStateAction<number>>,
    progress: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    isPlaying?: boolean
}) => {
    return (
        <div className="flex justify-center absolute bottom-10 w-screen gap-x-8">
            <button onClick={() => setIsPlaying(true)}>Play</button>
            <button onClick={() => setIsPlaying(false)}>Stop</button>
            <label>
                Playback Speed:
                <select value={playbackSpeed} onChange={(e) => setPlaybackSpeed(Number(e.target.value))}>
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                </select>
            </label>
            <input
                type="range"
                min="0"
                max="124"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
            />
        </div>
    );
};

export default VideoControls;