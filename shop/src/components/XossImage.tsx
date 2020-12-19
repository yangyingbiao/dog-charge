import React from 'react'
import { Image } from 'antd';
import { OSS_URL } from '@/config'
import { ImagePropsType } from './props';



 const XossImage : React.FC = (props : ImagePropsType) => {
    let _props = {...props}
    if(_props.src) {
        if(_props.thumb) {
            _props.src = OSS_URL + '/thumb/' + _props.src
        }else {
            _props.src = OSS_URL + '/' + _props.src
        }
    }
    return (
        <Image {..._props} />
    )
}

export default XossImage