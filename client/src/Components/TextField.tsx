import React from 'react'

const TextField = ({inputProp, onChange}: { onChange: React.ChangeEventHandler<HTMLInputElement>, inputProp: {type: React.HTMLInputTypeAttribute, placeholder: React.HTMLInputTypeAttribute, name:React.HTMLInputTypeAttribute, value:React.HTMLInputTypeAttribute}}) => {
  return (
    <div>
      <div>
        <input required className='peer border p-2' {...inputProp} onChange={onChange}/>
        <p className='invisible peer-invalid:visible text-red-700 font-light'>{inputProp.name} cannot be empty</p>
      </div>
    </div>
  )
}

export default TextField