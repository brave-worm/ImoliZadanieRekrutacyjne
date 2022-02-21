import express from 'express'

const app = express()

app.get('/', (req) => {
    
})

app.listen(3001, () => {
    console.log("started on port 3001!")
})