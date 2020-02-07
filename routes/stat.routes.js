var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.get('/stat/create-stat', async(req, res, next) => {
    const stat = req.body.stat;
    const pool = await poolPromise;
    const gameID = await pool.request()
                    .input('opponent', sql.VarChar(30), 'Tigers')
                    .input('date', sql.Date, '2020-02-06')
                    .input('startTime', sql.DateTime, '13:30:00')
                    .query('SELECT from [dbo].[fn_getGameFromOpponentAndDate] (@opponent, @date, @startTime)');
    console.log(gameID);
    const PID = await pool.request()
                    .input('playerUsername', sql.VarChar(30), 'louise')
                    .query('SELECT * from [dbo].[getUserByUsername] (@Username)');
    console.log(PID);
    // const result = await pool.request()
    //                 .input(gameID, sql.Varchar(30), stat)
    
})

module.exports = router;