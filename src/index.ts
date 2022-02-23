import express from 'express';
import { createConnection } from 'typeorm';
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import { Film } from './classes/Film';
import { List } from './entities/List'
import { Films } from './entities/Films';
import { Charakter } from './entities/Character';
import bodyParser from "body-parser";

const callSwapi = require('./external/SWAPI')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres", // TODO: Create type config file for env
            host: process.env.DB_HOST,
            port: 5433, // TODO: Create type config file for env
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [List, Films, Charakter],
            synchronize: true
        })
        console.log('Connected to Postgres')
    } catch (error) {
        console.error(error)
        throw new Error('Unable to connect to DB')
    }
}

main();

app.get('/', (req, res) => res.send({ status: 'OK!' }))

app.get('/films', (req, res) => {
    try {
        callSwapi.callApi(function (response: any) {
            var tableFilms:Film[] = []
            response.results.forEach((element: any, index: number) => {
                tableFilms.push(new Film(Number(index), element.release_date, element.title))
        })
            res.send(tableFilms);
            res.end();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" })
    }
})

app.post('/favorites', (req, res) => {
    try {      
        //TODO:        
        // In the body of this request, the user can provide any number of movie IDs obtained with the previous query and any name for the list. As a result, an element describing the list is to be created in the database, the service is to read the details of each of these movies and save them in the database. Please note that items cannot be duplicated in the database. The information to save is the release dates, titles and the list of characters in the film. Characters are also allowed to appear in the database only once.

        // const {
        //     id
        // } = req.body;
        
        

        res.send(req.body);
        res.end();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" })
    }
})

app.get('/favorites', (req, res) => {
    try {
        //TODO:        
        // The result of this query is to be a list of all lists added with the previous request (ID in the database and previously given name). Creating a pagination and searching by name will be an additional advantage.
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" })
    }
})

app.get('/favorites/:id', (req, res) => {
    try {
        //TODO:        
        // This endpoint is supposed to take as a parameter the ID of the list in the database and return the details and elements of the favorite list (ID, name, movie list and character list for each movie).
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" })
    }
})

app.get('/favorites/:id/file', (req, res) => {
    try {
        //TODO:        
        // The last endpoint is supposed to send the favorites list details as an Excel file. The first column should contain a distinct list of characters appearing in the movies included in a given favorite list, the second column should contain the movie titles separated by a comma, but only those that are in the given favorite list.
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" })
    }
})

app.listen(3001, () => {
    console.log("started on port 3001!")
})