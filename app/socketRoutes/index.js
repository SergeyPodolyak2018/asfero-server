const socketNoteRoutes = require('./socket_note_routes');

module.exports = function(conect, db) {
  socketNoteRoutes(conect, db);  
}

