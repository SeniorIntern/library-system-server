import express from 'express'

const app = express()

const port = 3000
app.listen(port, async () => {
  console.log(`listening on port: ${port}...`);
})
