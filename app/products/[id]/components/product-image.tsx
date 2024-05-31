"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[360px] w-full md:min-h-[500px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        className="object-cover md:rounded-md"
      />

      <Button
        onClick={handleBackClick}
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
