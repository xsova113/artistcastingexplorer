"use client";

import Stack from "@/components/Stack";
import TalentCard from "./TalentCard";
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import saveMultiTalents from "@/actions/saveMultiTalents";

interface TalentSectionProps {
  talents: TalentProfileType[];
}

const TalentSection = ({ talents }: TalentSectionProps) => {
  const { userId } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTalentId, setSelectedTalentId] = useState<string[]>([]);
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

  const onSaveMutiTalents = async () => {
    try {
      setIsSaving(true);

      if (!userId) {
        return toast({
          title: "Action failed",
          description: "Please login to save a talent.",
        });
      }

      await saveMultiTalents(selectedTalentId);
      toast({
        title: "Action saved",
        description: "Talents saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error favouriting talents",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack className="mx-auto w-full max-w-screen-lg items-center bg-white pb-24">
      <div className="w-full px-8 md:px-10">
        <Button
          className="mx-auto mb-2 w-fit text-xs"
          onClick={onSaveMutiTalents}
          disabled={isSaving}
          size={"sm"}
          variant={"outline"}
        >
          Bulk Submit
        </Button>
        {selectedTalentId.map((talentId) => talentId)}
        <div
          className={cn(
            "mb-10 grid grid-cols-2 justify-center gap-6 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {subset.map((item) => (
            <TalentCard
              key={item.id}
              id={item.id}
              name={item.firstName}
              title={item.performerType.role}
              location={item.location.city || item.location.province}
              ageMin={item.ageMin}
              ageMax={item.ageMax}
              data={item}
              selectedTalentId={selectedTalentId}
              image={
                item.images.filter(
                  (image) =>
                    image.url.split(".").pop() === ("jpg" || "png" || "jpeg"),
                )[0].url
              }
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              setSelectedTalentId={setSelectedTalentId}
              userId={userId}
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
