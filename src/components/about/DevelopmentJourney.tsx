"use client";

import React from "react";

const DevelopmentJourney: React.FC = () => {
  return (
    <section aria-labelledby="development-journey-heading" className="py-12">
      <div className="container mx-auto px-4">
        <h2
          id="development-journey-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-6"
        >
          Chặng đường phát triển
        </h2>

        {/* Make the content width match the hero above by using a wider max width */}
        <div className="max-w-6xl mx-auto text-gray-700 leading-relaxed space-y-6">
          <p>
            Thành lập từ tâm huyết và niềm tin vào sức mạnh giáo dục, SSStudy đã trải qua nhiều giai đoạn phát triển
            quan trọng để trở thành một trong những thương hiệu giáo dục được tin tưởng tại Việt Nam. Mỗi bước đi đều
            được hoạch định bài bản, từ thiết kế chương trình đến tuyển chọn đội ngũ giảng viên chất lượng cao.
          </p>

          <p>
            Chúng tôi không chỉ tập trung vào kiến thức chuyên môn mà còn đầu tư vào phương pháp giảng dạy, công nghệ
            hỗ trợ học tập và tài liệu luyện thi thực tế, giúp học sinh vừa hiểu sâu vừa làm nhanh các dạng đề.
            Đó là lý do nhiều học sinh của SSStudy đạt kết quả vượt trội trong các kỳ thi quan trọng.
          </p>

          <div className="w-full">
            <div className="mx-auto max-w-6xl">
              <img
                src="/images/changduong.png"
                alt="Chặng đường phát triển"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          <p>
            Trong từng giai đoạn, SSStudy luôn lắng nghe phản hồi từ học sinh và phụ huynh để hoàn thiện chương trình.
            Những cải tiến liên tục về nội dung, hệ thống bài tập và phương pháp giảng dạy đã tạo nên bước tiến rõ rệt
            về chất lượng giảng dạy.
          </p>

          <p>
            Hướng tới tương lai, SSStudy tiếp tục mở rộng hợp tác, ứng dụng công nghệ hiện đại và phát triển thêm nhiều
            chương trình phù hợp với mọi lứa tuổi và mục tiêu học tập, cam kết đồng hành cùng học sinh trên hành trình
            chinh phục tri thức.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentJourney;