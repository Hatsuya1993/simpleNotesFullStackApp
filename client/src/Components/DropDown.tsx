import React, { useState } from 'react'

const DropDown = ({inputProps, onChange}: {inputProps: {data: string[], typeData: string}, onChange: React.ChangeEventHandler<HTMLSelectElement>}) => {
    return (
        <div>
            <span>{inputProps.typeData} : </span>
            <select onChange={onChange} className="p-2 my-2 rounded-md border" name="" id="">
                {inputProps.data.map((each) => {
                    return (
                        <option key={each} value={each}>{each}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default DropDown