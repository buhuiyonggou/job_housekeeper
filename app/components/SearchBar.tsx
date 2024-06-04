"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <InputGroup w="28%" mt='3'>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams?.get("query") || ""}
      />
    </InputGroup>
  );
}
