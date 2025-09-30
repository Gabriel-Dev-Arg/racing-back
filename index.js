require("dotenv").config();
const express = require ("express");
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const authRoutes = require ('../backend-racing/routes/auth')
const dashboardRouters = require ('../backend-racing/routes/dashboard')
const errorHandler = require('./middleware/error_handler')

//middleware para parsear JSON
app.use(express.json())
app.use(cors()); // Habilita CORS para todas las rutas

//Usar las rutas de autenticacion

app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRouters)


app.use('/', (req, res)=>{
  res.send ('Servidor bakend corriendo')
});



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
})
app.use(errorHandler);