import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 max-sm:overflow-x-scroll max-sm:px-5 md:grid md:grid-cols-6 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          className="lg:w-[200px] lg:min-w-[200px]"
        />
      ))}
    </div>
  );
};

export default ProductList;
