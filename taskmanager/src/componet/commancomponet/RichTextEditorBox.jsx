import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import {
  BackgroundColor,
  Color,
  FontFamily,
  FontSize,
  LineHeight,
  TextStyle,
} from "@tiptap/extension-text-style";
import mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../features/Todolist/alertSlice";
import { changeDiscussion } from "../../features/Todolist/discussionSlice";
import { GET_ASSIGNABLE_USERS_FOR_TASK } from "../../features/Todolist/userAndProjectSlice";
import {
  RichTextEditorProvider,
  RichTextField,
  MenuControlsContainer,
  MenuSelectHeading,
  MenuDivider,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuButtonAlignCenter,
  MenuButtonAlignJustify,
  MenuButtonAlignLeft,
  MenuButtonAlignRight,
  MenuButtonUndo,
  MenuButtonRedo,
  MenuButtonHorizontalRule,
} from "mui-tiptap";
import { Typography, Box } from "@mui/material";
import ButtonBox from "./ButtonBox";
import { Node } from "@tiptap/core";

const mentionNode = Node.create({
  name: "mentionNode",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      label: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-mention]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        "data-mention": "true",
        "data-id": HTMLAttributes.id,
        "data-label": HTMLAttributes.label,
        class: "mention-node",
        contenteditable: "false",
      },
      `${HTMLAttributes.label}`,
    ];
  },
});

export default function RichTextEditorBox({
  value,
  user,
  editabel = false,
  handelSave,
  handelEdit,
  handelCancel,
  align,
  timeStamp,
  id,
}) {
  const dispatch = useDispatch();
  const userList = useSelector(GET_ASSIGNABLE_USERS_FOR_TASK);
  const currentUser = useSelector(
    (s) => s.currentUserStore?.currentUser || s.currentUser
  );
  const taskIdFromStore = useSelector((s) => s.taskStore?.task?.id);
  const [mentionOpen, setMentionOpen] = React.useState(false);
  const [filterList, setFilterList] = React.useState([]);
  const [mentionStart, setMentionStart] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [menuXAndY, setMenuXAndY] = React.useState([0, 0]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      BackgroundColor,
      Color,
      FontFamily,
      FontSize,
      LineHeight,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      mentionNode,
    ],
    editable: editabel,
    content: value,
    editorProps: {
      handleKeyDown(view, event) {
        if (!mentionOpen) return false;
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault();
            setActiveIndex((prev) => (prev - 1) % filterList.length);
            break;
          case "ArrowDown":
            event.preventDefault();
            setActiveIndex(
              (prev) => (prev + 1 + filterList.length) % filterList.length
            );
            break;
          case "Enter":
            event.preventDefault();
            if (filterList.length > 0 && mentionOpen) {
              insertMention(filterList[activeIndex]);
              return true;
            }
            break;
          case "Escape":
            event.preventDefault();
            setMentionOpen(false);
            break;
          default:
            break;
        }
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getJSON();
      dispatch(changeDiscussion({ commentText: html }));
    },
  });
  const handelOnSaveAlertGenerator = () => {
    const pendingMentions = [];
    try {
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "mentionNode") {
          pendingMentions.push(node.attrs.id);
        }
      });
      const relatedId = id || taskIdFromStore || null;
      pendingMentions.forEach((id) => {
        dispatch(
          addAlert({
            toUserId: id,
            fromUserId: currentUser.id,
            message: `${currentUser.username} mentioned you`,
            type: "mention",
            relatedId,
          })
        );
      });
    } catch (e) {}
  };
  const insertMention = (user) => {
    if (!editor || !user) return;
    const { state, view } = editor;
    const { $from } = state.selection;
    const offset = $from.parentOffset;

    const typedLength =
      typeof mentionStart === "number" ? Math.max(0, offset - mentionStart) : 0;

    const nodeStart = $from.start();
    const from =
      typeof mentionStart === "number"
        ? nodeStart + mentionStart - 2
        : state.selection.from;
    const to = state.selection.from;

    const mentionNodeInstance = state.schema.nodes.mentionNode.create({
      id: user.id,
      label: user.username,
    });

    const tr = state.tr
      .delete(from, to)
      .insert(from, mentionNodeInstance)
      .insert(from + mentionNodeInstance.nodeSize, state.schema.text(" "));

    view.dispatch(tr);
    view.focus();

    setMentionOpen(false);
    setFilterList([]);
    setMentionStart(null);
    setActiveIndex(0);
  };

  React.useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      const { view } = editor;
      const pos = view.state.selection.$anchor.pos;
      const coords = view.coordsAtPos(pos) || {};
      setMenuXAndY([coords.left || 0, coords.bottom || 0]);

      const { $from } = view.state.selection;
      const offset = $from.parentOffset;
      const text = $from.parent.textContent || "";
      const last = offset > 0 ? text[offset - 1] : null;

      if (last === "@") {
        setFilterList(userList || []);
        setMentionStart(offset);
        setActiveIndex(0);
        setMentionOpen(true);
        return;
      }

      if (
        mentionOpen &&
        typeof mentionStart === "number" &&
        offset < mentionStart
      ) {
        setMentionOpen(false);
        return;
      }

      if (mentionOpen && last === " ") {
        setMentionOpen(false);
        return;
      }

      if (
        mentionOpen &&
        typeof mentionStart === "number" &&
        offset >= mentionStart
      ) {
        const query = text.slice(mentionStart, offset).toLowerCase();
        const filtered = (userList || []).filter((u) =>
          u.username.toLowerCase().includes(query)
        );
        setFilterList(filtered);
      }
    };

    const selectionHandler = () => updateHandler();

    editor.on("update", updateHandler);
    editor.on("selectionUpdate", selectionHandler);

    return () => {
      editor.off("update", updateHandler);
      editor.off("selectionUpdate", selectionHandler);
    };
  }, [editor, userList, mentionOpen, mentionStart]);

  return (
    <div
      className="texteditor"
      style={{ alignSelf: align, position: "relative" }}
    >
      {mentionOpen && (
        <div
          style={{
            position: "fixed",
            left: `${menuXAndY[0] + 5}px`,
            top: `${menuXAndY[1] + 5}px`,
            width: 220,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 4,
            zIndex: 10000,
          }}
        >
          {filterList.map((u, i) => (
            <div
              key={u.id}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: 4,
                background: i === activeIndex ? "#ededed" : "transparent",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                insertMention(u);
              }}
            >
              {u.username}
            </div>
          ))}

          {filterList.length === 0 && (
            <div style={{ padding: "6px 10px", color: "#999" }}>
              No users found
            </div>
          )}
        </div>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontSize="small" color="gray" fontWeight={600} p={1}>
          {user}
        </Typography>

        {!editabel && (
          <Typography fontSize="small" color="gray" fontWeight={600} p={1}>
            {timeStamp}
          </Typography>
        )}
      </Box>

      <RichTextEditorProvider editor={editor}>
        <RichTextField
          placeholder="Write something..."
          controls={
            editabel && (
              <MenuControlsContainer>
                <MenuSelectHeading />
                <MenuDivider />
                <MenuButtonBold />
                <MenuButtonItalic />
                <MenuButtonUnderline />
                <MenuButtonAlignCenter />
                <MenuButtonAlignJustify />
                <MenuButtonAlignLeft />
                <MenuButtonAlignRight />
                <MenuButtonUndo />
                <MenuButtonRedo />
                <MenuDivider />
                <MenuButtonHorizontalRule />
              </MenuControlsContainer>
            )
          }
        />
      </RichTextEditorProvider>

      {editabel && (
        <div className="buttonOfComment">
          <ButtonBox
            saveIcon
            stylename="discussionbutton"
            onClickFunction={async () => {
              if (typeof handelSave === "function") {
                await handelSave();
              }
              handelOnSaveAlertGenerator();
            }}
          />
        </div>
      )}

      {align === "start" && (
        <div className="buttonOfComment">
          <ButtonBox
            editIcon
            stylename="discussionbutton"
            onClickFunction={() => handelEdit({})}
          />
          <ButtonBox
            deleteIcon
            stylename="discussionbutton"
            onClickFunction={() => handelCancel(id)}
          />
        </div>
      )}
    </div>
  );
}
