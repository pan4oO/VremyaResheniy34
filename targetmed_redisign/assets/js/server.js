const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost', 
    user: 'Meggga', 
    password: 'MeggaPass', 
    database: 'vremya_resheniy' 
});

// Подключение к базе данных
db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error);
    } else {
        console.log('Connected to MySQL Database.');
    }
});



// GET /articles для получения списка всех статей
app.get('/articles', (req, res) => {
    const sqlQuery = 'SELECT * FROM Articles';
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.status(200).json(results);
        }
    });
});

// POST /articles для создания новой статьи
app.post('/articles', (req, res) => {
    const newArticle = req.body;
    const sqlQuery = 'INSERT INTO Articles SET ?';
    db.query(sqlQuery, newArticle, (error, results) => {
        if (error) {
            res.status(500).send('Error saving the article');
        } else {
            res.status(201).send('Article saved');
        }
    });
});

// PUT /articles/:id для обновления статьи по идентификатору
app.put('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const articleUpdates = req.body;
    const sqlQuery = 'UPDATE Articles SET ? WHERE ArticleId = ?';
    db.query(sqlQuery, [articleUpdates, articleId], (error, results) => {
        if (error) {
            res.status(500).send('Error updating the article');
        } else {
            res.status(200).send('Article updated');
        }
    });
});

// DELETE /articles/:id для удаления статьи по идентификатору
app.delete('/articles/:id', (req, res) => {
    const articleId = req.params.id;
    const sqlQuery = 'DELETE FROM Articles WHERE ArticleId = ?';
    db.query(sqlQuery, articleId, (error, results) => {
        if (error) {
            res.status(500).send('Error deleting the article');
        } else {
            res.status(200).send('Article deleted');
        }
    });
});

// Вы можете добавить дополнительные маршруты для остальных таблиц по аналогии


