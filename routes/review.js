const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isAuthor } = require('../utils/isLogedIn.js');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController.js')


// Create Review
router.post('/:id/review', isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review
router.delete('/:id/review/:reviewId', isLoggedIn, wrapAsync(reviewController.destroy));


module.exports = router;
