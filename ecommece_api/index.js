const express = require('express');
const app = express();
var cors = require('cors')
require("dotenv/config");
const port = process.env.PORT;
const userRoute = require('./routes/UserRoutes');
const registerUserRoute = require('./routes/UserRegister');
const productRoute = require('./routes/ProductRoutes');
const adminRoute = require('./routes/AdminRoutes');
const categoryRoute = require('./routes/CategoryRoutes');
const subCategoryRoute = require('./routes/SubCategory');
const ordersRoute = require('./routes/OrdersRoutes');
const productPackageRoute = require('./routes/ProductPackage');
const deliveredProductRoute = require('./routes/DeliveredProductRoute');
const CarousalRoute = require('./routes/CarousalRoutes');
const OfferRoute = require('./routes/OfferRoutes');



// FOR IMAGE UPLOAD
const multer = require('multer');
const path = require('path');


// MiddlerWare
app.use(cors())

app.use(express.json());
app.use('/api/user',userRoute);
app.use('/api/register',registerUserRoute);
app.use('/api/product',productRoute);
app.use('/api/admin',adminRoute);
app.use('/api/categories',categoryRoute);
app.use('/api/subCategories',subCategoryRoute);
app.use('/api/orders',ordersRoute);
app.use('/api/productPackage',productPackageRoute);
app.use('/api/deliveredProduct',deliveredProductRoute);
app.use('/api/carousal',CarousalRoute);
app.use('/api/offers',OfferRoute);










// GETTING DB CONNECTION
const mongoose = require('mongoose');
const mongoDB = process.env.DB_CONNECTION;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to DB")
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// DB CONNECTION ENDS

// ======================================= Listining to server  =======================================
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
// ======================================= Listining to server ENDS =======================================




// FILE UPLOADS
app.use(express.static(__dirname + '/uploads'));


const fileStorageEngine = multer.diskStorage({
  destination : (req,file,cb) =>{
      cb(null,path.join(__dirname+'/uploads'));
  },
  filename : (req,file,cb)=>{
      cb(null, Date.now() + '--' + file.originalname);
  }
})

const upload = multer({storage : fileStorageEngine});

// upload Files
app.post('/uploads',upload.single('imageName'), async (req,res)=>{
 res.json(req.file.filename);
console.log('file Uploaded');
})
// FOR FILE UPLOADS



app.get('/',async(req,res)=>{
    res.send("Welcome to the API of Ecommerse Website developed and designed by Subin Adhikari")
})