const express = require("express");
const app = express();
const passport = require('passport');
const session = require("express-session");
const cors = require('cors');
const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const PORT = process.env.PORT || 3000;

app.use("/api/stocks", stockRoutes.router);
app.use("/", authRoutes.router);


app.get("/checkAuth", function(req, res){
    console.log("here")
    console.log(req.session)

    if(req.session.passport)
        res.send(req.session.passport.user);
    else
        res.send("not found")
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
