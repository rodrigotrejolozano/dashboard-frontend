import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import useGetMetricsAllRevenue from "../../hooks/use-metrics-all-revenue";

const SkeletonChart = () => (
    <div className="w-full h-[250px] bg-gray-300 animate-pulse rounded-md"></div>
);

const TotalRevenueChart: React.FC = () => {
    const { allRevenue, getAllRevenue, state } = useGetMetricsAllRevenue();

    useEffect(() => {
        getAllRevenue({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <h2 className="text-lg font-semibold mb-2">Total de Ingresos</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "indicator",
                        mode: "gauge+number",
                        value: allRevenue || 0,
                        title: { text: "Ingresos Totales" },
                    }]}
                    layout={{
                        autosize: true,
                        margin: { t: 10, r: 20, b: 40, l: 30 }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: 300 }}
                />
            )}
        </div>
    );
};

export default TotalRevenueChart;
