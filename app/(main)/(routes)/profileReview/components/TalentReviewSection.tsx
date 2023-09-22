"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import TalentReviewCard from "./TalentReviewCard";
import { TalentProfileType } from "@/types/talentProfileType";
import Stack from "@/components/Stack";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TalentReviewSectionProps {
  filteredTalents: TalentProfileType[];
}

const TalentReviewSection = ({ filteredTalents }: TalentReviewSectionProps) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil(filteredTalents.length / itemsPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTalents.length / itemsPerPage));
  }, [filteredTalents.length]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = filteredTalents.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Stack className="gap-12">
      <div className="mt-10 grid grid-cols-12 gap-8">
        {subset.map((talent) => (
          <TalentReviewCard key={talent.id} talent={talent} />
        ))}
      </div>
      <ReactPaginate
        nextLabel={<ArrowRight />}
        previousLabel={<ArrowLeft />}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"flex items-center justify-center md:gap-24 gap-8"}
        activeClassName="bg-secondary py-1 px-2 rounded"
      />
    </Stack>
  );
};

export default TalentReviewSection;
