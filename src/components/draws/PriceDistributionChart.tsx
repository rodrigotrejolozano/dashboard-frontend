// import React, { useEffect } from "react";
// import Plot from "react-plotly.js";
// import useGetMetricsPriceDistribution from "../../hooks/use-metrics-price-distribution";

// const PriceDistributionChart: React.FC = () => {
//     const { priceDistribution, getPriceDistribution, state } = useGetMetricsPriceDistribution();

//     useEffect(() => {
//         getPriceDistribution({});
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Distribución de Precios</h2>
//             {state.isLoading ? (
//                 <>
//                     cargando...
//                 </>
//             ) : (
//                 <Plot
//                     data={[
//                         {
//                             type: "bar",
//                             x: Object.keys(priceDistribution || {}),
//                             y: Object.values(priceDistribution || {}),
//                             marker: { color: "green" },
//                         },
//                     ]}
//                     layout={{ width: 400, height: 300 }}
//                 />
//             )}
//         </div>
//     );
// };

// export default PriceDistributionChart;

import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import useGetMetricsPriceDistribution from "../../hooks/use-metrics-price-distribution";

const SkeletonChart = () => (
    <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-md"></div>
);

const PriceDistributionChart: React.FC = () => {
    const { priceDistribution, getPriceDistribution, state } = useGetMetricsPriceDistribution();

    useEffect(() => {
        getPriceDistribution({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-5 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <h2 className="text-lg font-semibold mb-2">Distribución de Precios</h2>
            {state.isLoading ? <SkeletonChart /> : (
                <Plot
                    data={[{
                        type: "bar",
                        x: Object.keys(priceDistribution || {}),
                        y: Object.values(priceDistribution || {}),
                        marker: { color: "green" },
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

export default PriceDistributionChart;
