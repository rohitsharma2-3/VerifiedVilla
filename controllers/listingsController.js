const Listing = require('../models/listing')

const index = async (req, res) => {
  const { category } = req.query;
  const allListing = await Listing.find(category ? { category } : {});
  res.render('listings/main.ejs', { allListing, selectedCategory: category || null });
};


const createPage = (req, res) => {
    res.render('listings/create.ejs');
}

const newListing = async (req, res) => {
    let url = req.file.path
    let filename = req.file.filename
    const { title, description, image, price, location, country, category } = req.body.listing;
    const createNew = new Listing({
        title,
        description,
        image: { url: image },
        price,
        location,
        country,
        category
    });
    createNew.image = { url, filename }
    createNew.owner = req.user._id
    await createNew.save();
    req.flash('success', 'Listing created successfully.');
    res.redirect('/VerifiedVilla');
}

const detailPage = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: 'review', populate: "author"}).populate('owner');

    if (!listing) {
        req.flash('error', 'Listing not found.');
        return res.redirect('/VerifiedVilla');
    }

    res.render('listings/detail', { listing });
}

const editPage = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    req.flash('success', 'Listing Edit successfully.');
    res.render('listings/edit', { listing });
}

const updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, location, country, category } = req.body.listing;

    let listing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image,
        price,
        location,
        country,
        category
    }, { new: true });

    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash('success', 'Listing Updated successfully.');
    res.redirect(`/VerifiedVilla/${id}/detail`);
}

const destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing Deleted successfully.');
    res.redirect('/VerifiedVilla');
}


module.exports = { index, createPage, newListing, detailPage, editPage, updateListing, destroyListing }