import React, {useState} from "react";
import { Box, Button, Checkbox, Input, Stack, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { JobFilters } from "app/src/utils/Reusables";

interface JobFilterProps {
  onSearch: (filters: JobFilters) => void;
}

const JobFilter = ({ onSearch } : JobFilterProps) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<JobFilters>();

  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemoteOnly(e.target.checked);
    setValue("remoteOnly", e.target.checked);
  };

  const onSubmit: SubmitHandler<JobFilters> = (data) => {
    onSearch({ ...data, remoteOnly: isRemoteOnly });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="8">
      <Stack spacing="4">
        <FormControl isInvalid={!!errors.query}>
          <FormLabel>Job Title</FormLabel>
          <Input
            {...register("query")}
            placeholder="Job Title"
          />
        </FormControl>
        <FormControl isInvalid={!!errors.location}>
          <FormLabel>Location</FormLabel>
          <Input
            {...register("location")}
            placeholder="Location"
          />
        </FormControl>
        <FormControl isInvalid={!!errors.distance}>
          <FormLabel>Distance (km)</FormLabel>
          <Input
            {...register("distance")}
            type="number"
            placeholder="Distance in km"
            defaultValue={50}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Remote Only</FormLabel>
          <Checkbox
            isChecked={isRemoteOnly}
            onChange={handleCheckboxChange}
          >
            Remote Only
          </Checkbox>
        </FormControl>
        <FormControl isInvalid={!!errors.datePosted}>
          <FormLabel>Date Posted</FormLabel>
          <Select {...register("datePosted")} defaultValue="month">
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="today">Today</option>
            <option value="3days">Last 3 Days</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.employmentTypes}>
          <FormLabel>Employment Types</FormLabel>
          <Input
            {...register("employmentTypes")}
            placeholder="Employment Types (e.g. fulltime;parttime;intern;contractor)"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Search
        </Button>
        <Button
          type="button"
          onClick={() => reset()}
          variant="outline"
          colorScheme="teal"
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
};

export default JobFilter;

