/**
 * 🎨 DESIGN PATTERNS IMPLEMENTED:
 * 
 * 1. ✅ FACADE PATTERN (reviewsService):
 *    - Provides simplified interface to complex backend API
 *    - Hides HTTP implementation details
 *    - Single point of contact for review-related operations
 * 
 * 2. ✅ COMPOSITE PATTERN:
 *    - RecipeReviews contains ReviewForm and ReviewList
 *    - ReviewList contains multiple ReviewItem components
 *    - Tree structure: RecipeReviews → ReviewList → ReviewItem[]
 * 
 * 3. ✅ OBSERVER PATTERN (React State):
 *    - Comments state observable, UI reacts to changes
 *    - Rating state triggers visual updates
 *    - Auto-reload after submission observes data changes
 * 
 * 4. ✅ TEMPLATE METHOD PATTERN:
 *    - ReviewForm defines submission workflow template
 *    - Validation → API calls → State update → Callback
 *    - Steps executed in fixed order
 * 
 * 5. ✅ PRESENTER PATTERN:
 *    - StarRating, ReviewItem, ReviewList are presentational
 *    - RecipeReviews is container/presenter
 *    - Clear separation of concerns
 * 
 * 6. ✅ STRATEGY PATTERN (Star Rating):
 *    - Star rendering strategy based on rating/hover state
 *    - Visual feedback strategy can be swapped
 *
 * 🎨 DESIGN PRINCIPLES APPLIED:
 * 
 * 1. SINGLE RESPONSIBILITY PRINCIPLE (SRP):
 *    - RecipeReviews: orchestrates review functionality
 *    - StarRating: handles ONLY star rating UI
 *    - ReviewItem: renders ONLY a single review
 *    - ReviewList: manages ONLY list of reviews
 *    - ReviewForm: handles ONLY form input and submission
 * 
 * 2. DEPENDENCY INVERSION PRINCIPLE (DIP):
 *    - reviewsService abstracts API calls
 *    - Components depend on service interface, not implementation
 *    - Easy to swap API calls without changing components
 * 
 * 3. OPEN/CLOSED PRINCIPLE (OCP):
 *    - StarRating can be extended with new features without modification
 *    - Review components can be styled/enhanced without changing logic
 * 
 * 4. COMPOSITION OVER INHERITANCE:
 *    - Small, focused components composed together
 *    - ReviewList composed of multiple ReviewItems
 * 
 * 5. SEPARATION OF CONCERNS:
 *    - Service layer (API) separated from UI layer (components)
 *    - Each component has clear, distinct responsibility
 */

import React, { useState, useEffect } from "react";

// 🔹 FACADE PATTERN: Simplified API interface
// Single point of access for all review-related backend operations
const reviewsService = {
  fetchComments: async (recipeId) => {
    const response = await fetch(`http://localhost:5000/api/comments/recipe/${recipeId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return await response.json();
  },
  addComment: async (comment) => {
    const response = await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    if (!response.ok) throw new Error("Failed to add comment");
  },
  addRating: async (rating) => {
    const response = await fetch("http://localhost:5000/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    });
    if (!response.ok) throw new Error("Failed to add rating");
    return await response.json();
  },
};

// 🔹 PRESENTATIONAL COMPONENT: StarRating (STRATEGY PATTERN)
// Different rendering strategies based on state (filled/hover/empty)
// Visual feedback strategy can be customized without changing component structure
const StarRating = ({ rating, hoverRating, setRating, setHoverRating }) => {
  return (
    <div className="rating-input" style={{ padding: "0px 10px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        let isFilled = star <= rating;
        if (hoverRating > rating) isFilled = star <= hoverRating;
        const isHovered = hoverRating === star;

        return (
          <span
            key={star}
            onClick={() => setRating(star)}
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
  );
};

// 🔹 PRESENTATIONAL COMPONENT: ReviewItem (SRP)
// Single responsibility: Render a single review/comment
const ReviewItem = ({ comment }) => (
  <div
    className="comment-item"
    style={{
      padding: "10px 14px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      margin: "14px 0 14px 10px",
      color: "#000",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
      <strong>{comment.user}</strong>
      <small>{new Date(comment.date).toLocaleDateString()}</small>
    </div>
    <p style={{ margin: 0, color: "#555", lineHeight: "1.4" }}>
      {comment.comment || comment.commentText}
    </p>
  </div>
);

// 🔹 CONTAINER COMPONENT: ReviewList (COMPOSITE PATTERN)
// Manages collection of ReviewItem components in tree structure
const ReviewList = ({ comments }) => (
  <div className="comments-list" style={{ margin: "14px 0 14px 10px" }}>
    <h4>User Reviews</h4>
    {comments.length === 0 ? (
      <p style={{ margin: "14px 0px 14px 14px", color: "#777" }}>
        No reviews yet. Be the first to review this recipe!
      </p>
    ) : (
      comments.map((comment, idx) => <ReviewItem key={idx} comment={comment} />)
    )}
  </div>
);

// 🔹 FORM COMPONENT: ReviewForm (TEMPLATE METHOD PATTERN)
// Defines fixed workflow: validate → submit to APIs → update state → callback
// Steps execute in specific order but can be customized
const ReviewForm = ({ recipeId, onReviewSubmit }) => {
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async () => {
    if (!userName || !userComment || !userRating) return alert("Fill all fields!");
    try {
      await reviewsService.addComment({
        user: userName,
        recipe_id: recipeId,
        comment: userComment,
        date: new Date().toISOString(),
      });
      const ratingData = await reviewsService.addRating({
        recipe_id: recipeId,
        rating: userRating,
      });

      onReviewSubmit({ average_rating: ratingData.average_rating });

      setUserName("");
      setUserComment("");
      setUserRating(0);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div style={{ margin: "14px 0 14px 10px" }}>
      <h4>Add Your Review</h4>
      <input type="text" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} />
      <StarRating
        rating={userRating}
        hoverRating={hoverRating}
        setRating={setUserRating}
        setHoverRating={setHoverRating}
      />
      <textarea
        placeholder="Share your experience..."
        value={userComment}
        onChange={(e) => {
          setUserComment(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      ></textarea>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

// ⭐ Main RecipeReviews Component - ACCEPT THE PROP HERE
const RecipeReviews = ({ recipe, onReviewSubmitted }) => {
  const [comments, setComments] = useState([]);
  const [currentRating, setCurrentRating] = useState(recipe.rating || 0);
  const [commentsCount, setCommentsCount] = useState(recipe.comments_count || 0);

  const recipeId = recipe._id.$oid || recipe._id;

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await reviewsService.fetchComments(recipeId);
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadComments();
  }, [recipeId]);

  // UPDATE THIS FUNCTION
  const handleReviewSubmit = async ({ average_rating }) => {
    const data = await reviewsService.fetchComments(recipeId);
    setComments(data);
    setCurrentRating(average_rating);
    setCommentsCount(prev => prev + 1);
    
    // Call the notification callback instead of alert
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
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
      <div className="average-rating">
        <h2>{currentRating.toFixed(1)}</h2>
        <div className="stars">{renderStars(currentRating)}</div>
        <p>{commentsCount} reviews</p>
      </div>
      <hr />
      <ReviewList comments={comments} />
      <hr />
      <ReviewForm recipeId={recipeId} onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

export default RecipeReviews;