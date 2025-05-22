import { useEffect, type FC, useState } from "react";
import useNotesStore from "../stores/useNotesStore";
import { Link } from "react-router";

import {
  Box,
  ContextMenu,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";

import {
  ArchiveIcon,
  FileTextIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  PinLeftIcon,
  PinRightIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

const useSidebar = () => {
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

  const handleDelete = (id: string) => {
    remove(id);
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
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { notes, handleDelete, handleArchive } = useSidebar();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="hidden sm:block">
      <Box
        className={`flex flex-col gap-2 p-4 h-full bg-white border-r border-neutral-200 transition-all duration-300 ${className} ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <Flex justify="between" align="stretch" gap="2">
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
        </Flex>
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
              <Link
                className={`hover:bg-neutral-100 p-2 rounded-md text-sm overflow-hidden text-ellipsis whitespace-nowrap flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                }`}
                to={`/${note.id}`}
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
              </Link>
            ))}
        </Flex>
      </Box>
    </nav>
  );
};
export default Sidebar;
