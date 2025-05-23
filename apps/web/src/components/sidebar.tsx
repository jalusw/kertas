import { useEffect, type FC, useState } from "react";
import useNotesStore from "../stores/useNotesStore";
import { NavLink, useNavigate, useParams } from "react-router";

import {
  Box,
  Button,
  ContextMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";

import {
  ArchiveIcon,
  FileTextIcon,
  InfoCircledIcon,
  PinLeftIcon,
  PinRightIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

const useSidebar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, remove, archive } = useNotesStore();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        console.log("Ctrl");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = (targetId: string) => {
    remove(targetId);
    if (targetId === id) {
      navigate("/");
    }
  };

  const handleArchive = (id: string) => {
    archive(id);
  };

  return { notes, handleDelete, handleArchive };
};

type SidebarProps = {
  className?: string;
};

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [search] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { notes, handleDelete, handleArchive } = useSidebar();
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="hidden md:block">
      <Box
        className={`flex flex-col gap-2 p-4 h-full bg-white border-r border-neutral-200 transition-all duration-300  ${className} ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <Flex justify="between" align="center">
          <Flex align="center" gap="2">
            {!collapsed && <Text as="span">Kertas</Text>}
          </Flex>
          <Flex align="center" gap="2">
            <IconButton variant="outline" onClick={toggleSidebar}>
              {collapsed ? <PinRightIcon /> : <PinLeftIcon />}
            </IconButton>
          </Flex>
        </Flex>
        <Flex width="100%" mt="4" justify="center" style={{ width: "100%" }}>
          {collapsed ? (
            <IconButton
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate("/");
              }}
            >
              <PlusIcon />
            </IconButton>
          ) : (
            <Button
              variant="outline"
              style={{ width: "100%" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <PlusIcon />
              <Text as="span">New Note</Text>
            </Button>
          )}
        </Flex>
        {/* <Flex
          justify="between"
          align="stretch"
          gap="2"
          className="hidden md:flex"
        >
          {!collapsed && (
            <Box flexBasis="1">
              <TextField.Root
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon />
                </TextField.Slot>
              </TextField.Root>
            </Box>
          )}
          <IconButton variant="outline" onClick={toggleSidebar}>
            {collapsed ? <PinRightIcon /> : <PinLeftIcon />}
          </IconButton>
        </Flex> */}
        <Flex mt="4" direction="column" gap="1">
          {!collapsed && notes.length === 0 && (
            <Flex
              width="100%"
              className="text-center"
              mt="4"
              align="center"
              justify="center"
            >
              <Flex align="center" gap="2">
                <InfoCircledIcon />
                <Text className="w-full text-center" size="2">
                  No notes found
                </Text>
              </Flex>
            </Flex>
          )}
          {notes
            .filter((note) => collapsed || note.title.includes(search))
            .map((note) => (
              <NavLink
                to={`/${note.id}`}
                className={`${
                  note.id === id ? "bg-neutral-100 " : "hover:bg-neutral-100"
                } p-2 rounded-md text-sm overflow-hidden text-ellipsis whitespace-nowrap flex items-center  ${
                  collapsed ? "justify-center" : "justify-between"
                }`}
                key={note.id}
              >
                {collapsed ? (
                  <FileTextIcon />
                ) : (
                  <ContextMenu.Root>
                    <ContextMenu.Trigger>
                      <Flex align="center" gap="2">
                        <FileTextIcon />
                        <Text as="span">{note.title}</Text>
                      </Flex>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                      <ContextMenu.Item onClick={() => handleArchive(note.id)}>
                        <ArchiveIcon />
                        <Text as="span">Archive</Text>
                      </ContextMenu.Item>
                      <ContextMenu.Separator />
                      <ContextMenu.Item
                        color="red"
                        onClick={() => handleDelete(note.id)}
                      >
                        <TrashIcon />
                        <Text as="span">Delete</Text>
                      </ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu.Root>
                )}
              </NavLink>
            ))}
        </Flex>
      </Box>
    </nav>
  );
};
export default Sidebar;
