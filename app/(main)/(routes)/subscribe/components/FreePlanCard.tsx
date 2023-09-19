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
        <CardTitle className="text-3xl font-bold md:text-4xl">$0</CardTitle>
        <CardDescription>
          Subscribe to newsletter and get our latest news
        </CardDescription>
      </CardHeader>
      <Separator className="mx-auto mb-8 h-1 w-1/3 bg-primary" />
      <div className="flex h-[250px] cursor-pointer flex-col">
        <CardContent>
          <p>
            Get the latest news and interviews about our talents and the keep up
            with the film industry trends!
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <form action={mailchimpUrl} method="post" target="_blank">
            <Stack className="flex gap-6">
              <div className="flex flex-col gap-x-4 gap-y-4 md:flex-row">
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
                className={
                  "mx-auto w-fit rounded-full px-8 font-bold uppercase"
                }
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
