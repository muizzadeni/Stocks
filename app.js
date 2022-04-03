const express = require('express')
const path = require('path')
const stocks = require('./stocks')
var cors = require('cors') /*Added cors library*/

const app = express()
app.use(express.static(path.join(__dirname, 'static')),cors())

app.get('/stocks', async (req, res,next) => {
  try { /*To catch an error*/
    const stockSymbols = await stocks.getStocks()
    //const stockSymbols = await [] // Challenge 6 To display error message due to empty array
    res.send({ stockSymbols })
  }catch(err){
    next(err)
  }

})

app.get('/stocks/:symbol', async (req, res,next) => {
  try {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  res.send(data)
  }catch(err){
    next(err)
  }
})

app.listen(3000, () => console.log('Server is running!'))