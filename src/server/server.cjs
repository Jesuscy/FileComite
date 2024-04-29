//Importo herramientas.
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//Creo app, con puerto.
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());

/*Las funicones cb (CallBack) se usan para pasar 
al multer el destino y nombre del archivo,
que guardo en storage.*/
const storage = multer.diskStorage({
    //Objeto con funcion callback a multer
    destination: (req, file, cb) => {
        const meetingId = req.body.meetingId;
        const meetingFolder = `public/meetings/${meetingId}`;
        if (!fs.existsSync(meetingFolder)) {
            fs.mkdirSync(meetingFolder, { recursive: true });
        }
        cb(null, meetingFolder);
    },
    //Objeto con funcion callback a multer
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

//Llamada post en la que subo un solo archivo que en el form de subida sea name="file"
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido exitosamente');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});