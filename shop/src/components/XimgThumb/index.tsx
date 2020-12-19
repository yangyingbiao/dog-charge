import React from 'react'
import { ImagePropsType } from '../props';
import XossImage from '../XossImage';

import styles from './index.less'

const XimgThumb : React.FC = (props : ImagePropsType) => {
    let _props = {...props}
    let className = _props.className || ''
    delete _props.className
    return (
        <div className={className + ' ' + styles.container}>
            <XossImage {..._props} thumb={true} width={_props.width || '100%'} />
        </div>
    )
}

export default XimgThumb