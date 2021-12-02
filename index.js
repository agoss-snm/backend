const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productsRoutes = require("./routes/products");
const port = 8081;


// Plantillas
app.set('view engine', 'ejs');
app.set('views','./views');


// midleware
app.use(express.json());
app.use(express.urlencoded({exteded:false}));
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});



app.listen(port, () => {
  console.log(` server run on port ${port}`);
});
