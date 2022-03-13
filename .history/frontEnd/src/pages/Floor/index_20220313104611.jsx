import React from 'react'
import { useMatch, useParams } from 'react-router-dom'

export default function Floor() {
  const {id} = useParams()
  const match = useMatch('/floor/:id')
  console.log(match);

  return (
    <div>Floor {id} </div>
  )
}
