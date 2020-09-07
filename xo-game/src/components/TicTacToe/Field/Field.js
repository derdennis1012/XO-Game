import React from 'react';

import Figure from '../Figure/Figure'

const Field = (props) => {
    return (
        <div className="board">
            {props.fields.map((field, fKey) => (

                <Figure value={field} key={fKey} onClick={props.onClick} index={fKey} figures={props.figures} />

            ))}
        </div>
    )
}

export default Field;