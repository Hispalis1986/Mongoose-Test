// const app = express()

// mongoose.connect()
//     .then(() => {
//         app.listen()
//     });

// db.once('open', () => {
//     app.listen()

// });

// const Todo = mongoos.model...

//     // req.params /:theseKindOfThings
//     // req.body   axios.post('/url',{theseKindOfThings:andValues})
//     // req.query  /?theseKindOfThings=andValues

//     app.get('/:id', async (req, res) => {
//         const todo = await Todo.findById(req.params.id);
//         res.send(todo);
//     });

// /*
//   - Install express
//   - require express
//   - require database (maybe db.js)
//   - setup express ( app, app.use )
//   - routes:
//     - Create   ( post /wiki/ {...} )
//     - Retrieve (
//         get /wiki/:id,
//         get /wiki/list (all) .find({})
//       )
//     - Update ( patch /wiki/:id {...} )
//     - Delete ( delete /wiki/:id )
// */

const express = require('express')
// const db = require('db')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json())

// Test
app.get('/', (req, res) => {
    res.send('Example Test Express')
})
//     - Create   ( post /wiki/ {...} )
app.post('/wiki/new/:id', (req, res) => {
    // res.send('New wiki: ' + req.params.id)
    fs.writeFileSync('./bd/' + req.params.id + '.wiki', req.body.content)
    res.json({
        name: req.params.id
    })

})

// Retrieve 2
app.get('/wiki/list', (req, res) => {
    res.json(fs.readdirSync('./bd/'))
})
// Retrieve 1
app.get('/wiki/:id', (req, res) => {
    res.json({
        name: req.params.id,
        content: fs.readFileSync('./bd/' + req.params.id + '.wiki', 'utf8')
    })
})

// Update
app.patch('/wiki/:id', (req, res) => {
    fs.writeFileSync('./bd/' + req.params.id + '.wiki', req.body.content)
    res.json({
        name: req.params.id
    })
})
// Delete
app.delete('/wiki/:id', (req, res) => {
    fs.unlinkSync('./bd/' + req.params.id + '.wiki')
    res.json({
        returnCode: 'ok'
    })
})


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})