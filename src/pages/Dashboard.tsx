import TabProductComponent from "../components/table/TableProduct";
import AverageStockChart from "../components/draws/AverageStockChart";
import PriceDistributionChart from "../components/draws/PriceDistributionChart";
import StockVsPriceChart from "../components/draws/StockVsPriceChart";
import TopExpensiveProductsChart from "../components/draws/TopExpensiveProductsChart";
import TotalProductsChart from "../components/draws/TotalProductsChart";
import TotalRevenueChart from "../components/draws/TotalRevenueChart";
import CardTotalRevenue from "../components/draws/CardTotalRevenue";
import CardTotalProducts from "../components/draws/CardTotalProducts";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {import.meta.env.REACT_APP_API_URL}
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="bg-white ">
        <TabProductComponent />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardTotalProducts />
        <CardTotalRevenue />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TotalProductsChart />
        <TotalRevenueChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AverageStockChart />
        <PriceDistributionChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockVsPriceChart />
        <TopExpensiveProductsChart />
      </div>
    </div>
  );
};

export default Dashboard;
