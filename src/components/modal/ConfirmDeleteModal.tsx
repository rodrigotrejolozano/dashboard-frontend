import React from "react";
import useDeleteProduct from "../../hooks/use-delete-products";
import CustomModal from "../common/custom-modal";
import useGetAllProducts from "../../hooks/use-get-all-products";
import useStateDashboard from "../../hooks/use-state-dashboard";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, productId }) => {
  const { deleteProducts, state } = useDeleteProduct();
  const { getAllProducts } = useGetAllProducts();
  const { limit,handleSetPage } = useStateDashboard();

  const handleDelete = () => {
    deleteProducts(productId);
    setTimeout(() => {
      getAllProducts({ page: 1, limit: limit });
      handleSetPage(1);
    }, 500)
    onClose();
  }
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Eliminar Producto">
      <p>¿Estás seguro de que quieres eliminar este producto?</p>
      <div className="flex justify-between mt-4">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
        <button 
        onClick={handleDelete} 
        disabled={state.isLoading}
        className="bg-red-500  text-white px-4 py-2 gap-1 flex w-fullrounded">
        {state.isLoading ? 
        <>
          <SpinnerIcon /> 
            Eliminando...
        </>
        : "Eliminar"}
        </button>
      </div>
    </CustomModal>
  );
};

export default ConfirmDeleteModal;
