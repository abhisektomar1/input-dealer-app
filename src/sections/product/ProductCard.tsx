import React from "react";
import { Button } from "../../components/ui/button";
import { BASE_URL_APP } from "../../utils";

function ProductCard({item}:any) {
  return (
    <div className="flex w-[220px] flex-col p-2 shadow-lg hover:shadow-2xl">
    <img src={`${BASE_URL_APP}${item.product_image}`} className="w-[204px] h-[262px] object-contain border border-gray-100" />
    <h6 className="font-roboto text-[15px] leading-[32px] self-start font-medium tracking-[0.15px]">
      {item.productName}
    </h6>
    <div className="flex flex-row items-center justify-between my-3">
      <h6 className="font-roboto text-[15px] leading-[32px] self-start font-normal tracking-[0.15px]">
        ₹{item.price}
      </h6>
      <h6 className="font-roboto text-[15px] leading-[32px] self-start font-normal tracking-[0.15px]">
        {item.quantity} Pieces
      </h6>
    </div>
    <Button variant="outline" className="rounded border-primary text-primary hover:text-white hover:bg-primary">Use As Sample</Button>
  </div>
  );
}

export default ProductCard;
