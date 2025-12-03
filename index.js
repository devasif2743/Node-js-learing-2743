
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import router from './routes/index.js';
import webrouter from './routes/web.js';

import sequelize from './config/dbconfig.js';
import "./models/index.js";

sequelize.authenticate()
    .then(async() => {
        await sequelize.sync({ alter: true });
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });    

 app.use(express.json());  
app.use('/api', router);
app.use('/web', webrouter);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});