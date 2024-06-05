"use client"
import { Box, Flex, Link, Text, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.600" color="white" py={6} maxH="80px" width="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        px={{ base: 4, md: 8 }}
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold">
            Job Application Tracker
          </Text>
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Text>
        </Box>
        <Flex direction="column" textAlign="center">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            mb={{ base: 4, md: 0 }}
          >
            <Link href="#" mx={2}>
              Privacy Policy
            </Link>
            <Link href="#" mx={2}>
              Terms of Service
            </Link>
            <Link href="#" mx={2}>
              Future Plans
            </Link>
            <Link
              href="https://www.linkedin.com/in/yang-li-3626a0236/"
              isExternal
              mx={2}
            >
              Contact Us
            </Link>
          </Flex>
          <Text>Not Available Yet</Text>
        </Flex>

        <Flex>
          <Link href="https://github.com/buhuiyonggou" isExternal mx={2}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
          {/* <Link href="#" isExternal mx={2}>
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="#" isExternal mx={2}>
            <Icon as={FaTwitter} boxSize={6} />
          </Link> */}
          <Link
            href="https://www.linkedin.com/in/yang-li-3626a0236/"
            isExternal
            mx={2}
          >
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
