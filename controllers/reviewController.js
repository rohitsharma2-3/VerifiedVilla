const Listing = require('../models/listing')
const Review = require('../models/reviewListing')

const createReview = async (req, res) => {
    const { id } = req.params;
    const { name, range, content } = req.body;

    const listing = await Listing.findById(id);
    const newReview = new Review({ name, content, range });

    newReview.author = req.user._id
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash('success', 'Listing review added successfully.');
    res.redirect(`/verifiedVilla/${id}/detail`);
}

const destroy = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Listing review deleted successfully.');
    res.redirect(`/verifiedVilla/${id}/detail`);
}


module.exports = { createReview, destroy }