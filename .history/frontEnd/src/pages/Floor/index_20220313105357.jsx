import React from 'react'
import { useLocation, useMatch, useParams } from 'react-router-dom'

export default function Floor() {
  const {id} = useParams()
  const match = useMatch('/floor/:id')
  console.log(match);

  const location = useLocation()
  console.log(location);

  return (
    <div>Floor {id} </div>
  )
}
