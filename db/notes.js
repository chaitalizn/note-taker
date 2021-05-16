//medthos for everything 
//read, write, get notes, add notes, remove notes

const util = require("util");
const fs = require("fs");

const {v1: uuidv1 } = require("uuid");
const readfileAsync = util.promisify(fs.readFile);
const writefileAsync = util.promisify(fs.writeFile);

class Notes{


    read() {
        return readfileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writefileAsync("db/db.json", JSON.stringify(note))
        
    }

    getNotes() {
        console.log("get notes")
        return this.read().then(notes => {
            console.log(notes);
            let notesArray;
            try {
                notesArray = [].concat(JSON.parse(notes));
            }
            catch (err) {
                notesArray = [];
            }
            return notesArray;
            
        })

    }

    addNotes(note) {
        console.log("add notes");
        const {title, text} = note;
        const newNote = {title, text, id: uuidv1()}
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)
    }

    removeNotes(id) {
        console.log("remove notes");
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(updatedNotes => this.write(updatedNotes))

    }
}

module.exports = new Notes();