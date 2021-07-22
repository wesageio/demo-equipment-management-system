import * as React from 'react';
import {
    Edit
} from 'react-admin';

import constants from '../../resources/constants';
import { SettingsForm } from './SettingsForm';

export const SettingsEdit = (props) => {
    const settingProps = Object.assign({}, props, { 'id': constants.settingsId });
    return (
        <Edit undoable={false} {...settingProps} title="Settings">
            <SettingsForm />
        </Edit>
    );
};
