'use client'
import React from 'react'

export default function Pregunta({pregunta,name}: {pregunta: string,name:string}) {

  const [length, setLength] = React.useState(0)
  return (
    
    <section className='w-full flex flex-col gap-5'>
        <span className='text-center text-primary text-xl font-semibold' >{pregunta}</span>
        <textarea className='w-full border-primary border-2 outline-none rounded-lg p-5' 
        name={name} cols={30} rows={5}
        onChange={(e) => {
            const words = e.target.value.split(' ')
            if( words.length <= 200) {

                setLength(words.length)

            }
            else {
                //tomar los primeros 200
                e.target.value = words.slice(0, 200).join(' ')
                
                setLength(200)
            }
        }}
        />
        <span className='text-right text-primary text-sm font-semibold' >{length}/200</span>
    </section>

  )
}
