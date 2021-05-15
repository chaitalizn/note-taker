//medthos for everything 
//read, write, get notes, add notes, remove notes

const util = require("util");
const fs = require("fs");

const uuid = require("uuid/v1");
const readfileAsync = util.promisify(fs.readFile);
const writefileAsync = util.promisify(fs.writeFile);

class Store{

    read() {
        return readfileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writefileAsync("db/db.js", note, "utf8")
        
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
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(updatedNotes => this.write(updatedNotes))

    }
}