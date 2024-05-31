import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./components/product-image";
import ProductDetails from "./components/product-details";
import Header from "@/app/_components/header";
import ProductList from "@/app/_components/product-list";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="max-sm:hidden">
        <Header />
      </div>
      <div className="md:container md:mb-8">
        <div className="flex flex-row">
          <div className="md:min-h-full md:w-1/2">
            <ProductImage product={product} />
          </div>

          <ProductDetails product={product} complementaryProducts={juices} />
        </div>
      </div>
      <div className="md:container max-sm:hidden md:mb-8">
        <div className="mt-6 space-y-3 md:container">
          <h3 className="font-semibold max-sm:px-5">Sucos</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
