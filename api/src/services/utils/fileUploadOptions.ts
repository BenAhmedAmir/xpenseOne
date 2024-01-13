const supportedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bnp'
];

const fileUploadOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (!supportedMimeTypes.includes(file.mimetype)) {
            return cb(null, false);
        }
        cb(null, true)
    }
}

export default fileUploadOptions;