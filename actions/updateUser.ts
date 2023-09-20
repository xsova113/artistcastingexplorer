import { toast } from "@/components/ui/use-toast";
import { clerkClient } from "@clerk/nextjs";

type Params = {
  firstName?: string;
  lastName?: string;
  password?: string;
  primaryEmailAddressID?: string;
};

const updateUser = async (userId: string, params: Params) => {
  try {
    if (!userId)
      return toast({
        title: "Invalid Action",
        description: "You must be logged in to edit your profile.",
        variant: "destructive",
      });

    const updatedUser = await clerkClient.users.updateUser(userId, {
      firstName: params.firstName,
      lastName: params.lastName,
    });
    return updatedUser;
  } catch (error: any) {
    console.log("Error updating user: " + error.message);
  }
};

export default updateUser;
