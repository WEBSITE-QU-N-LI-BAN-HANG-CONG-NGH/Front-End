import React, { useState, useEffect, useCallback } from "react"; // Thêm useCallback
import { Rating } from '@mui/material';
import { reviewService } from "../../../services/review.service";
import { authService } from "../../../services/auth.service";
// Bỏ import getUser từ Redux nếu không dùng

// Nhận thêm prop onRatingUpdate, initialAverageRating, initialTotalReviews
const ProductReviews = ({ productId, onRatingUpdate, initialAverageRating, initialTotalReviews }) => {
  const [reviews, setReviews] = useState([]);
  // Sử dụng giá trị khởi tạo từ props
  const [averageRating, setAverageRating] = useState(initialAverageRating || 0);
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews || 0);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState(""); // Tên SP có thể lấy từ fetchReviews
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const [ratingCounts, setRatingCounts] = useState([
    { stars: 5, count: 0 }, { stars: 4, count: 0 }, { stars: 3, count: 0 },
    { stars: 2, count: 0 }, { stars: 1, count: 0 }
  ]);

  // Sử dụng useCallback để tránh tạo lại hàm fetchReviews mỗi lần render
  // trừ khi productId hoặc onRatingUpdate thay đổi
  const fetchReviews = useCallback(async () => {
    if (!productId) return { averageRating: 0, totalReviews: 0 }; // Tránh lỗi nếu productId chưa có
    try {
      const response = await reviewService.getReviewsByProduct(productId);
      console.log('Response Reviews :>> ', response.data);
      const result = response.data;

      if (result.data) {
        const { reviews: fetchedReviews = [], averageRating: avgRating = 0, ratingDistribution = {}, productName: fetchedProductName = "", totalReviews: total = 0 } = result.data;

        // ... (phần format reviews giữ nguyên) ...
         const formattedReviews = fetchedReviews
          .map(review => ({
            id: review.id,
            userName: `${review.userFirstName} ${review.userLastName}`,
            userFirstName: review.userFirstName,
            userLastName: review.userLastName,
            rating: review.rating,
            comment: review.review,
            date: new Date(review.createdAt).toLocaleDateString('vi-VN'),
            createdAt: new Date(review.createdAt),
            verified: true,
            userId: review.userId
          }))
          .sort((a, b) => b.createdAt - a.createdAt);


        // ... (phần format rating counts giữ nguyên) ...
         const counts = [
          { stars: 5, count: ratingDistribution["5"] || 0 },
          { stars: 4, count: ratingDistribution["4"] || 0 },
          { stars: 3, count: ratingDistribution["3"] || 0 },
          { stars: 2, count: ratingDistribution["2"] || 0 },
          { stars: 1, count: ratingDistribution["1"] || 0 }
        ];

        // Cập nhật state nội bộ của ProductReviews
        setReviews(formattedReviews);
        setRatingCounts(counts);
        setAverageRating(avgRating);
        setProductName(fetchedProductName);
        setTotalReviews(total);

        // Gọi callback để cập nhật lên component cha (ProductDetail)
        if (onRatingUpdate) {
          onRatingUpdate(avgRating, total);
        }

        // Trả về giá trị mới để các hàm gọi nó có thể sử dụng nếu cần
        return { averageRating: avgRating, totalReviews: total };

      } else {
         // Xử lý trường hợp result.data không tồn tại hoặc rỗng
         setReviews([]);
         setRatingCounts([{ stars: 5, count: 0 }, { stars: 4, count: 0 }, { stars: 3, count: 0 }, { stars: 2, count: 0 }, { stars: 1, count: 0 }]);
         setAverageRating(0);
         setTotalReviews(0);
         if (onRatingUpdate) {
          onRatingUpdate(0, 0);
         }
         return { averageRating: 0, totalReviews: 0 };
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
       // Reset state về 0 nếu có lỗi
         setReviews([]);
         setRatingCounts([{ stars: 5, count: 0 }, { stars: 4, count: 0 }, { stars: 3, count: 0 }, { stars: 2, count: 0 }, { stars: 1, count: 0 }]);
         setAverageRating(0);
         setTotalReviews(0);
         if (onRatingUpdate) {
          onRatingUpdate(0, 0);
         }
      return { averageRating: 0, totalReviews: 0 }; // Trả về giá trị mặc định khi lỗi
    }
  }, [productId, onRatingUpdate]); // Thêm onRatingUpdate vào dependency array


  const fetchUser = async () => {
    // ... (fetchUser giữ nguyên) ...
     try {
      const response = await authService.getUserProfile();
      console.log('Response user profile in Review :>> ', response);
      if (response && response.data) {
        setCurrentUserId(response.data.id); // Lưu ID người dùng hiện tại
      } else {
         console.log('User data not found in response');
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // useEffect để fetch dữ liệu lần đầu
  useEffect(() => {
    if (productId) {
      fetchReviews(); // fetchReviews bây giờ sẽ tự gọi onRatingUpdate
      fetchUser();
    }
  }, [productId, fetchReviews]); // fetchReviews đã được bọc bởi useCallback

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // ... (kiểm tra userRating) ...
    if (userRating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit the review
       await reviewService.addReview({
        productId,
        rating: userRating,
        content: comment
      });

      // Reset form
      setUserRating(0);
      setComment("");
      setShowForm(false);

      // Fetch lại reviews, hàm này sẽ tự động cập nhật state và gọi onRatingUpdate
      await fetchReviews();

      // Reset to first page to see the new comment
      setCurrentPage(1);
      alert("Gửi đánh giá thành công!"); // Thông báo thành công

    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
     if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
        setIsDeleting(true);
        try {
           // Gọi API xóa đánh giá
           await reviewService.deleteReview(reviewId);

           // Fetch lại reviews, hàm này sẽ tự động cập nhật state và gọi onRatingUpdate
           await fetchReviews();

           // ... (Xử lý pagination sau khi xóa giữ nguyên) ...
           const newTotalFetchedReviews = reviews.length -1 > 0 ? reviews.length -1 : 0; // Lấy số lượng review mới nhất sau khi fetch
           const newTotalPages = Math.ceil(newTotalFetchedReviews / reviewsPerPage);
           if (currentPage > newTotalPages && currentPage > 1) {
             setCurrentPage(currentPage - 1);
           } else if (newTotalFetchedReviews === 0) {
             setCurrentPage(1); // Nếu không còn review nào, về trang 1
           }


        } catch (error) {
          console.error("Error deleting review:", error);
           alert("Có lỗi xảy ra khi xóa đánh giá: " + (error.response?.data?.message || error.message || "Lỗi không xác định"));
        } finally {
           setIsDeleting(false);
        }
     }
  };

  // ... (calculatePercentage, isCurrentUserReview, pagination logic giữ nguyên) ...
   // Calculate percentage for rating bars
   const calculatePercentage = (count) => {
     // Luôn dùng totalReviews từ state đã được cập nhật
     return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
   };

    // Check if the review belongs to current user
  const isCurrentUserReview = (review) => {
    // Nên so sánh bằng ID nếu có thể và đáng tin cậy
    return review.userId === currentUserId && currentUserId !== "";
  };

   // Get current page reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Calculate total pages based on the current reviews state length
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next and previous page handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

   // Pagination component
  const Pagination = () => {
     // Luôn tính totalPages dựa trên reviews.length hiện tại
     const totalPages = Math.ceil(reviews.length / reviewsPerPage);
     if (totalPages <= 1) return null;
     // ... (JSX của Pagination giữ nguyên) ...
       return (
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          «
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-3 py-1 rounded ${
              pageNumber === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          »
        </button>
      </div>
    );
  };


  return (
    <section className="px-10 py-10 bg-violet-50 max-md:p-5 mx-40 ml-60">
      {/* Hiển thị tên sản phẩm từ state */}
      <h2 className="text-xl font-medium mb-6">Đánh giá & Nhận xét {productName}</h2>

      <div className="flex gap-10 mb-8 max-md:flex-col">
        {/* Left side - Sử dụng averageRating và totalReviews từ state */}
        <div className="w-48 bg-white p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="text-4xl font-bold mb-2">{averageRating?.toFixed(1) || 0}/5</div>
          <Rating value={averageRating || 0} readOnly precision={0.5} size="large" />
          <div className="text-sm text-gray-500 mt-2">{totalReviews || 0} đánh giá và nhận xét</div>
        </div>

        {/* Right side - Sử dụng ratingCounts và totalReviews từ state */}
        <div className="flex-1">
           {/* Hiển thị rating counts */}
           {ratingCounts.map((item) => (
            <div key={item.stars} className="flex gap-2.5 items-center mb-2.5">
              <span className="w-6 text-sm">{item.stars}★</span>
              <div className="flex-1 h-2.5 rounded-md bg-zinc-100">
                <div
                  className="h-full bg-yellow-400 rounded-md"
                  style={{ width: `${calculatePercentage(item.count)}%` }}
                />
              </div>
              <span className="w-20 text-sm text-right">{item.count} đánh giá</span>
            </div>
          ))}
        </div>
      </div>

       {/* Review Form Toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 text-white bg-blue-600 cursor-pointer border-[none] rounded-md hover:bg-blue-700 mb-8"
        >
          Viết đánh giá của bạn
        </button>
      ) : (
         // ... (JSX của form giữ nguyên) ...
          <div className="bg-white p-5 rounded-lg shadow-sm mb-8">
          <h3 className="font-medium mb-4">Viết đánh giá của bạn</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Đánh giá sao:</label>
              <Rating
                name="user-rating"
                value={userRating}
                onChange={(event, newValue) => {
                  setUserRating(newValue ?? 0); // Đảm bảo không phải null/undefined
                }}
                size="large"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Nhận xét:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                disabled={isSubmitting}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 text-white bg-red-600 cursor-pointer border-[none] rounded-md hover:bg-red-700 disabled:bg-red-300"
                disabled={isSubmitting || userRating === 0} // Disable nếu chưa chọn sao
              >
                {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 text-gray-700 bg-gray-200 cursor-pointer border-[none] rounded-md hover:bg-gray-300 disabled:bg-gray-100"
                disabled={isSubmitting}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List - Sử dụng currentReviews */}
      <div className="space-y-4">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
             // ... (JSX của review item giữ nguyên, đảm bảo dùng isCurrentUserReview) ...
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{review.userName}</div>
                <div className="flex items-center">
                  {review.verified && (
                    <div className="text-green-600 text-xs mr-2">
                      <span className="mr-1">✓</span>
                      <span>Đã mua hàng</span>
                    </div>
                  )}
                  <span className="text-gray-500 text-xs">{review.date}</span>


                  {/* Delete button - only show for current user's reviews */}
                  {isCurrentUserReview(review) && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      disabled={isDeleting}
                      className="ml-3 text-red-600 hover:text-red-800 text-xs flex items-center"
                      title="Xóa đánh giá"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="ml-1">Xóa</span>
                    </button>
                  )}


                </div>
              </div>
              <div className="mb-2">
                <Rating value={review.rating} readOnly size="small" />
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          // ... (JSX khi không có review giữ nguyên) ...
             <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination />
    </section>
  );
};

export default ProductReviews;