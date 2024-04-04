import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import { BsPencilSquare } from "react-icons/bs";

interface editApplicationProps {
  applicationId: number;
  colorScheme?: string;
  content: string;
}

const editApplication = ({applicationId, colorScheme, content} : editApplicationProps) => {
  return (
    <Button colorScheme = {colorScheme}>
    <BsPencilSquare />
    <Link href={`/applications/${applicationId}/edit`}>{content}</Link>
  </Button>
  )
}

export default editApplication