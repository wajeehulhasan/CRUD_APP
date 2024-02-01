import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import router from './server/routes/router.js';
import connectDB from './server/database/connection.js';


const app = express();

dotenv.config({ path: 'config.env' });

// Use the following lines to get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// using for log request
app.use(morgan('tiny'));

// mongo db connection
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", 'ejs');

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

/*
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-user', (req, res) => {
    res.render('add-user');
});

app.get('/update_user', (req, res) => {
    res.render('update_user');
});
*/

// load routers
app.use('/', router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
