import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { BsPencilSquare } from "react-icons/bs";

interface editApplicationProps {
  applicationId: number;
  colorScheme?: string;
  content: string;
}

const EditApplicationButton = ({applicationId, colorScheme, content} : editApplicationProps) => {
  return (
    <Button colorScheme = {colorScheme} isLoading>
    <BsPencilSquare className="mr-1"/>
    <Link href={`/applications/${applicationId}/edit`}>{content}</Link>
  </Button>
  )
}

export default EditApplicationButton