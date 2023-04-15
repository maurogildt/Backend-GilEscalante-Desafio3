import ProductManager from "./managers/productManager.js"
import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager()

app.get('/products',async (req,res)=>{
    const {limit} = req.query
    if(!limit) return res.send(await productManager.getProducts())
    const products = await productManager.getProducts()
    res.send(products.slice(0,limit))
})

app.get('/products/:id',async (req,res)=>{
    const {id} = req.params
    const product = await productManager.getProductById(parseInt(id))
    if(product == Error) return res.send(console.log("hahsd"))
    res.send(product)
})

app.listen(8080,()=>{console.log("Listening on PORT 8080")})
