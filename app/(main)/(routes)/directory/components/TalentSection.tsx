"use client";

import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import FilterAccordian from "./FilterAccordian";
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mockData } from "@/lib/data";

const TalentSection = () => {
  const [data, setData] = useState(mockData);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data.length]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = data.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Stack className="items-center bg-white w-full pb-24 mx-auto max-w-screen-lg">
      <FilterAccordian />
      <h1 className="text-3xl lg:text-4xl font-semibold">Talents</h1>
      <div className="border-b-2 w-1/12 border-primary mt-8 mb-12" />
      <div className="w-full px-8 md:px-10">
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {subset.map((item, index) => (
            <TalentCard
              key={index}
              name={item.name}
              title={item.title}
              location={item.location}
              age={item.age}
              image={item.image}
            />
          ))}
        </div>

        <ReactPaginate
          nextLabel={<ArrowRight />}
          previousLabel={<ArrowLeft />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center justify-center gap-24"}
          activeClassName="bg-secondary py-1 px-2 rounded"
        />
      </div>
    </Stack>
  );
};

export default TalentSection;
