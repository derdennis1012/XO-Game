import React from 'react';
const Figure = (props) => {

    const style = props.value ? `figure figure-${props.value}` : `figure`
    return (
        <div className={style} onClick={() => { props.onClick(props.index) }}>
            {props.figures[props.value]}
        </div>
    )

}

export default Figure;