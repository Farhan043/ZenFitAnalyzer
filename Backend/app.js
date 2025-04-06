require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectDb = require('./db/db')
var usersRouter = require('./routes/users');
var chatbotRouter = require("./routes/chatbot");
const gpsRouter = require("./routes/gps");
const bodyProgressRoutes = require("./routes/bodyProgress.routes");
const sleepRoutes = require('./routes/sleep.routes');
const habitRoutes = require('./routes/habitRoutes');
const challengeRoutes = require("./routes/challenge.routes");
const socialRoutes = require('./routes/social.routes');


var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the "uploads" directory

app.use("/uploads", express.static("uploads"));

app.use('/users', usersRouter);
app.use("/chatbot", chatbotRouter);
app.use("/api/gps", gpsRouter);
app.use("/body-progress", bodyProgressRoutes);
app.use('/sleep', sleepRoutes);
app.use('/habit', habitRoutes);
app.use("/challenge", challengeRoutes); // Ensure this line is present and correct
app.use('/social', socialRoutes);


connectDb();


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // ❌ REMOVE or FIX THIS LINE
});


module.exports = app;
