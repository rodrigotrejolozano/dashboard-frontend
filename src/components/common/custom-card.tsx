import { FC } from "react";

interface CustomCardProps {
    title: string;
    value: string;
    description: string;
    isLoading?: boolean;
}

const CustomCard: FC<CustomCardProps> = ({ title, value, description, isLoading }) => {
    return (
        <div className="p-4 min-w-[150px] w-fit bg-white m-2 bg-opacity-30 backdrop-blur-md rounded-lg shadow-md border border-white/30 transition-all duration-300">
            {isLoading ? (
                <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-[150px]"></div>
                    <div className="h-8 bg-gray-300 rounded w-[150px]"></div>
                    <div className="h-4 bg-gray-300 rounded w-[150px]"></div>
                </div>
            ) : (
                <>
                        <h2 className="text-lg font-semibold min-w-[150px]  mb-2 text-gray-800">{title}</h2>
                        <p className="text-2xl font-semibold min-w-[150px]  text-gray-900">{value}</p>
                        <p className="text-sm text-gray-600 min-w-[150px] ">{description}</p>
                </>
            )}
        </div>
    );
};

export default CustomCard;
