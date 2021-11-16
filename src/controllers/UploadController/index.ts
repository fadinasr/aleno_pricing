import {RequestHandler} from 'express';
import logger from '../../logger';
import fs from 'fs';
import {parse} from '@fast-csv/parse';
import path from 'path';
import Pricing from '../../models/Pricing';
import _ from 'lodash';
import multer from 'multer';
import {storage} from '../../middleware/upload';

export const uploader: RequestHandler = async (req, res) => {
    let upload = multer({storage: storage}).single('file');
    upload(req, res, async (err: any) => {
        try {
            if (!req.file) return res.status(400).send('Please upload a CSV file')

            // @ts-ignore
            if (req.fileValidationError) {
                // @ts-ignore
                return res.send(req.fileValidationError);
            }

            // Get uploaded file path
            const {path} = req.file;

            // Parse uploaded file
            let data = fs.createReadStream(path).pipe(parse({headers: true}))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", async (row) => {
                    row = _.mapKeys(row, (value: string, key: string) => {
                        return key.toLowerCase();
                    });
                    // Create item in pricing model
                    await Pricing.create(row)
                });

            fs.unlink(path, (err) => {
                if (err) console.error(err);
                console.log("Cleaned up", path);
            });

            return res.json({message: 'Uploaded Successfully!'})
        } catch (err) {
            console.log({err})
            logger.error(err);
            return res.status(400).send("Error in Uploading File!");
        }
    })
};

export const getDataFromFile: RequestHandler = async (req, res) => {
    const filePath = path.join(__dirname, 'data.csv');
    let result: any[] = [];
    try {
        let data = fs.createReadStream(filePath).pipe(parse({headers: true}))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", async (row) => {
                row = _.mapKeys(row, (value: string, key: string) => {
                    return key.toLowerCase();
                });
                result.push(row);
            });
        return res.json({result});
    } catch (err) {
        logger.error(err);
        return res.status(400).send("Error in Filling Data");
    }
};
