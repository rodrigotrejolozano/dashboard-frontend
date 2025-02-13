import React, { useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import useGetMetricsAverage from "../../hooks/use-metrics-average-stock";

const SkeletonChart = () => (
    <div className="w-full h-[220px] bg-gray-300 animate-pulse rounded-md"></div>
);

const AverageStockChart: React.FC = () => {
    const { allAverageStock, getAverageStock, state } = useGetMetricsAverage();
    const chartRef = useRef(null);

    useEffect(() => {
        getAverageStock({});
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={chartRef}
            className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30 mx-auto w-full"
        >
            <h2 className="text-lg font-semibold mb-2 text-center">Stock Promedio</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "bar",
                        y: [allAverageStock || 0],
                        x: ["Stock Promedio"],
                        orientation: "v",
                        marker: { color: "blue" },
                    }]}
                    layout={{
                        autosize: true,
                        margin: { t: 10, r: 20, b:40, l: 30 }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: 300}}
                />
            )}
        </div>
    );
};

export default AverageStockChart;
