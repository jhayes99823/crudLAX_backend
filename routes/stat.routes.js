var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

// router.post('/stat/create-stat', async(req, res, next) => {
//     console.log(req);
//     const pool = await poolPromise;
//     const result = await pool.request()
//                     .input('opponent', sql.VarChar(30), req.body.opp)
//                     .input('startTime', sql.DateTime, req.body.starttime)
//                     .input('TID', sql.Int, req.body.tid)
//                     .output('GID', sql.Int)
//                     .query('SELECT [dbo].[fn_getGameFromOpponentAndDate] (@opponent, @startTime, @TID)')
    
//     if (result.output.GID !== null) {
//         res.end(JSON.stringify({ res: 'printing something', result: result }))

//     }

// })

module.exports = router;