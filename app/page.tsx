import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import TrashPage from "@/app/components/trash/TrashPage";

export default function Home() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8 z-999">
      <div>
        <HeaderCrumb
          screenName="Dashboard"
          screenContent="Software and tools I use on a regular basis."
          buttonName="View Now"
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <div className="lg:mt-20">
          {/* ====EMPTY TRASH GOES HERE === */}
          <TrashPage
            headingText="No Existing Statistic"
            subHeadingText={
              <span>
                No data yet. Click the{" "}
                <span className="text-primary mx-1">&apos;View More&apos;</span>{" "}
                button above to view more.
              </span>
            }
          />
        </div>
      </section>
    </main>
  );
}
