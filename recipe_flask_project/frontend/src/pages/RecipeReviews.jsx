import React, { useState } from "react";

const RecipeReviews = ({ recipe }) => {
  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const submitReview = async () => {
    if (!userName || !userComment || !userRating)
      return alert("Fill all fields!");

    // Add comment
    await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userName,
        recipeId: recipe._id.$oid || recipe._id,
        commentText: userComment,
        date: new Date().toISOString(),
      }),
    });

    // Add rating


    const ratingResponse = await fetch("http://localhost:5000/api/ratings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    recipe_id: recipe._id.$oid || recipe._id,
    rating: userRating,
  }),
});

const ratingData = await ratingResponse.json();
console.log("New average rating:", ratingData.average_rating);
    alert("Review submitted! Refresh to see updated ratings.");
    setUserName("");
    setUserRating(0);
    setUserComment("");
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
        <h2>{recipe.rating.toFixed(1)}</h2>
        <div className="stars">{renderStars(recipe.rating)}</div>
        <p>{recipe.comments_count} reviews</p>
      </div>

      <hr />

      {/* Add Review */}
      <h4>Add Your Review</h4>

      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* CLICKABLE RATING STARS */}
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setUserRating(star)}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: star <= userRating ? "gold" : "gray",
              marginRight: "5px",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Share your experience with this recipe..."
        value={userComment}
        onChange={(e) => setUserComment(e.target.value)}
      ></textarea>

      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
};

export default RecipeReviews;
