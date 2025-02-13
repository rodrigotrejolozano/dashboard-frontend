import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import useGetMetricsAllProducts from "../../hooks/use-metrics-all-products";

const SkeletonChart = () => (
    <div className="w-full h-[250px] bg-gray-300 animate-pulse rounded-md"></div>
);

const TotalProductsChart: React.FC = () => {
    const { allProducts, getMeticsAllProducts, state } = useGetMetricsAllProducts();

    useEffect(() => {
        getMeticsAllProducts({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <h2 className="text-lg font-semibold mb-2">Total de Productos</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "indicator",
                        mode: "gauge+number",
                        value: allProducts || 0,
                        title: { text: "Productos Totales" },
                    }]}
                    layout={{
                        autosize: true,

                        margin: { t: 50, r: 50, b: 50, l: 50 }

                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: 300 }}
                />
            )}
        </div>
    );
};

export default TotalProductsChart;
