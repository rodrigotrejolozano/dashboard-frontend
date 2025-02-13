import { configureStore } from '@reduxjs/toolkit'
import getOneProductReducer from '../slices/products-one-slice'
import createProductReducer from '../slices/products-create-slice'
import getAllProductReducer from '../slices/products-all-slice'
import deleteProductReducer from '../slices/products-delete-slice'
import updateProductReducer from '../slices/products-update-slice'
import stateDashboardReducer from '../slices/state-dashboard-slice'
import metricsAllProducts from '../slices/metrics-all-products-slice'
import metricsAllRevenue from '../slices/metrics-all-revenue-slice'
import metricsAverageStock from '../slices/metrics-average-stock-slice'
import metricsPriceDistribution from '../slices/metrics-price-distribution-slice'
import metricsStockVSPrice from '../slices/metrics-stock-vs-price-slice'
import metricsTopExpensiveProducts from '../slices/metrics-top-expensive-products-slice'

export const store = configureStore({
    reducer: {
        getOnProducts: getOneProductReducer,
        getAllProducts: getAllProductReducer,
        createProduct: createProductReducer,
        deleteProduct: deleteProductReducer,
        updateProduct: updateProductReducer,
        stateDashboard: stateDashboardReducer,
        getMetricsAllProducts: metricsAllProducts,
        getMetricsAllRevenue: metricsAllRevenue,
        getMetricsAverageStock: metricsAverageStock,
        getMetricsTopExpensiveProducts: metricsTopExpensiveProducts,
        getMetricsPriceDistribution: metricsPriceDistribution,
        getMetricsPriceVsStock: metricsStockVSPrice

    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
