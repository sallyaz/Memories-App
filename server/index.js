import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes) //added prefix to all routes in posts.js

const CONNECTION_URL = "mongodb+srv://sallyaz:sallyaz123@cluster0.13vl5.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5001;

// set the connection to the DB
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log('server running on port '+ PORT)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);
