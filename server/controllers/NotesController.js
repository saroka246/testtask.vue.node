const db = require('../db');

class NotesController{
    async createNote(req, res){
        const{title, text, date} = req.body;
        if(title.length > 200 && title.length < 0){
            res.json({error: "title"});
            return;
        }
        if(text.length > 2000){
            res.json({error: "text"});
            return;
        }
        if(date.length <= 0){
            res.json({error: "date"});
            return;
        }
        const nowDate = new Date();
        if(date.split(" ")[0].split('-')[2] > nowDate.getFullYear || date.split(" ")[0].split('-')[2] <= 0){
            res.json({error: "date"});
            return;
        }
        if(date.split(" ")[0].split('-')[1] > 12 || date.split(" ")[0].split('-')[1] <= 0){
            res.json({error: "date"});
            return;
        }
        const month = Number(date.split(" ")[0].split('-')[1]);
        let monthLimit;
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                monthLimit = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                monthLimit = 30;
                break;
            case 2:
                monthLimit = 28;
                break;
        }
        if(date.split(" ")[0].split('-')[0] > monthLimit || date.split(" ")[0].split('-')[0] <= 0){
            res.json({error: "date"});
            return;
        }
        if(date.split(" ")[1].split(':')[0] > 23 || date.split(" ")[1].split(':')[0] <= 0){
            res.json({error: "date"});
            return;
        }
        if(date.split(" ")[1].split(':')[1] > 59){
            res.json({error: "date"});
            return;
        }
        
        const newNote = await db.query('INSERT INTO notes (title, text, date) VALUES ($1, $2, $3) RETURNING *',[title, text, date]);
        res.json(newNote.rows);
    }
    async getNotes(req, res){
        const limit = req.query.limit;
        const page = (req.query.page - 1) * limit;
        const order = req.query.order;
        let notes;
        if(order == "false"){
            notes = await db.query("SELECT id, title, text, to_char(date, 'DD.MM.YYYY HH24:MI') AS date FROM notes ORDER BY date ASC LIMIT $1 OFFSET $2",[limit, page]);
        } else {
            notes = await db.query("SELECT id, title, text, to_char(date, 'DD.MM.YYYY HH24:MI') AS date FROM notes ORDER BY date DESC LIMIT $1 OFFSET $2",[limit, page]);
        }
        
        res.json(notes.rows);
    }
    async getOneNote(req, res){
        const note_id = req.params.id;
        const note = await db.query('SELECT * FROM notes WHERE id = $1',[note_id]);
        res.json(note.rows);
    }
    async getCountOfPosts(req, res){
        const note = await db.query('SELECT COUNT(*) FROM notes');
        res.json(note.rows);
    }
}

module.exports = new NotesController();