const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

app.get("/",async function (req,res) {
    try { 
        const connection = await mysql.createConnection(config.db)
        const [result,] = await connection.execute('select * from task')

        if (!result) result=[] //if there is no data, return empty array.
        res.status(200).json(result)
        //res.status(200).send('Database connection was made')
    } catch(err) {
        //return status code 500 and error message to the client.
        //res.status(500).send(err.message)
        res.status(500).json({error: err.message})
    }
})

app.listen(port)
