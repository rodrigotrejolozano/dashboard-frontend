import React, { useEffect } from "react";
import CustomModal from "../common/custom-modal";
import useGetProducts from "../../hooks/use-get-products";
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const DetailProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, id }) => {
    const { getOneProducts, product, state} = useGetProducts();
   
    useEffect(() => {
        if (isOpen) getOneProducts({ id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title={"Detalle del producto"}>
            <div>
                {state.isLoading ? (
                    <div
                    className="flex justify-center items-center h-20"
                    >
                        cargando...
                    </div>
                    
                ) : (
                    <div>
                        <p>Nombre: {product?.name}</p>
                        <p>Precio: {product?.price}</p>
                        <p>Stock: {product?.stock}</p>
                    </div>
                )}
            </div>
        </CustomModal>
    );
};

export default DetailProductModal;
