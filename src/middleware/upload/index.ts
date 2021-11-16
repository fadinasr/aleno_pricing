import multer from "multer";
import * as util from "util";
import {pipeline} from "stream";
import path from "path";
import express from "express";

// Max upload size
const maxSize = 10 * 1024 * 1024;
const pump = util.promisify(pipeline);

export const storage = multer.diskStorage({
    // Storage destination
    destination: function (req: express.Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
        cb(null, 'uploads/');
    },

    // Add file extensions
    filename(req: express.Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
        cb(null, 'CSV' + '-' + Date.now() + path.extname(file.originalname));
    }
});


// const fileFilter = function (req: express.Request, file: Express.Multer.File, callback: (error: (Error | null), acceptFile: boolean) => void) {
export const fileFilter = function (req: any, file: any, callback: any) {
    // Accept CSV only
    // TODO: Add file extensions
    if (!file.originalname.match(/\.(CSV|csv)$/)) {
        req.fileValidationError = 'Only CSV files are allowed!';
        return callback(new Error('Only CSV files are allowed!'), false);
    }
    callback(null, true);
};
