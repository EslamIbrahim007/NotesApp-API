exports.Note = class Note {

    constructor(noteId,title,content,createdAt,createdBy) {
        this.noteId = noteId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
    }
};