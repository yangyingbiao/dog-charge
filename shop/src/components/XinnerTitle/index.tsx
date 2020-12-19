import React from 'react';

import styles from './index.less'

const XinnerTitle : React.FC = (props) => {
    return (
        <div className={styles.container}>{props.children}</div>
    )
}

export default XinnerTitle