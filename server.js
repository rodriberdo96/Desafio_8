//importaciones
const express = require('express')
const  Contenedor  = require('./Api/Contenedor.js')
const {Server : HttpServer} = require('http')
const {Server : IOServer} = require('socket.io')
const historialChat = require('./Api/historialChat')
const generateRandomProducts = require('./Api/Faker')
//instancias
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//config puerto
const PORT = 27017

//middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/public'))
const productos = new Contenedor('productos.json')
const mensajes = new historialChat('mensajes.json')
const listProducts = generateRandomProducts(5)
app.set ('view engine', 'ejs')
app.set('views', './public/views')

const messages= [];

// Socket

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado!')
    //productos
    io.sockets.emit('productos', productos.getAll())
    socket.on('guardarNuevoProducto',  (nuevoProducto) => {
        productos.save(nuevoProducto)
        io.sockets.emit('productos', productos.getAll)
    })

    //mensajes
    socket.emit('messages',await mensajes.loadMessages())
    socket.on('new-message',async (data) => {
        await mensajes.saveMessage(data)
        io.sockets.emit('messages', await mensajes.loadMessages())
    })
})

//rutas
app.get('/', (req,res) => {
    productos.getAll().then((productos) => {
    res.render('pages/index', {productos})
    })
})

app.get('/productosC.ejs',  (req,res) => {
    productos.getAll().then((productos) => {
        res.render('pages/productosC', {productos})
    })  

})

app.get('/api/productos-test',  (req,res) => {
    res.render('pages/faker', {listprod:listProducts})
})
app.post ('/productos', async (req,res) => {
    const data= req.body
    const producto=data 
    const id = await productos.save(producto)
    res.render('pages/index', {productos})
})

app.post('index', async (req,res) => {
    const data= req.body
    const producto=data 
    const id = await productos.save(producto)
    res.render('/index', {productos})
})




// Levantar el servidor en el puerto indicado
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: http://localhost:${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));