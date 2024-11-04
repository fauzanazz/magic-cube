"use server"

import NavController from "@/components/result/nav-controller";
import DescriptionDisplay from "@/components/result/experiment-description/description-display";
import { AnnealingPlot, ChartData } from "@/components/result/annealing-plot";
import { promises as fs } from 'fs';

export default async function Home() {
    const file = await fs.readFile(process.cwd() + '/public/external-data/data.json', 'utf8');
    const data = JSON.parse(file);

    const selectedAlgorithm = data?.algorithm ?? "";
    const mappedData = data?.description
        ? Object.entries(data.description).map(([key, value]) => ({
            title: key,
            value: value?.toString() || "",
        }))
        : [];
    const plotData = data?.plotData
        ? data.plotData.map((plot: ChartData[]) => ({
            iteration: plot[0],
            probability: plot[1]
        }))
        : [];

    return (
        <main className="font-pixelify">
            <NavController />
            <h1 className="text-4xl p-10 font-bold">Deskripsi</h1>
            <DescriptionDisplay
                algorithm={selectedAlgorithm}
                data={mappedData}
            />
            <AnnealingPlot data={plotData} />
        </main>
    );
}