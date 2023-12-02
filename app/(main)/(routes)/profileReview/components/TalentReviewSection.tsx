"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import TalentReviewCard from "./TalentReviewCard";
import { TalentProfileType } from "@/types/talentProfileType";
import Stack from "@/components/Stack";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSortStore } from "@/hooks/useSortStore";
import SortForm from "../../directory/_components/SortForm";
import { Button } from "@/components/ui/button";
import { useReviewStore } from "@/hooks/useReviewStore";

interface TalentReviewSectionProps {
  filteredTalents: TalentProfileType[];
}

const TalentReviewSection = ({ filteredTalents }: TalentReviewSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil(filteredTalents.length / itemsPerPage);
  const { orderBy } = useSortStore();
  const [selectedTalentIds, setSelectedTalentIds] = useState<string[]>([]);
  const { onOpen } = useReviewStore();

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTalents.length / itemsPerPage));
  }, [filteredTalents.length]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = filteredTalents.slice(startIndex, endIndex).sort(
    orderBy === "name-a"
      ? (a, b) => a.firstName.localeCompare(b.firstName)
      : orderBy === "name-z"
      ? (a, b) => b.firstName.localeCompare(a.firstName)
      : () => {
          return 0;
        },
  );

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Stack className="mt-14">
      <div className="flex w-fit items-center gap-1">
        <SortForm />
        <Button
          className="mx-auto min-w-fit text-xs"
          onClick={() => onOpen({ talentIds: selectedTalentIds }, "approve")}
          disabled={selectedTalentIds.length === 0}
          size={"sm"}
          variant={"outline"}
        >
          Bulk Approve
        </Button>
        <Button
          className="mx-auto min-w-fit text-xs"
          onClick={() => onOpen({ talentIds: selectedTalentIds }, "reject")}
          disabled={selectedTalentIds.length === 0}
          size={"sm"}
          variant={"outline"}
        >
          Bulk Reject
        </Button>
      </div>
      <div className="mb-12 mt-6 grid grid-cols-12 gap-3 md:gap-8">
        {subset.map((talent) => (
          <TalentReviewCard
            key={talent.id}
            talent={talent}
            selectedTalentIds={selectedTalentIds}
            setSelectedTalentIds={setSelectedTalentIds}
          />
        ))}
      </div>
      <ReactPaginate
        nextLabel={<ArrowRight />}
        previousLabel={<ArrowLeft />}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"flex items-center justify-center gap-8"}
        activeClassName="bg-secondary py-1 px-2"
      />
    </Stack>
  );
};

export default TalentReviewSection;
