// import express from 'express';
// import cors from 'cors';    
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import connectDB from './utils/db.js';
// import userRoutes from './routes/user.route.js';
// import companyRoutes from './routes/company.route.js';
// import jobRoutes from './routes/job.route.js';
// import applicationRoute from './routes/application.route.js';


// dotenv.config();
// const app = express();

// //middleware  
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // const corsOptions = {
// //     origin: 'http://localhost:5173',
// //     credentials: true,
// // };
// // app.use(cors(corsOptions));
// app.use(cors({
//   origin: 'http://localhost:5174/',
//   credentials: true,
//   allowedHeaders: ['Content-Type','Authorization'],  // if you need custom headers
//   methods: ['GET','POST','PUT','DELETE','OPTIONS']
// }));

// app.use(cookieParser());

// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/company', companyRoutes);
// app.use('/api/v1/job', jobRoutes);
// app.use('/api/v1/application', applicationRoute);

// const port = process.env.PORT || 4000;
// app.listen(port, async() => {
//     await connectDB();
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';

dotenv.config();
const app = express();

//middleware  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - FIXED
app.use(cors({
  origin: 'http://localhost:5173', // Remove trailing slash
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoute);

const port = process.env.PORT || 4000;

app.listen(port, async() => {
    await connectDB();
    console.log(`Server is running on port ${port}`);
});
