import express from 'express'
const app = express()

const PORT = 8000

app.listen(PORT, (req,res) => {
    console.log("Graças a deus conectou")
})

