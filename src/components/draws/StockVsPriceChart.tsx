import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import useGetMetricsStockVSPrice from "../../hooks/use-metrics-stock-vs-price";

const SkeletonChart = () => (
    <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-md"></div>
);

const StockVsPriceChart: React.FC = () => {
    const { stockVsPrice, getPriceVSStock, state } = useGetMetricsStockVSPrice();

    useEffect(() => {
        getPriceVSStock({});
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <h2 className="text-lg font-semibold mb-2">Stock vs Precio</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "scatter",
                        mode: "markers",
                        x: stockVsPrice?.map((p) => p.price) || [],
                        y: stockVsPrice?.map((p) => p.stock) || [],
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

export default StockVsPriceChart;
