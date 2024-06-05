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
import ResponsiveText from "./ResponsiveText";

interface JobFilterProps {
  onSearch: (filters: JobFilters) => void;
  defaultValues: JobFilters;
}

const JobFilter = ({ onSearch, defaultValues }: JobFilterProps) => {
  const [isRemoteOnly, setIsRemoteOnly] = useState(defaultValues.remoteOnly);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFilters>({
    defaultValues,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemoteOnly(e.target.checked);
  };

  const onSubmit: SubmitHandler<JobFilters> = (data) => {
    const employmentTypesArray = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        'input[name="employmentTypes"]:checked'
      )
    ).map((el) => el.value);
    const employmentTypes = employmentTypesArray.join(";");
    onSearch({ ...data, employmentTypes, remoteOnly: isRemoteOnly });
  };

  return (
    <div className="max-w-md border-2 p-5">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="2" overflowX="auto">
        <Heading
          as="h4"
          size="md"
          textAlign="center"
          m="4"
          mt= "0"
          fontSize={{ base: "lg", md: "xl" }}
        >
          Search Postings
        </Heading>

        <Stack spacing="2">
          <FormControl isInvalid={!!errors.query} isRequired>
            <ResponsiveText>
              <FormLabel textAlign="center">Job Description</FormLabel>
            </ResponsiveText>
            <Input
              {...register("query")}
              placeholder="Job Title, Position, Key Skills, etc"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            <FormControl
              isInvalid={!!errors.location}
              m="2"
              ml={{ base: "0", md: "0" }}
              isRequired
            >
              <ResponsiveText>
                <FormLabel textAlign="center">Location</FormLabel>
              </ResponsiveText>
              <Input
                {...register("location")}
                placeholder="Toronto, Ontario, Canada etc"
                disabled={isRemoteOnly}
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
            <FormControl
              isInvalid={!!errors.distance}
              m="2"
              ml={{ base: "0", md: "0" }}
              fontSize={{ base: "sm", md: "md" }}
              textAlign="center"
            >
              <FormLabel textAlign="center" fontSize={{ base: "sm", md: "md" }}>
                Distance (km)
              </FormLabel>
              <Input
                {...register("distance")}
                type="number"
                placeholder="Distance in km"
                defaultValue={50}
                w={{ base: "100%", md: "60%" }}
                mx="auto" 
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
          </Flex>

          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <FormControl
              isInvalid={!!errors.datePosted}
              m="2"
              ml={{ base: "0", md: "0" }}
            >
              <ResponsiveText>
                <FormLabel textAlign="center">Date Posted</FormLabel>
              </ResponsiveText>
              <Select
                {...register("datePosted")}
                defaultValue="month"
                size={{ base: "sm", md: "md" }}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="today">Today</option>
                <option value="3days">Last 3 Days</option>
              </Select>
            </FormControl>
            <FormControl m="2" mr={{ base: "0", md: "0" }} textAlign="center">
              <Checkbox
                {...register("remoteOnly")}
                onChange={handleCheckboxChange}
                size={{ base: "sm", md: "md" }}
              >
                <ResponsiveText>Remote Only</ResponsiveText>
              </Checkbox>
            </FormControl>
          </Flex>

          <Flex direction={{ base: "column", md: "row" }}>
            <FormControl isInvalid={!!errors.employmentTypes}>
              <ResponsiveText>
                <FormLabel textAlign="center">Employment Types</FormLabel>
              </ResponsiveText>
              <Flex justifyContent="space-around" mt="4">
                {["Contractor", "Full-time", "Part-time", "Intern"].map(
                  (type) => (
                    <Checkbox
                      key={type}
                      value={type.toLowerCase()}
                      name="employmentTypes"
                      size={{ base: "sm", md: "md" }}
                    >
                      <ResponsiveText>{type}</ResponsiveText>
                    </Checkbox>
                  )
                )}
              </Flex>
            </FormControl>
          </Flex>
        </Stack>

        <Flex
          pl="4"
          pr="4"
          mt="6"
          justifyContent="space-evenly"
          direction={{ base: "column", md: "row" }}
        >
          <Button
            type="button"
            onClick={() => reset()}
            variant="outline"
            colorScheme="teal"
            mb={{ base: 2, md: 0 }}
          >
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
