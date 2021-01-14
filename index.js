const mongoose = require('mongoose');
const wikiSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    date: Date
});
const wiki = mongoose.model('wiki', wikiSchema);
(async function () {
    try {
        await mongoose.connect('mongodb://localhost/wiki', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        for (i = 0; i < 3; i++)
            await (new wiki({
                title: "Title " + i,
                body: "Body " + i,
                author: "Author " + i,
                date: new Date()
            })).save();
        const w = await wiki.findOne({
            title: "Title 2"
        }).exec();
        console.log(w);
        const resU = await wiki.updateOne({
            title: 'Title 2'
        }, {
            title: 'Title changed'
        })
        console.log("updated " + resU.nModified + " of " + resU.n);
        const resD = await wiki.deleteOne({
            title: "Title 1"
        });
        console.log("opeation " + resD.ok + " found: " + resD.n + " deleted:" + resD.deletedCount)
    } catch (err) {
        console.log('error: ' + err)
    }
})()