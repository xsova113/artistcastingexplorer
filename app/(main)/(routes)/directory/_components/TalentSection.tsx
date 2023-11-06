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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SortForm from "./SortForm";
import SelectItemsPerPage from "./SelectItemsPerPage";
import { saveTalentByUser } from "./saveTalentByUser";
import { removeTalentByUser } from "@/actions/removeTalentByUser";

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
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTalentId, setSelectedTalentId] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(12);
  const pageCount = Math.ceil((talentCount || 0) / itemsPerPage);
  const router = useRouter();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = talents.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const onBulkSave = async () => {
    try {
      setIsSaving(true);

      if (!userId) {
        return toast.error("Please login to save a talent.");
      }

      const response = await saveTalentByUser({ talentIds: selectedTalentId });
      toast.success(response.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onBulkRemove = async () => {
    try {
      setIsSaving(true);

      if (!userId) {
        return toast.error("Please login to save a talent.");
      }

      const response = await removeTalentByUser({
        talentIds: selectedTalentId,
      });
      toast.success(response.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
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
            <Button
              className="mx-auto min-w-fit text-xs"
              onClick={onBulkSave}
              disabled={isSaving || selectedTalentId.length === 0}
              size={"sm"}
              variant={"outline"}
            >
              Bulk Save
            </Button>
            <Button
              className="mx-auto min-w-fit text-xs"
              onClick={onBulkRemove}
              disabled={isSaving || selectedTalentId.length === 0}
              size={"sm"}
              variant={"outline"}
            >
              Bulk Unsave
            </Button>
          </div>
          <SelectItemsPerPage
            setItemsPerPage={setItemsPerPage}
            itemsPerPage={itemsPerPage}
          />
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
              selectedTalentId={selectedTalentId}
              image={
                item.images.filter(
                  (image) =>
                    image.url.split(".").pop() === "jpg" ||
                    image.url.split(".").pop() === "png" ||
                    image.url.split(".").pop() === "jpeg",
                )[0].url
              }
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              setSelectedTalentId={setSelectedTalentId}
              userId={userId}
              savedByUsers={item.savedByUsers}
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
