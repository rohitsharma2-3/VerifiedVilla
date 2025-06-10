const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner } = require('../utils/isLogedIn.js')
const listingController = require('../controllers/listingsController.js')
const multer = require('multer')
const { storage } = require('../cloudConfig')
const upload = multer({ storage })

// Show all listings
router.get('/', wrapAsync(listingController.index));

// Show create form
router.get('/create', isLoggedIn, (listingController.createPage));

// Handle new listing
router.post('/new',upload.single('listing[image]'), wrapAsync(listingController.newListing));

// Show detail page
router.get('/:id/detail', wrapAsync(listingController.detailPage));

// Show edit form
router.get('/:id/edit', isOwner, wrapAsync(listingController.editPage));

// Handle update
router.put('/:id', upload.single('listing[image]'), isOwner, wrapAsync(listingController.updateListing));

// Handle delete
router.delete('/:id', isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
