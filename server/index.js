import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fs from "fs"
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from "path"
import * as hbsHelpers from "./handlebars-helpers.js"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const categorieIcons = {text:"bi bi-body-text", image:"bi bi-card-image", code:"bi bi-code"}
// Express
const app = express();
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: hbsHelpers,
    layoutsDir: "../public/views/layouts",
    partialsDir: "../public/views/partials"
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "../public/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Website routes
app.get("/", (req, res) => {
    const apps = JSON.parse(fs.readFileSync("./apps.json"));
    res.render('index', {apps:apps});
});
app.get("/app/:appName", (req, res) => {
    let apps = groupBy(JSON.parse(fs.readFileSync("./apps.json")), 'categorie');
    res.render("app", {apps:apps, appName:req.params.appName, categorieIcons:categorieIcons, whichPartial: function() {return req.params.appName;}});
});

function groupBy(array, key) {
    return array.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
}


app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT || 3000}`);
});