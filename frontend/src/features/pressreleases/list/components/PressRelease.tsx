"use client";

import { PressReleaseType } from "@/features/pressreleases/shared/types/PressRelease";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/shadcn/components/ui/card";
import { useRouter } from "next/navigation";

interface PressReleaseProps {
  pressRelease: PressReleaseType;
}

export default function PressRelease({ pressRelease }: PressReleaseProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pressreleases/${pressRelease.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer transition hover:shadow-lg hover:-translate-y-1 duration-200"
    >
      <CardHeader>
        <CardTitle>{pressRelease.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-3">{pressRelease.content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Created at: {new Date(pressRelease.created_at).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
