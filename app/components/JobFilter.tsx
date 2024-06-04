import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { JobFilters } from "app/src/utils/Reusables";

interface JobFilterProps {
  onSearch: (filters: JobFilters) => void;
  defaultValues: JobFilters;
}

const JobFilter = ({ onSearch, defaultValues }: JobFilterProps) => {
  const [isRemoteOnly, setIsRemoteOnly] = useState(defaultValues.remoteOnly);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFilters>({
    defaultValues,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemoteOnly(e.target.checked);
  };

  const onSubmit: SubmitHandler<JobFilters> = (data) => {
    const employmentTypesArray = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name="employmentTypes"]:checked')
    ).map((el) => el.value);
    const employmentTypes = employmentTypesArray.join(";");
    onSearch({ ...data, employmentTypes, remoteOnly: isRemoteOnly });
  };

  return (
    <div className="max-w-md">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="8">
        <Heading as='h4' size='md' textAlign="center" m="4">Search Postings</Heading>
        
        <Stack spacing="2">
          <FormControl isInvalid={!!errors.query} isRequired>
            <FormLabel textAlign="center" >Job Description</FormLabel>
            <Input {...register("query")} placeholder="Job Title, Position, Key Skills, etc" />
          </FormControl>

          <Flex justifyContent="space-between">
            <FormControl isInvalid={!!errors.location} m="2" ml="0" isRequired>
              <FormLabel textAlign="center">Location</FormLabel>
              <Input {...register("location")} placeholder="Toronto, Ontario, Canada etc" disabled={isRemoteOnly} />
            </FormControl>
            <FormControl isInvalid={!!errors.distance} m="2" mr="0">
              <FormLabel textAlign="center">Distance (km)</FormLabel>
              <Input {...register("distance")} type="number" placeholder="Distance in km" defaultValue={50} />
            </FormControl>
          </Flex>
        
          <Flex justifyContent="center" alignItems="center"> 
            <FormControl isInvalid={!!errors.datePosted} m="2" ml="0">
              <FormLabel textAlign="center">Date Posted</FormLabel>
              <Select {...register("datePosted")} defaultValue="month">
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="today">Today</option>
                <option value="3days">Last 3 Days</option>
              </Select>
            </FormControl>
            <FormControl m="2" mr="0" textAlign="center">
              <Checkbox {...register("remoteOnly")} onChange={handleCheckboxChange}>Remote Only</Checkbox>
            </FormControl>
          </Flex>

          <Flex>
            <FormControl isInvalid={!!errors.employmentTypes}>
              <FormLabel textAlign="center">Employment Types</FormLabel>
              <Flex justifyContent="space-around" mt="4">
                <Checkbox value="contractor" name="employmentTypes">Contractor</Checkbox>
                <Checkbox value="fulltime" name="employmentTypes">Full-time</Checkbox>
                <Checkbox value="parttime" name="employmentTypes">Part-time</Checkbox>
                <Checkbox value="intern" name="employmentTypes">Intern</Checkbox>
              </Flex>
            </FormControl>
          </Flex>
        </Stack>

        <Flex p="4" mt="6" justifyContent="space-evenly">
          <Button type="button" onClick={() => reset()} variant="outline" colorScheme="teal">
            Reset
          </Button>
          <Button type="submit" colorScheme="teal">
            Search
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default JobFilter;
