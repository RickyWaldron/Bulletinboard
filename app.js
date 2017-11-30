// Bulletin Board Application

require('dotenv').load();

const express = require('express')
const app = express()
const fs = require('fs')

const bodyParser = require('body-parser')

const pg = require('pg')
const Client = pg.Client

const client = new Client({
    user: process.env.user,
    host: 'localhost',
    database: process.env.database,
    password: process.env.password,
    port: 5432,
})


client.connect()
app.use(bodyParser.urlencoded())
app.set('view engine', 'pug')

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/addMessages', (req, res) => {
    res.render('addMessages')
})



app.post('/addMessages', (req, res) => {
    let userName = req.body.name
    let theTitle = req.body.title
    let theMessage = req.body.bodyMessage
    const query = {
        text: (`SELECT * FROM users WHERE name = '${userName}'`)
    }
    const query2 = {
        text: (`INSERT INTO users (name)
				VALUES ('${userName}') RETURNING *`)
    }
    const query3 = {
        text: (`INSERT INTO messages (title, body, userid) 
		 		VALUES ('${theTitle}', '${theMessage}', (
		 		SELECT (userid) FROM users WHERE name= '${userName}')) RETURNING *`)
    }

    client.query(query, (err, result) => {
        if (err) throw err
        console.log(result.rows.length)
        if (result.rows.length == 0) {
            return client.query(query2, (error, result2) => {
                return client.query(query3, (err, result3) => {
                    res.render('addMessages')
                })
            })
        }
        return client.query(query3, (err, result3) => {
            if (err) throw err
            res.render('addMessages')
        })
    })
})


app.get('/allMessages', (req, res) => {

    const query = {
        text: "SELECT * FROM messages"
    }

    client.query(query, (err, result) => {
        if (err) throw (err)
        let data = []
        data.push(result)
        res.render('allMessages', { data: data })
    })

})

// client.end()

app.listen(3000, () => {
    console.log("listening")
})