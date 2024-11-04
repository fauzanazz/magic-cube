"use server";

import NavController from "@/components/result/nav-controller";
import {promises as fs} from "fs";
import {State} from "@/types/state";
import VideoPlayer from "@/components/result/video-player/video-container";


export default async function Home() {
    const datafile = await fs.readFile(process.cwd() + '/public/external-data/data.json', 'utf8');
    const data = JSON.parse(datafile);
    const stateAwal: State = data?.firstState ?? [];

    const cubeFile = await fs.readFile(process.cwd() + '/public/external-data/cube-data.json', 'utf8');
    const cubeData = JSON.parse(cubeFile);
    const cubeDataParsed = cubeData?.allState ?? [];
    const parsedData: State[] = cubeDataParsed.map((cube: State, index: number) => {
        return cube.map((value: number, index: number) => {
            return [index + 1, value];
        });
    });

    return (
        <div className="font-pixelify">
            <NavController/>
            <div className="flex justify-center">
                <VideoPlayer stateAwal={stateAwal} cubeData={parsedData}/>
            </div>
        </div>
    );
};
