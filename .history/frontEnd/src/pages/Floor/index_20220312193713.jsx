import React from 'react'
import { useParams } from 'react-router-dom'

export default function Floor() {
  const {id} = useParams()


  return (
    <div>Floor {id} </div>
  )
}
