"use server";

import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";
import {State} from "@/types/state";
import {promises as fs} from 'fs';

export default async function Home() {
    const file = await fs.readFile(process.cwd() + '/public/external-data/data.json', 'utf8');
    const data = JSON.parse(file);
    const stateAwal: State = data?.firstState ?? [];

    return (
        <div className="font-pixelify">
            <NavController/>
            <StateDisplay title="State Awal" content={MagicCube} data={stateAwal}/>
        </div>
    );
};
