const ArtistSteps = () => {
  return (
    <div className="flex flex-col gap-y-4 sm:w-1/2">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg font-semibold">For Artist or Creator</h1>
        <p className="text-sm text-muted-foreground">
          Easy 4 Steps to register and post your artist profile!
        </p>
      </div>
      <ul className="space-y-1 text-sm">
        <li>1. Sign-up here for free!</li>
        <li>2. Click here and fill out your profile!</li>
        <li>3. Create your profile form!</li>
      </ul>
    </div>
  );
};

export default ArtistSteps;
