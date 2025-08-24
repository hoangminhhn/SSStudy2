"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock, HelpCircle, Gift } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { showSuccess } from "@/utils/toast";

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
  const [claimed, setClaimed] = React.useState(false);
  const [giftActive, setGiftActive] = React.useState(true);

  const handleClaim = () => {
    if (claimed) return;
    setClaimed(true);
    setGiftActive(false);
    showSuccess("Bạn đã nhận quà: Voucher 200.000đ — kiểm tra trong tài khoản của bạn!");
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <img src={imageUrl} alt="Livestream Thumbnail" className="w-full h-auto rounded-lg object-cover mb-4" />
      <div className="flex items-baseline justify-start mb-2">
        <span className={`text-4xl font-bold text-v3-primary mr-2 ${giftActive ? "animate-pulse" : ""}`}>{currentPrice}</span>
        <span className="text-xl text-v3-text-muted line-through">{oldPrice}</span>
      </div>
      <p className="flex items-center justify-start text-v3-primary font-semibold mb-4">
        <Clock size={18} className="mr-2" />
        Kết thúc sau {countdown}
      </p>
      <p className="text-left text-v3-text-muted text-sm mb-4">
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
        <ul className="space-y-2 text-v3-text-default mb-4">
          {includedItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-v3-text-muted rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <p className="text-sm">{item}</p>
            </li>
          ))}
        </ul>

        {/* Time section */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-v3-text-default mb-2">Thời gian</h4>
          <div className="text-sm text-v3-text-muted space-y-1">
            <div>
              <span className="font-medium text-v3-text-default">Ngày khai giảng: </span>
              <span>07/07/2025</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-v3-text-default">Ngày bế giảng: </span>
              <span className="ml-2">10/07/2025</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2 text-gray-400 hover:text-gray-600" aria-label="Giải thích ngày bế giảng">
                      <HelpCircle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Ngày bế giảng là ngày kết thúc chính thức của khóa học, sau ngày này nội dung livestream chính thức sẽ kết thúc.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Gift/promotion section (updated layout per image) */}
          <div className="mt-4 border rounded-md p-3 bg-yellow-50">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-md bg-white text-yellow-600 shadow-sm flex items-center justify-center ${giftActive ? "animate-bounce" : ""
                    }`}
                  aria-hidden
                >
                  <Gift size={20} />
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-sm font-semibold text-v3-text-default">Quà tặng trị giá</span>
                  <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                    800k
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleClaim}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${claimed ? "bg-gray-200 text-gray-700" : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  aria-pressed={claimed}
                >
                  {claimed ? "Đã nhận" : "Nhận quà"}
                </button>
              </div>
            </div>

            {/* Row 2 */}
            <div className="mt-3 bg-white border border-gray-200 rounded-md p-3 flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
              <div className="text-sm text-v3-text-default truncate">
                Khóa: Master HSA - giai đoạn 1 năm học 2025 (được tặng)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoursePurchaseCardV3;