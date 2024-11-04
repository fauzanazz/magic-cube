"use client"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import simplify from 'simplify-js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface AnnealingPlotProps {
    data: ChartData[];
}

export interface ChartData {
    iteration: number;
    probability: number;
}

export function AnnealingPlot({ data }: AnnealingPlotProps) {
    const plotData = data
        ? data.map((item) => ({
            x: item.iteration,
            y: item.probability,
        }))
        : [];

    let intensity = 0.1;
    let smoothedPlotData: { x: number; y: number }[] = plotData;

    while (smoothedPlotData.length > 5000) {
        smoothedPlotData = simplify(plotData, intensity, true);
        intensity += 0.1;
    }

    const finalPlotData = smoothedPlotData.map((item) => ({
        iteration: item.x,
        probability: item.y,
    }));

    const chartData = {
        labels: finalPlotData.map(item => `Iteration ${item.iteration}`),
        datasets: [
            {
                label: 'Probability',
                data: finalPlotData.map(item => item.probability),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.4)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Iteration',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Probability',
                },
            },
        },
    };

    if (!data.length) {
        return null;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Probability Chart</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-w-[80%]">
                        <Line data={chartData} options={options} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}