import React, { useState } from 'react';
import {
    FileInput,
    FileField,
} from 'react-admin';
import FileViewer from 'react-file-viewer';
import { previewStyles } from './PreviewFilesStyles';
import Dialog from '@material-ui/core/Dialog';

const hadoopUrl = window.env ? window.env.REACT_APP_HDFS : process.env.REACT_APP_HDFS;

const FileView = ({ record }) => {
    const type = record.type;
    if (type === 'jpg' || type === 'png' || type === 'jpeg') {
        return (
            <div>
                <img style={{ width: '100%', height: '100%' }} src={hadoopUrl + record.path + '?op=OPEN'} />
            </div>
        )
    } else {
        return (
            <FileViewer
                fileType={type}
                filePath={record.path + '?op=OPEN'}
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

    if ((record && !record.hasOwnProperty('data') && !record.path.hasOwnProperty('rawFile') && record.path !== null) || source === undefined) {
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
                    }} src={hadoopUrl + record.path + '?op=OPEN'}
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
        <FileInput source={source} label="Related files">
            <FileField source="src" target="_blank" title="title" />
        </FileInput>
    )
}