import React from 'react'
import { Image } from '@tarojs/components'
export default (props : {src : string, [key : string] : any}) => {
    return (
        <Image className={props.className} mode={props.mode || 'widthFix'} lazy-load={props.lazyLoad || false} src={require('../assets/images/' + props.src)}></Image>
    )
}