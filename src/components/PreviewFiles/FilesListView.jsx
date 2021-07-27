import React, { useState } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useHistory } from 'react-router-dom';
import NoAttachment from '@material-ui/icons/ImageSearch';

import { previewStyles } from './PreviewFilesStyles';
import Dialog from '@material-ui/core/Dialog';

// const hadoopUrl = window.env ? window.env.REACT_APP_HDFS : process.env.REACT_APP_HDFS;

export const FilesListView = ({ record, showName }) => {
    const classes = previewStyles();
    const history = useHistory();
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
                        record.attachments.map((item, index) => {
                            return <img key={index} src={item.s3PresignedUrl} style={{
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
            <div className={classes.imageBlock}>
                {record.attachments && record.attachments.length !== 0 ?
                    <img
                        className={classes.viewIcon}
                        src={record.attachments[0].s3PresignedUrl}
                        onClick={() => handleOpen()}
                    /> : <NoAttachment />}
            </div>
            {showName ?
                <span
                    className={classes.attachmentName}
                    onClick={() => history.push(`/properties/${record.id}`)}
                >
                    {record.name}
                </span> : null
            }
            <Images />
        </div>
    )
}
