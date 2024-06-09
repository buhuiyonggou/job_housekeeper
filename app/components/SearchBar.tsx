"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("query") || "");

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <InputGroup w={{ base: "90%", md: "28%" }} mt={{ base: 0, md: 3 }}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </InputGroup>
  );
}
