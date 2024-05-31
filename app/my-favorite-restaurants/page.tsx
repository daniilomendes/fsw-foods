import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItems from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="py-6 md:container max-sm:px-5">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-3">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItems
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};
export default MyFavoriteRestaurants;
