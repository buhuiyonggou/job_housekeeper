import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Link, Menu, MenuButton, MenuList, MenuItem, Skeleton, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <Menu>
        <MenuButton as={Box} cursor="pointer">
          <Avatar
            src={session!.user!.image!}
            name={session!.user!.name!}
            size="sm"
            referrerPolicy="no-referrer"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text size="sm">{session!.user!.email}</Text>
          </MenuItem>
          <MenuItem>
            <Link href="/api/auth/signout">Log out</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
