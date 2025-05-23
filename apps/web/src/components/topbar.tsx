import { Box, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState, type FC } from "react";

import { useParams } from "react-router";
import type { Note } from "../types/note";
import useNotesStore from "../stores/useNotesStore";

const Topbar: FC = () => {
  const { id } = useParams();
  const { notes, update } = useNotesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const note = notes.find((note: Note) => note.id === id);

  useEffect(() => {
    if (isEditing) {
      setTitle(note?.title ?? "");
    }
  }, [isEditing, note]);

  return (
    <Flex justify="between" gap="6">
      <Box>
        {note && (
          <Flex
            align="center"
            gap="2"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {isEditing ? (
              <input
                className="focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditing(false);
                    update(id ?? "", {
                      ...note,
                      title: title,
                      updatedAt: new Date(),
                    });
                  }
                }}
              />
            ) : (
              <Text>{note.title}</Text>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Topbar;
