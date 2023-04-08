import React, { useState } from 'react';
import {
    ImageInput,
    ImageField,
} from 'react-admin';
import FileViewer from 'react-file-viewer';
import { previewStyles } from './PreviewFilesStyles';
import Dialog from '@material-ui/core/Dialog';

// const hadoopUrl = window.env ? window.env.REACT_APP_HDFS : process.env.REACT_APP_HDFS;

const FileView = ({ record }) => {
    const type = record.type;
    if (type === 'jpg' || type === 'png' || type === 'jpeg') {
        return (
            <div>
                <img style={{ width: '100%', height: '100%' }} src={record.s3PresignedUrl} />
            </div>
        )
    } else {
        return (
            <FileViewer
                fileType={type}
                filePath={record.s3PresignedUrl}
            />
        )
    }
}

export const FilesCreateEdit = ({ record, source }) => {
    const classes = previewStyles();
    const [view, setView] = useState(false);
    const handleOpen = () => {
        setView(true);
    };

    const handleClose = () => {
        setView(false);
    };

    if (record && record.s3PresignedUrl) {
        return (
            <div className={classes.attachmentBlock}>
                <div style={{ width: '100%', height: '70px', display: 'flex' }}>
                    <img style={{
                        objectFit: 'contain',
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        cursor: 'pointer'
                    }} src={record.s3PresignedUrl}
                    onClick={() => handleOpen()}
                    />
                </div>

                <Dialog
                    open={view}
                    onClose={handleClose}
                    style={{ textAlign: 'center' }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <FileView record={record} source={source} />
                </Dialog>
            </div>
        )
    }
    return (
        <ImageInput source={source} label="Related files" accept="image/png, image/jpg, image/jpeg">
            <ImageField source="src" target="_blank" title="title" />
        </ImageInput>
    )
}