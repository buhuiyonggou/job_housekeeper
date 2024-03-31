import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import { BsPencilSquare } from "react-icons/bs";


const editApplication = ({applicationId} : {applicationId: number}) => {
  return (
    <Button>
    <BsPencilSquare />
    <Link href={`/applications/edit/${applicationId}`}>Edit My Application</Link>
  </Button>
  )
}

export default editApplication