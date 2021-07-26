import express from 'express';
import mongoose from 'mongoose';
import router from './Router/router.js';
import cors from 'cors'
const app = express();

app.use(express.json({ extended : true }));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/pradeep', router);

const PORT = process.env.PORT || 5000;
const URL = "mongodb+srv://pradeep:passuio@cluster0.i2yya.mongodb.net/STACK?retryWrites=true&w=majority";

if(process.env.NODE_ENV == 'production') {
    app.use(express.static('frontEnd/buid'));
}

mongoose.connect(process.env.MONGODB_URI || URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}......`);
    });
    console.log("Mongodb is connected");
}).catch(error => {
    console.log('Error:', error.message);
});


