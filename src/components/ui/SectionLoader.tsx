export default function SectionLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-gray-500">
        Loading, please wait...
      </p>
    </div>
  );
}

