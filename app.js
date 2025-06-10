if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
let express = require('express');
let app = express();
let path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')
const listing = require('./routes/listings.js');
const review = require('./routes/review.js');
const user = require('./routes/user.js');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')



const mongoDb = process.env.MONGO_DB
main()
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoDb);
}

let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

const store = MongoStore.create({
    mongoUrl: mongoDb,
    crypto: {
        secret: process.env.SECRET_CODE
    },
    touchAfter: 24 * 3600
})

store.on('error', () => {
    console.log("Error => ")
})

const sessionOption = {
    store,
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expiers: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}


app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())



passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success')
    res.locals.errorMsg = req.flash('error')
    res.locals.curUser = req.user
    next()
})



app.use('/verifiedVilla', listing);
app.use('/verifiedVilla', review);
app.use('/', user);


// 404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});



// Global error handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render('listings/error.ejs', { message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
