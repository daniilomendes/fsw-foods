import React from "react";
import { Card } from "./ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFree" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around px-5 py-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>

        {Number(restaurant.deliveryFree) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFree))}
          </p>
        ) : (
          <p className="text-xs font-semibold">Grátis</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
