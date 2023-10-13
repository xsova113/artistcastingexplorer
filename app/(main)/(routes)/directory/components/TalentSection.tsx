"use client";

import Stack from "@/components/Stack";
import TalentCard, { UserSavedTalentType } from "./TalentCard";
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import createSavedTalents from "@/actions/createSavedtalents";
import { findUserSavedTalent } from "@/actions/findUserSavedTalent";
import { updateSavedTalents } from "@/actions/updateSavedTalents";
import { removeSavedTalents } from "@/actions/removeSavedTalents";
import { useRouter } from "next/navigation";
import SortForm from "./SortForm";
import SelectItemsPerPage from "./SelectItemsPerPage";

interface TalentSectionProps {
  talents: TalentProfileType[];
}

const TalentSection = ({ talents }: TalentSectionProps) => {
  const { userId } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTalentId, setSelectedTalentId] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [UserSavedTalent, setUserSavedTalent] = useState<UserSavedTalentType>();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const pageCount = Math.ceil(talents.length / itemsPerPage);
  const router = useRouter();

  useEffect(() => {
    setTotalPages(Math.ceil(talents.length / itemsPerPage));
  }, [itemsPerPage, talents.length]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = talents.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };

  const fetchUserSavedTalent = async () => {
    const response = await findUserSavedTalent();
    if (!response) return console.log("No UserSavedTalent found");
    setUserSavedTalent(response);
  };

  const onBulkSave = async () => {
    try {
      setIsSaving(true);

      if (!userId) {
        return toast({
          title: "Action failed",
          description: "Please login to save a talent.",
        });
      }

      if (!UserSavedTalent) {
        toast({
          title: "Action saved",
          description: "Talents saved successfully",
        });

        router.refresh();
        return await createSavedTalents(selectedTalentId);
      }

      // If UserSavedTalents exist but savedTalents ID not found, update it
      const unSavedTalentIds = selectedTalentId.filter(
        (id) =>
          !UserSavedTalent.savedTalents
            .map((talent) => talent.talentProfileId)
            .includes(id),
      );

      router.refresh();
      await updateSavedTalents(unSavedTalentIds);

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

  const onBulkRemove = async () => {
    try {
      setIsSaving(true);

      if (!userId) {
        return toast({
          title: "Action failed",
          description: "Please login to save a talent.",
        });
      }

      router.refresh();
      await removeSavedTalents(selectedTalentId);

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

  useEffect(() => {
    fetchUserSavedTalent();
  }, [isSaving]);

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
              Bulk Remove
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
                    image.url.split(".").pop() === "jpg" ||
                    image.url.split(".").pop() === "png" ||
                    image.url.split(".").pop() === "jpeg",
                )[0].url
              }
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              setSelectedTalentId={setSelectedTalentId}
              userId={userId}
              UserSavedTalent={UserSavedTalent}
              fetchUserSavedTalent={fetchUserSavedTalent}
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
        />
      </div>
    </Stack>
  );
};

export default TalentSection;
