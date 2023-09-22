"use client";

import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import FilterAccordian from "./FilterAccordian";
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  City,
  Gender,
  Location,
  PerformerType,
  Province,
  TalentProfile,
  Image,
} from "@prisma/client";
import { getAge } from "@/lib/utils";

interface TalentSectionProps {
  talents: (TalentProfile & {
    images: Image[];
    location: Location;
    performerType: PerformerType;
    gender: Gender;
  })[];
}

const TalentSection = ({ talents }: TalentSectionProps) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil(talents.length / itemsPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(talents.length / itemsPerPage));
  }, [talents.length]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = talents.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Stack className="mx-auto w-full max-w-screen-lg items-center bg-white pb-24">
      <FilterAccordian />
      <h1 className="text-3xl font-semibold lg:text-4xl">Talents</h1>
      <div className="mb-12 mt-8 w-1/12 border-b-2 border-primary" />
      <div className="w-full px-8 md:px-10">
        <div className="mb-10 grid grid-cols-2 justify-center gap-6 md:grid-cols-3 lg:grid-cols-4">
          {subset.map((item) => (
            <TalentCard
              key={item.id}
              id={item.id}
              email={item.email}
              name={item.firstName}
              title={item.performerType.role}
              location={item.location.city || item.location.province}
              age={getAge(item.dob.toString())}
              image={
                item.images.filter(
                  (image) =>
                    image.url.split(".").pop() === ("jpg" || "png" || "jpeg"),
                )[0].url
              }
            />
          ))}
        </div>

        <ReactPaginate
          nextLabel={<ArrowRight />}
          previousLabel={<ArrowLeft />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={
            "flex items-center justify-center md:gap-24 gap-8"
          }
          activeClassName="bg-secondary py-1 px-2 rounded"
        />
      </div>
    </Stack>
  );
};

export default TalentSection;
