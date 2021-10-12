const express = require('express');
const app = express();
const port = process.env.FILE_BLOCK_PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const util = require('util');
const tar = require('tar-fs');
const zlib = require('zlib');
const { ensureDir } = require('fs-extra');

const pipeline = util.promisify(require('stream').pipeline);

const DOWNLOAD_FILES = `/data/download`
const UPLOAD_FILES = `/data/upload`

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.get('/', (req, res) => {
    // #swagger.description = 'Documentation for your endpoint.'
    /* #swagger.responses[200] = {
        description: 'Successful request',
        schema: {
            "properties": {
                "list": {
                
                    "type": "array",
                    "description": "List of items",
                },
            },
        }
    } */

    res.send('This is a file-block balenaBlock!')
})


app.get('/download', async(req, res) => {
    // download all files in the volume
    // gzip all files in the /data volume
    await ensureDir(DOWNLOAD_FILES);
    try{
        const line = pipeline(
            tar.pack(DOWNLOAD_FILES,  {
                readable: true,
                writable: true,
            }),
            zlib.createGzip(),
            res
        ).catch(error => {throw new Error (error)});

        await line;
    }catch(e){
        res.status(400).send(`Got error: ${e.message}`);
    }
})

app.post('/upload', async(req, res) => {
    // upload a file to the uploads directory in shared volume
    // should be tar.gzip! send and then unpack
    await ensureDir(UPLOAD_FILES);
    try{
        const line = pipeline(
            req,
            zlib.createGunzip(),
            tar.extract(UPLOAD_FILES),
        ).catch(error => {throw new Error (error)});

        await line;
        res.send('OK')
    }catch(e){
        res.status(400).send(`Got error: ${e.message}`);
    }
})

app.listen(port, () => {
    console.log(`Example balenaBlock listening at http://localhost:${port}`)
})
