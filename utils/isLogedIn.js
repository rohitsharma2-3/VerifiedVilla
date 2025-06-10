const Listing = require("../models/listing.js");
const Review = require("../models/reviewListing.js");


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to access this page!");
        return res.redirect("/login");
    }
    next();
};




const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};



const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.curUser._id)) {
        req.flash('error', 'You are not authorized to do that');
        return res.redirect(`/VerifiedVilla/${id}/detail`);
    }
    next();
};



const isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.curUser._id)) {
        req.flash('error', 'You are not author of this review')
        return res.redirect(`/VerifiedVilla/${id}/detail`)
    }
    next()
}

module.exports = { isLoggedIn, saveRedirectUrl, isOwner, isAuthor };
