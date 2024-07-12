"use client"
import React from 'react'
import { Box, Flex } from "@chakra-ui/react";
import Resume from './_components/MyResume'
import ChatGPTBox from './_components/ChatBox';
import { initialMessage } from '../src/utils/constants';

const ResumeDiagnose = () => {
  return (
    <Flex 
      flexDirection={{ base: 'column', lg: 'row' }}
      height= "100vh"
      width="100%"
    >
      <Box 
        flex="1" 
        borderBottom={{ base: "1px solid #ccc", md: "none" }}
      >
        <Resume />
      </Box>
      <Box flex="1" p={5}>
        <ChatGPTBox initialMessage = {initialMessage}/>
      </Box>
    </Flex>
  );
}

export default ResumeDiagnose;