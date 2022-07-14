import React from 'react'

type AppProps = {
  inputProp: {type: React.HTMLInputTypeAttribute, placeholder: React.HTMLInputTypeAttribute, name:React.HTMLInputTypeAttribute, value:React.HTMLInputTypeAttribute},
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  error: Boolean
}

const TextField : React.FC<AppProps> = ({inputProp, onChange, error}) => {
  return (
    <div>
      <div>
        <input required className='peer border p-2' {...inputProp} onChange={onChange}/>
        {error && <p className='invisible peer-invalid:visible text-red-700 font-light'>{inputProp.name} cannot be empty</p>}
      </div>
    </div>
  )
}

export default TextField