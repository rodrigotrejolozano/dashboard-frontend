import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import useGetMetricsTopExpensiveProducts from "../../hooks/use-metrics-top-expensive-products";

const SkeletonChart = () => (
    <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-md"></div>
);

const TopExpensiveProductsChart: React.FC = () => {
    const { products, getTopExpensiveProducts, state } = useGetMetricsTopExpensiveProducts();

    useEffect(() => {
        getTopExpensiveProducts({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <h2 className="text-lg font-semibold mb-2">Top 5 Productos Más Caros</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "bar",
                        x: products?.map((p) => p.price) || [],
                        y: products?.map((p) => p.name) || [],
                        orientation: "h",
                        marker: { color: "red" },
                    }]}
                    layout={{
                        autosize: true,
                        margin: { t: 10, r: 20, b: 40, l: 30 }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: 300}}
                />
            )}
        </div>
    );
};

export default TopExpensiveProductsChart;
