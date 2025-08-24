"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock } from "lucide-react";

interface CoursePurchaseCardV3Props {
  imageUrl: string;
  currentPrice: string;
  oldPrice: string;
  countdown: string;
  promoText: string;
  includedItems: string[];
}

const CoursePurchaseCardV3: React.FC<CoursePurchaseCardV3Props> = ({
  imageUrl,
  currentPrice,
  oldPrice,
  countdown,
  promoText,
  includedItems,
}) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <img src={imageUrl} alt="Livestream Thumbnail" className="w-full h-auto rounded-lg object-cover mb-4" />
      <div className="flex items-baseline justify-start mb-2"> {/* Changed justify-center to justify-start */}
        <span className="text-4xl font-bold text-v3-primary mr-2">{currentPrice}</span>
        <span className="text-xl text-v3-text-muted line-through">{oldPrice}</span>
      </div>
      <p className="flex items-center justify-start text-v3-primary font-semibold mb-4"> {/* Changed justify-center to justify-start */}
        <Clock size={18} className="mr-2" />
        Kết thúc sau {countdown}
      </p>
      <p className="text-left text-v3-text-muted text-sm mb-4"> {/* Changed text-center to text-left */}
        {promoText}
      </p>

      <div className="flex space-x-3 mb-6">
        <Button variant="outline" className="flex-1 text-v3-secondary border-v3-secondary hover:bg-v3-secondary/10 rounded-full py-3">
          <ShoppingCart size={18} className="mr-2" />
          Thêm vào giỏ hàng
        </Button>
        <Button className="flex-1 bg-v3-primary hover:bg-v3-primary/90 text-v3-primary-foreground rounded-full py-3">
          Mua ngay
        </Button>
      </div>

      <div className="border-t border-v3-border pt-6">
        <h3 className="text-lg font-bold text-v3-text-default mb-3">Khóa học này bao gồm</h3>
        <ul className="space-y-2 text-v3-text-default">
          {includedItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-v3-text-muted rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <p className="text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default CoursePurchaseCardV3;