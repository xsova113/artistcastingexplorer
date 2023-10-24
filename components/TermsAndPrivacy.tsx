import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TermsAndPrivacyProps {
  terms?: boolean;
}

export default function TermsAndPrivacy({ terms }: TermsAndPrivacyProps) {
  return (
    <Dialog>
      <DialogTrigger className="text-primary">
        {terms ? "Terms & Conditions" : "Privacy Policy"}
      </DialogTrigger>
      <DialogContent className="h-[600px] w-full overflow-auto md:min-w-[605px] p-0">
        {terms ? (
          <iframe
            src="https://docs.google.com/document/d/e/2PACX-1vSdMRBGYn4U8U2-j3TA6dWREBlz0-VwUDyfqnxsrf3cJf1grcDhfR-scdMV9NfWCsZMHz9fcCEjC3p7/pub?embedded=true"
            height={"780px"}
            width={"600px"}
          />
        ) : (
          <iframe
            src="https://docs.google.com/document/d/e/2PACX-1vTtACSPl3mWUFyyI2CJMqAoSd0HD7WyF_zwksYZeOsMWVsrSrNYZQwgLYU67s10rGBSPeUC5yN_Hu5p/pub?embedded=true"
            height={"780px"}
            width={"600px"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
