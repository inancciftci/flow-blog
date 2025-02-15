import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CustomHeading from "../customTiptapExtensions/customHeading";

interface TiptapProps {
  name: string;
}

const TiptapEditor = ({ name }: TiptapProps) => {
  const { control, setValue } = useFormContext();
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomHeading.configure({ levels: [1, 2] }),
      Bold,
      Italic,
      Link,
      Image,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(name, editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  // Function to insert an image
  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl(""); // Clear input after adding image
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <FormControl>
          <div>
            {/* Toolbar */}
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                size="sm"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  editor?.isActive("bold")
                    ? "bg-slate-800 text-white"
                    : "text-slate-800"
                )}
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                Bold
              </Button>
              <Button
                type="button"
                size="sm"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  editor?.isActive("italic")
                    ? "bg-slate-800 text-white"
                    : "text-slate-800"
                )}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                Italic
              </Button>
              <Button
                type="button"
                size="sm"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  editor?.getAttributes("heading").level === 1
                    ? "bg-slate-800 text-white"
                    : "text-slate-800"
                )}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </Button>
              <Button
                type="button"
                size="sm"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  editor?.getAttributes("heading").level === 2
                    ? "bg-slate-800 text-white"
                    : "text-slate-800"
                )}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </Button>
            </div>

            {/* Image Upload */}
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Paste image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full"
              />
              <Button size="sm" type="button" onClick={addImage}>
                Add Image
              </Button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
          </div>
        </FormControl>
      )}
    />
  );
};

export default TiptapEditor;
