import React, { useState } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { previewStyles } from './PreviewFilesStyles';
import Dialog from '@material-ui/core/Dialog';

const hadoopUrl = window.env ? window.env.REACT_APP_HDFS : process.env.REACT_APP_HDFS;

export const FilesListView = ({ attachments }) => {
    const classes = previewStyles();
    const [show, setCarousel] = useState(false);

    const handleOpen = () => {
        setCarousel(true)
    };

    const handleClose = () => {
        setCarousel(false);
    };
    const Images = () => {
        return (
            <Dialog
                open={show}
                fullScreen
                className={classes.carouselBlock}
                onClose={handleClose}
                style={{ textAlign: 'center', width: '100%' }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <AliceCarousel
                    mouseTracking={true}
                    disableButtonsControls={true}
                >
                    {
                        attachments.map((item, index) => {
                            return <img key={index} src={`${hadoopUrl + item.path}?op=OPEN`} style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain'
                            }} alt="" />
                        })
                    }
                </AliceCarousel>
            </Dialog>
        )
    }
    return (
        <div className={classes.attachmentBlock}>
            <div style={{ width: '40px', height: '50px', display: 'flex', alignItems: 'center' }}>
                <img style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    cursor: 'pointer'
                }} src={hadoopUrl + attachments[0].path + '?op=OPEN'}
                onClick={() => handleOpen()}
                />
            </div>
            <Images />
        </div>
    )
}
