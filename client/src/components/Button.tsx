import React from 'react'
interface ButtonProps{
    tag:string,
    onClick:()=>void
}
const Button = ({tag,onClick}:ButtonProps) => {
  return (
    <>
    <button onClick={onClick}>{tag}</button>
    </>
  )
}

export default Button