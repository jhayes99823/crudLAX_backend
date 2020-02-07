var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.get('/stat/create-stat', async(req, res, next) => {
    console.log(req);
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('opponent', sql.VarChar(30), req.query.opp)
                    .input('startTime', sql.DateTime, req.query.starttime)
                    .input('TID', sql.Int, req.query.tid)
                    .output('GID', sql.Int)
                    .query('SELECT [dbo].[fn_getGameFromOpponentAndDate] (@opponent, @startTime, @TID)')
    
                    // res.end(JSON.stringify({ result: result }))
    if (result.output.GID !== null) {
        res.end(JSON.stringify({ result: result }))
    }
    else {
        res.end(JSON.stringify({ message: 'Game Not Found'}))
    }
})

module.exports = router;