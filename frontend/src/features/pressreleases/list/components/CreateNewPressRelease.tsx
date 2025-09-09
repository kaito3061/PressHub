import { Button } from "@/features/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shadcn/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import createPressRelease from "../../shared/services/createPressRelease";
export default function CreateNewPressRelease() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    const pressRelease = await createPressRelease();
    if (pressRelease) {
      router.push(`pressreleases/${pressRelease.id}/edit`);
    }
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>新規作成</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>PressReleaseを作成しますか？</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleCreate}>作成</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
