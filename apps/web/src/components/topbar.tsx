import {
  ArchiveIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import type { FC } from "react";

import { useParams } from "react-router";
import type { Note } from "../types/note";
import useNotesStore from "../stores/useNotesStore";
const Topbar: FC = () => {
  const { id } = useParams();
  const { notes } = useNotesStore();
  const note = notes.find((note: Note) => note.id === id);

  return (
    <Flex justify="between" gap="6">
      <Box>
        {note && (
          <Flex align="center" gap="2">
            <Box>
              <Text as="span">{note.title}</Text>
            </Box>
          </Flex>
        )}
      </Box>
      <Flex gap="5">
        <IconButton
          variant="ghost"
          color="gray"
          size="4"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Pencil2Icon />
        </IconButton>
        <IconButton variant="ghost" color="gray" size="4">
          <BookmarkIcon />
        </IconButton>
        <IconButton variant="ghost" color="gray" size="4">
          <ArchiveIcon />
        </IconButton>
        <IconButton variant="ghost" color="gray" size="4">
          <DotsHorizontalIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
};
export default Topbar;
