import React, { useState, useEffect } from "react";

const RecipeReviews = ({ recipe }) => {
  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentRating, setCurrentRating] = useState(recipe.rating || 0);
  const [commentsCount, setCommentsCount] = useState(
    recipe.comments_count || 0
  );
  // const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const recipeId = recipe._id.$oid || recipe._id;
      const response = await fetch(
        `http://localhost:5000/api/comments/recipe/${recipeId}`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitReview = async () => {
    if (!userName || !userComment || !userRating)
      return alert("Fill all fields!");

    const recipeId = recipe._id.$oid || recipe._id;

    // Add comment
    const commentResponse = await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userName,
        recipe_id: recipeId,
        comment: userComment,
        date: new Date().toISOString(),
      }),
    });

    if (!commentResponse.ok) {
      const errorData = await commentResponse.json().catch(() => ({}));
      console.error("Failed to add comment:", errorData);
      alert("Failed to add comment: " + (errorData.message || "Unknown error"));
      return;
    }

    // Add rating
    const ratingResponse = await fetch("http://localhost:5000/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipeId,
        rating: userRating,
      }),
    });

    if (ratingResponse.ok) {
      const ratingData = await ratingResponse.json();
      console.log("New average rating:", ratingData.average_rating);
      setCurrentRating(ratingData.average_rating);
    }

    alert("Review submitted successfully!");

    // Reset form
    setUserName("");
    setUserRating(0);
    setUserComment("");

    // Reload comments
    await fetchComments();
    setCommentsCount(commentsCount + 1);
  };

  const renderStars = (avgRating) => {
    const stars = [];
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");
    return stars.join(" ");
  };

  return (
    <div className="reviews-section">
      <h3>Ratings & Reviews</h3>

      {/* Average Rating */}
      <div className="average-rating">
        <h2>{currentRating.toFixed(1)}</h2>
        <div className="stars">{renderStars(currentRating)}</div>
        <p>{commentsCount} reviews</p>
      </div>

      <hr />

      {/* Display All Comments */}
      {/* {comments.length > 0 && ( */}
      <div className="comments-list" style={{ margin: "14px 0 14px 10px" }}>
        <h4>User Reviews</h4>

        {comments.length === 0 ? (
          <p style={{ margin: "14px 0px 14px 14px", color: "#777" }}>
            No reviews yet. Be the first to review this recipe!
          </p>
        ) : (
          comments.map((comment, idx) => (
            <div
              key={idx}
              className="comment-item"
              style={{
                padding: "10px 14px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                margin: "14px 0 14px 10px",
                color: "#000000",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <strong style={{ color: "#000000ff" }}>{comment.user}</strong>
                <small style={{ color: "#000000ff" }}>
                  {new Date(comment.date).toLocaleDateString()}
                </small>
              </div>
              <p style={{ margin: 0, color: "#555", lineHeight: "1.4" }}>
                {comment.comment || comment.commentText}
              </p>
            </div>
          ))
        )}
      </div>
      {/* )} */}

      <hr />

      {/* Review Section */}
      <div style={{ margin: "14px 0 14px 10px" }}>
        {/* Add Review */}
        <h4>Add Your Review</h4>

        <div style={{ margin: "14px 0 14px 10px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* CLICKABLE RATING STARS */}
<div className="rating-input" style={{ padding: "0px 10px" }}>
  {[1, 2, 3, 4, 5].map((star) => {
    
    // ⭐ Core logic:
    // 1. Base fill = userRating (saved rating)
    // 2. Hover can only increase fill, not decrease it
    let isFilled = star <= userRating;

    if (hoverRating > userRating) {
      // Hover preview only applies when hovering *higher* than saved rating
      isFilled = star <= hoverRating;
    }

    const isHovered = hoverRating === star;

    return (
      <span
        key={star}
        onClick={() => setUserRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        style={{
          cursor: "pointer",
          fontSize: "26px",
          marginRight: "5px",
          transition: "color 0.2s ease, transform 0.2s ease",
          color: isFilled ? "#FFD700" : "#ccc",
          transform: isHovered ? "scale(1.2)" : "scale(1)",
        }}
      >
        ★
      </span>
    );
  })}
</div>


          <textarea
            placeholder="Share your experience with this recipe..."
            value={userComment}
            onChange={(e) => {
              setUserComment(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>

          <button onClick={submitReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeReviews;
