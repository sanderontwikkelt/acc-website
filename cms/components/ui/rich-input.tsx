import {
  BoldIcon,
  EraserIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  PaletteIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react"
import {
  Editor,
  EditorProvider,
  Toolbar,
  createButton,
} from "react-simple-wysiwyg"
import sanitizeHtml from "sanitize-html"

export const BtnBold = createButton(
  "Bold",
  <PaletteIcon style={{ margin: "auto" }} width={16} height={16} />,
  "bold"
)

export const BtnBulletList = createButton(
  "Bullet list",
  <ListIcon style={{ margin: "auto" }} width={16} height={16} />,
  "insertUnorderedList"
)

export const BtnItalic = createButton(
  "Italic",
  <ItalicIcon style={{ margin: "auto" }} width={16} height={16} />,
  "italic"
)

export const BtnStrikeThrough = createButton(
  "Strike through",
  <Strikethrough style={{ margin: "auto" }} width={16} height={16} />,
  "strikeThrough"
)

export const BtnLink = createButton(
  "Link",
  <LinkIcon style={{ margin: "auto" }} width={16} height={16} />,
  ({ $selection }) => {
    if ($selection?.nodeName === "A") {
      document.execCommand("unlink")
    } else {
      // eslint-disable-next-line no-alert
      document.execCommand("createLink", false, prompt("URL", "") || undefined)
    }
  }
)

export const BtnNumberedList = createButton(
  "Numbered list",
  <ListOrderedIcon style={{ margin: "auto" }} width={16} height={16} />,
  "insertOrderedList"
)

export const BtnRedo = createButton(
  "Redo",
  <Redo style={{ margin: "auto" }} width={16} height={16} />,
  "redo"
)

export const BtnUnderline = createButton(
  "Underline",
  <Underline style={{ margin: "auto" }} width={16} height={16} />,
  "underline"
)

export const BtnUndo = createButton(
  "Undo",
  <Undo style={{ margin: "auto" }} width={16} height={16} />,
  "undo"
)

export default function RichInput({
  id,
  value,
  onChange,
}: {
  value: string
  id: string
  onChange: (v: string) => void
}) {
  return (
    <EditorProvider>
      <Editor
        id={id}
        value={value}
        onChange={(e) => onChange(sanitizeHtml(e.target.value))}
      >
        <Toolbar
          style={{
            backgroundColor: "hsl(210 40% 96.1%)",
            borderColor: "hsl(var(--input)) !important",
          }}
        >
          <BtnUndo />
          <BtnRedo />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
        </Toolbar>
      </Editor>
    </EditorProvider>
  )
}
