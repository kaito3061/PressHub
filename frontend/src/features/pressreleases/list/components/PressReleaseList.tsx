"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/shadcn/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { PressReleaseType } from "../../shared/types/PressRelease";
import PressRelease from "./PressRelease";

interface PressReleaseListProps {
  pressReleases: PressReleaseType[];
}

export default function PressReleaseList({ pressReleases }: PressReleaseListProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;

  const totalPages = Math.ceil(pressReleases.length / limit);

  const start = (page - 1) * limit;
  const end = start + limit;
  const currentPageData = pressReleases.slice(start, end);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPageData.map((pressRelease) => (
          <PressRelease pressRelease={pressRelease} key={pressRelease.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${page - 1}`} />
              </PaginationItem>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink href={`?page=${pageNumber}`} isActive={pageNumber === page}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href={`?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
