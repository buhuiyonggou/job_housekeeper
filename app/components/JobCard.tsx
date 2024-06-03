import { Box, Heading, Text, Link, Image, Badge } from '@chakra-ui/react';
import {Job} from "app/src/utils/Reusables"
import { JobProviders } from 'app/src/utils/Reusables';

const JobCard = ({ job }: { job: Job }) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={job.image} alt={job.company} />
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {job.location} Location &bull; {job.timeAgoPosted} Employment Type
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            <Heading>{job.title}</Heading>
            <Text>{job.description}</Text>
          </Box>

            {job.salaryRange}
            <Box as='span' color='gray.600' fontSize='sm'>
            {job.salaryRange}
            </Box>
  
            <Box as='span' color='gray.600' fontSize='sm'>
            {job.jobProviders.map((jobProvider: JobProviders) => (
                <Link key={jobProvider
                .jobProvider} href={
                    jobProvider.url
                }>
                    {jobProvider.jobProvider}
                </Link>
            ))}
            </Box>
          </Box>
        </Box>
    );
};

export default JobCard;