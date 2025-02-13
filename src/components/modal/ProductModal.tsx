import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../common/custom-modal";
import { CreateProductInputs, CreateProductSchema } from "../schemas/productSchema";
import useCreateProduct from "../../hooks/use-create-products";
import useUpdateProduct from "../../hooks/use-update-products";
import { IProducts } from "../../types/products-types";
import useGetAllProducts from "../../hooks/use-get-all-products";
import useStateDashboard from "../../hooks/use-state-dashboard";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: IProducts;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const isEditing = !!product;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProductInputs>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: isEditing ? product?.name : "",
      price: isEditing ? product?.price : 0,
      stock: isEditing ? product?.stock : 0
    }
  });

  useEffect(() => {
    if (isEditing && product) {
      reset(product);
    }
  }, [product, reset, isEditing]);

  const { limit } = useStateDashboard();
  const { createProducts, state: stateCreate } = useCreateProduct();
  const { updateProducts, state: stateUpdate } = useUpdateProduct();
  const { getAllProducts } = useGetAllProducts();

  const onSubmit = (data: CreateProductInputs) => {
    if (isEditing) {
      updateProducts({ id: product?.id as number, ...data });
    } else {
      createProducts(data);
    }
    setTimeout(() => {
      getAllProducts({ page: 1, limit: limit });
    }, 500);
    reset();
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Producto" : "Crear Producto"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2 bg-white bg-opacity-30  border border-white/30">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre del Producto</label>
          <input
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Precio</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Stock</label>
          <input
            type="number"
            min={0}
            {...register("stock")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={stateCreate.isLoading || stateUpdate.isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md flex gap-2 items-center hover:bg-blue-600 transition cursor-pointer"
          >
            {stateCreate.isLoading || stateUpdate.isLoading ? (
              <>
                <SpinnerIcon /> Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default ProductModal;
