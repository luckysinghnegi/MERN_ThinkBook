import Note from "../Model/Note.js"


export const getUserNotes = async (request, response) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Will show the newest notes first; 
        response.status(200).json(notes);
    } catch (error) {
        console.log(error);
    }
}


export const CreateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        // Validation
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }
        const newNote = new Note({
            title,
            content,
        });
        await newNote.save();
        return res
            .status(201)
            .json({ message: "Note created successfully!", note: newNote });

    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const UpdateUserNotes = async (request, response) => {
    try {
        const { title, content } = request.body;

        await Note.findByIdAndUpdate(request.params.id, { title, content });
        response.status(201).json({ message: "notes updated successfully!" })

    } catch (error) {
        response.status(500).json({ message: "notes did not updated!" })

    }
}


export const DeleteUserNotes = async (request, response) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: "note deleted successfully!", note: deletedNote })
    } catch (error) {
        response.status(500).json({ message: "server error please try after some time" })
    }
}


export const getNoteById = async (request, response) => {
    try {
        const note = await Note.findById(request.params.id);
        response.status(200).json(note);

    } catch (error) {
        response.status(500).json({ message: "Internal error", error });
    }
}