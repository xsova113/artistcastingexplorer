"use client";

import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { useAuth } from "@clerk/nextjs";
import SortForm from "./SortForm";
import SelectItemsPerPage from "./SelectItemsPerPage";

interface TalentSectionProps {
  talents: TalentProfileType[];
  talentCount: number | undefined;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const TalentSection = ({
  talents,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  talentCount,
}: TalentSectionProps) => {
  const { userId } = useAuth();
  const [selectedTalentId, setSelectedTalentId] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageCount = Math.ceil((talentCount || 0) / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = talents.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(talents.length / itemsPerPage));
  }, [itemsPerPage, talents.length]);

  return (
    <Stack className="mx-auto w-full max-w-screen-lg items-center bg-white pb-24">
      <div className="w-full px-8 md:px-10">
        <Stack className="mb-4 gap-y-1">
          <div className="mt-8 flex w-fit items-center gap-1">
            <SortForm />
            <SelectItemsPerPage
              setItemsPerPage={setItemsPerPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </Stack>

        <div
          className={cn(
            "mb-10 grid grid-cols-2 justify-center gap-6 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {subset.map((item) => (
            <TalentCard
              stageName={item.stageName}
              key={item.id}
              id={item.id}
              name={item.firstName + " " + item.lastName}
              title={item.performerType.role}
              location={item.location}
              ageMin={item.ageMin}
              ageMax={item.ageMax}
              data={item}
              likes={item.likes}
              selectedTalentId={selectedTalentId}
              image={
                item.images.filter(
                  (image) =>
                    image.url.split(".").pop() === "jpg" ||
                    image.url.split(".").pop() === "png" ||
                    image.url.split(".").pop() === "jpeg",
                )[0].url
              }
              setSelectedTalentId={setSelectedTalentId}
              userId={userId}
              email={item.email}
            />
          ))}
        </div>

        <ReactPaginate
          nextLabel={<ArrowRight size={20} />}
          previousLabel={<ArrowLeft size={20} />}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={
            "flex items-center justify-center md:gap-10 gap-8"
          }
          activeClassName="bg-secondary border py-1 px-2 rounded"
          disabledClassName="opacity-40"
        />
      </div>
    </Stack>
  );
};

export default TalentSection;
