"use client";

import { Button } from "@/components/ui/button";

interface UpdateProfileFormProps {
  userId: string;
}

const UpdateProfileForm = ({ userId }: UpdateProfileFormProps) => {
  const onSubmit = async () => {};

  return (
    <>
      {!userId ? (
        <div className="mt-20">You are not signed in</div>
      ) : (
        <div className="flex flex-col">
          UpdateProfileForm
          <Button className="w-fit" onClick={onSubmit}>
            Update
          </Button>
        </div>
      )}
    </>
  );
};

export default UpdateProfileForm;
