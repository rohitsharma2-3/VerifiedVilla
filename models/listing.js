const mongoose = require('mongoose');
const Review = require('./reviewListing');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        filename: String,
        url: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: [
            "Home",
            "Trending",
            "Iconic-Cities",
            "Farms",
            "Arctics",
            "Mountains",
            "Swimming Pool",
            "Camp",
            "Forest"
        ]
    }
});

listingSchema.post('findOneAndDelete', async (Listing) => {
    if (Listing) {
        await Review.deleteMany({ _id: { $in: Listing.review } })
    }
})

let Listing = mongoose.model('Listing', listingSchema)
module.exports = Listing