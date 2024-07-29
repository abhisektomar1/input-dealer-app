import React, { Children, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface Prop {
    header?:ReactNode
    children?:ReactNode
    title?:string
}

function ListCard({header,children,title}:Prop) {
  return (
    <Card >
       <CardHeader className='border-b'>
        <div className='flex flex-row justify-between items-center'>
        <CardTitle>{title}</CardTitle>
        <div>
            {header}
        </div>
        </div>
       
      </CardHeader>
      <CardContent className="p-3">
       {
        children
       }
      </CardContent>
    </Card>
  )
}

export default ListCard