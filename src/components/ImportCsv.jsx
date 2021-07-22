import * as React from 'react';
import { ImportButton } from "react-admin-import-csv";

const ImportButtonCsv = (props) => {
    const config = {
        logging: false,
        
        disableImportNew: false,
        disableImportOverwrite: true,
        parseConfig: {
            header: true,
            dynamicTyping: true,
            transformHeader: header => {
                let label = header;
                label = label.replace(/[."]/g, '');
                return label
            },
            transform: value => {
                let label = value;
                label = label.replace(/[,]/g, '');
                return label
            }
        }
    }
    return <ImportButton {...props} {...config} />;
}

export default ImportButtonCsv;