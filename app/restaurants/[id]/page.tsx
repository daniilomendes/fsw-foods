import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import RestaurantImage from "./_components/restaurants-image";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 6,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <div className="max-sm:hidden">
        <Header />
      </div>

      <div className="md:container md:mb-8">
        <div className="flex flex-row">
          <div className="md:min-h-full md:w-3/5">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>

          <div className="md:w-[40%]">
            <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>

            <div className="mt-3 flex gap-4 px-5 max-sm:overflow-x-scroll md:grid md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                >
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold  max-sm:px-5">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="font-semibold  max-sm:px-5">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantPage;
