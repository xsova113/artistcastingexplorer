import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Stack from "@/components/Stack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FreePlanCard = () => {
  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL as string;

  return (
    <Card className="mb-4 h-[400px] flex-1">
      <CardHeader className="text-center">
        <CardTitle className="cursor-pointer text-3xl md:text-4xl font-bold">
          $0
        </CardTitle>
        <CardDescription>
          Subscribe to newsletter and get our latest news
        </CardDescription>
      </CardHeader>
      <Separator className="bg-primary h-1 mb-8 w-1/3 mx-auto" />
      <div className="cursor-pointer h-[250px] flex flex-col">
        <CardContent>
          <p>
            Get the latest news and interviews about our talents and the keep up
            with the film industry trends!
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <form action={mailchimpUrl} method="post" target="_blank">
            <Stack className="flex gap-6">
              <div className="flex flex-col md:flex-row gap-y-4 gap-x-4">
                <Input
                  type="text"
                  name="FNAME"
                  placeholder="First Name"
                  className="w-full md:w-fit"
                  defaultValue=""
                />

                <Input
                  type="email"
                  placeholder="email"
                  name="EMAIL"
                  required
                  defaultValue=""
                  className="w-full md:w-fit"
                />
              </div>

              <Button
                type="submit"
                name="subscribe"
                className={"font-bold uppercase w-fit rounded-full mx-auto px-8"}
              >
                Subscribe
              </Button>
            </Stack>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FreePlanCard;
