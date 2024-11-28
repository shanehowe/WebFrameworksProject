const path = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const https = require("https");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./app/models/userModel");

const indexRouter = require("./app/routes/index");
const authRouter = require("./app/routes/auth");
const expenseRouter = require("./app/routes/expense");
const apiRouter = require("./app/api");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "app_public")));

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/expense", expenseRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "development") {
  if (fs.existsSync("sslcert/key.pem") && fs.existsSync("sslcert/cert.pem")) {
    const privateKey = fs.readFileSync("sslcert/key.pem", "utf8");
    const certificate = fs.readFileSync("sslcert/cert.pem", "utf8");

    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(8000, () => {
      console.log("HTTPS Server running on port 8000");
      console.log("Visit https://localhost:8000");
    });
  }
}

module.exports = app;
