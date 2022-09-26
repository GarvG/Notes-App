const Note = require("../model/noteModel");
const response = require("../responeMessage.json");
const status = require("../statusCode.json");
const fs = require("fs");
const moment = require('moment');
var approot = require("app-root-path");
const excel = require("exceljs");
const file = require("../logic/Filename");
const {
    failureResponse,
    successResponse
} = require("../utils/responseSchema");

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user._id
        })
        let sucess = successResponse(notes, status.OK.statusCode)
        res.status(sucess.statusCode).send(sucess.body)
    } catch (err) {
        let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, err.message, status.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

const createnote = async (req, res) => {
    try {
        const {
            title,
            content,
            category,
            type
        } = req.body;
        if (!title || !content || !category || !type) {
            let failure = failureResponse(status.BAD_REQUEST.status, response.Invalid.AllField, status.BAD_REQUEST.statusCode);
            res.status(failure.statusCode).send(failure.body);
        } else {
            let filename = file();
            fs.writeFile(`${approot}/noteSystem/${filename}`, content, function (err) {
                if (err) {
                    let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, err.message, status.INTERNAL_SERVER_ERROR.statusCode)
                    res.status(failure.statusCode).send(failure.body)
                }
            });

            const note = new Note({
                user: req.user._id,
                title,
                content,
                category,
                filename,
                type
            });
            const createdNote = await note.save();
            let sucess = successResponse(createdNote, status.CREATED.statusCode)
            res.status(sucess.statusCode).send(sucess.body)
        }

    } catch (err) {
        let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, err.message, status.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }



}

const getnotebyId = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        let sucess = successResponse(note, status.CREATED.statusCode)
        res.status(sucess.statusCode).send(sucess.body)
    } catch (err) {
        let failure = failureResponse(status.NOT_FOUND.status, err.message, status.NOT_FOUND.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }

}
const getnote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.send(note);
}
const updateNote = async (req, res) => {
    try {
        const {
            title,
            content,
            category
        } = req.body;
        const note = await Note.findById(req.params.id);
        if (note.user.toString() !== req.user._id.toString()) {
            let failure = failureResponse(status.UNAUTHORIZED.status, response.Invalid.cannot, status.UNAUTHORIZED.statusCode)
            res.status(failure.statusCode).send(failure.body)
        }
        let updatefile = note.filename;
        fs.appendFile(`${approot}/noteSystem/${updatefile}`, `\n${content}`, function (err) {
            if (err) {
                let failure = failureResponse(status.BAD_REQUEST.status, err, status.BAD_REQUEST.statusCode)
                res.status(failure.statusCode).send(failure.body)

            }
        })

        if (note) {
            note.title = title;
            note.content = content;
            note.category = category;
            const update = await note.save()
            let sucess = successResponse(update, status.OK.statusCode)
            res.status(sucess.statusCode).send(sucess.body)
        } else {
            let failure = failureResponse(status.NOT_FOUND.status, response.Invalid.notenotfound, status.NOT_FOUND.statusCode)
            res.status(failure.statusCode).send(failure.body)
        }

    } catch (err) {
        let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, error.message, status.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }

}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note.user.toString() !== req.user._id.toString()) {
            let failure = failureResponse(status.UNAUTHORIZED.status, response.Invalid.cannot, status.UNAUTHORIZED.statusCode)
            res.status(failure.statusCode).send(failure.body)
        }

        let updatefile = note.filename;
        fs.unlink(`${approot}/noteSystem/${updatefile}`, function (err) {
            if (err) res.send(err);
        })
        if (note) {
            await note.remove();

            let sucess = successResponse(response.Invalid.note, status.OK.statusCode)
            res.status(sucess.statusCode).send(sucess.body)
        } else {
            res.status(status.NOT_FOUND.statusCode).json(response.Invalid.cannot);
        }
    } catch (err) {
        let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, err.message, status.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)

    }
}

const createtype = async (req, res) => {
    try {

        const {
            title,
            content,
            category,
            type
        } = req.body;

        if (!title || !content || !category || !type) {
            let failure = failureResponse(status.BAD_REQUEST.status, response.Invalid.AllField, status.BAD_REQUEST.statusCode);
            res.status(failure.statusCode).send(failure.body);

        }

        if (type == "file") {
            let filename = file();
            fs.writeFile(`${approot}/noteSystem/${filename}`, content, function (err) {
                if (err) {
                    let failure = failureResponse(status.BAD_REQUEST.status, err, status.BAD_REQUEST.statusCode)
                    res.status(failure.statusCode).send(failure.body)
                }

            });

            const note = new Note({
                user: req.user._id,
                title,
                content,
                category,
                filename,
                type
            });
            const createdNote = await note.save();
            let sucess = successResponse(createdNote, status.CREATED.statusCode)
            res.status(sucess.statusCode).send(sucess.body)
        } else {
            const filename = response.Invalid.notcreated;
            const note = new Note({
                user: req.user._id,
                title,
                content,
                category,
                filename,
                type
            });
            const createdNote = await note.save();
            let sucess = successResponse(createdNote, status.CREATED.statusCode)
            res.status(sucess.statusCode).send(sucess.body)
        }

    } catch (err) {
        let failure = failureResponse(status.INTERNAL_SERVER_ERROR.status, err.message, status.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}


const working = async (req, res) => {
    const ans = await Note.find({
        user: req.user._id
    });
    let note = [];
    ans.forEach((obj) => {
        note.push({
            _id: obj._id,
            title: obj.title,
            content: obj.content,
            category: obj.category,
            filename: obj.filename,
            type: obj.type,

        })
    });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Notes");
    worksheet.columns = [{
            header: "ID",
            key: "_id",
            width: 25
        },
        {
            header: "TITLE",
            key: "title",
            width: 25
        },
        {
            header: "CONTENT",
            key: "content",
            width: 40
        },
        {
            header: "CATEGORY",
            key: "category",
            width: 10
        },
        {
            header: "FILENAME",
            key: "filename",
            width: 40
        },
        {
            header: "TYPE",
            key: "type",
            width: 10
        },
    ];
    let filenameby = ans[0].category;
    worksheet.addRows(note);
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `Notesby${filenameby}.xlsx`
    );
    return workbook.xlsx.write(res).then(function () {
        res.status(200).end();



    });

}



module.exports = {
    getNotes,
    createnote,
    getnotebyId,
    deleteNote,
    updateNote,
    working,
    createtype
};