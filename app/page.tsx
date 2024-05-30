import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="md:flex md:h-[500px] md:gap-8 md:bg-[#EA1D2C]">
        <div className="md:flex md:flex-1 md:flex-col md:items-start md:gap-7 md:px-32 md:py-32">
          <div className="md:flex md:flex-col md:gap-4">
            <h1 className="max-sm:hidden md:text-5xl md:font-bold md:text-white">
              Está com fome?
            </h1>
            <p className="max-sm:hidden md:text-lg md:text-white">
              Com apenas alguns cliques, encontre refeições acessiveis perto de
              você.
            </p>
          </div>
          <div className="max-sm:px-5 max-sm:pt-6 md:w-full">
            <Search />
          </div>
        </div>

        <div className="md:relative md:right-20 md:top-[147px] md:flex-1">
          <Image
            src="/hero-banner.png"
            alt="Pizza imagem"
            fill
            className="max-sm:hidden md:absolute md:left-1/2 md:top-1/2 md:mx-auto md:max-h-[371px] md:max-w-[371px] md:object-contain"
          />
        </div>
      </div>

      <div className="px-5 pt-5">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
