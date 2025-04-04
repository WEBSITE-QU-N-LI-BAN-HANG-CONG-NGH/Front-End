import React from "react";
import StatsCard from "./StatsCard"

const OverviewTab = () => {
  return (
    <div className="grid gap-5 mb-6 grid-cols-[repeat(4,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
              <StatsCard
                title="Tổng doanh thu"
                value="156,300,000đ"
                change="+20.1%"
                isPositive={true}
              />
              <StatsCard
                title="Lợi nhuận"
                value="42,850,000đ"
                change="+15.3%"
                isPositive={true}
              />
              <StatsCard
                title="Giá trị đơn hàng TB"
                value="2,730,000đ"
                change="+7.2%"
                isPositive={true}
              />
              <StatsCard
                title="Tỷ lệ hoàn đơn"
                value="2.4%"
                change="+0.5%"
                isPositive={false}
              />
            </div>
  );
};

export default OverviewTab;