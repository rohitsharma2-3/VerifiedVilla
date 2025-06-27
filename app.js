if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
const ExpressError = require('./utils/ExpressError.js');

// Models and Routes
const User = require('./models/user.js');
const listingRoutes = require('./routes/listings.js');
const reviewRoutes = require('./routes/review.js');
const userRoutes = require('./routes/user.js');

// Environment Variables
const mongoDb = process.env.MONGO_DB;
const secret = process.env.SECRET_CODE || 'fallbackSecret';
const port = process.env.PORT || 8080;

// Database Connection
async function main() {
    await mongoose.connect(mongoDb);
    console.log('MongoDB Connected');
}
main().catch(err => console.error('MongoDB Error:', err));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', ejsMate);

// Middleware
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session Store
const store = MongoStore.create({
    mongoUrl: mongoDb,
    crypto: { secret },
    touchAfter: 24 * 3600 
});

store.on('error', (err) => {
    console.error("Session Store Error:", err);
});

const sessionOptions = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & Current User Middleware
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.locals.curUser = req.user;
    next();
});

// Routes
app.use('/verifiedVilla', listingRoutes);
app.use('/verifiedVilla', reviewRoutes);
app.use('/', userRoutes);

// 404 Handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render('listings/error.ejs', { message });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
