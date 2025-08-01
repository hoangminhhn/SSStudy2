"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock } from "lucide-react";

interface CoursePurchaseCardProps {
  imageUrl: string;
  currentPrice: string;
  oldPrice: string;
  countdown: string;
  promoText: string;
  includedItems: string[];
}

const CoursePurchaseCard: React.FC<CoursePurchaseCardProps> = ({
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
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-4xl font-bold text-v2-primary mr-2">{currentPrice}</span>
        <span className="text-xl text-v2-text-muted line-through">{oldPrice}</span>
      </div>
      <p className="flex items-center justify-center text-v2-primary font-semibold mb-4">
        <Clock size={18} className="mr-2" />
        Kết thúc sau {countdown}
      </p>
      <p className="text-center text-v2-text-muted text-sm mb-4">{promoText}</p>

      <div className="flex space-x-3 mb-6">
        <Button variant="outline" className="flex-1 text-v2-secondary border-v2-secondary hover:bg-v2-secondary/10 rounded-full py-3">
          <ShoppingCart size={18} className="mr-2" />
          Thêm vào giỏ hàng
        </Button>
        <Button className="flex-1 bg-v2-primary hover:bg-v2-primary/90 text-v2-primary-foreground rounded-full py-3">
          Mua ngay
        </Button>
      </div>

      <div className="border-t border-v2-border pt-6">
        <h3 className="text-lg font-bold text-v2-text-default mb-3">Khóa học này bao gồm</h3>
        <ul className="space-y-2 text-v2-text-default">
          {includedItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-v2-text-muted rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <p className="text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default CoursePurchaseCard;