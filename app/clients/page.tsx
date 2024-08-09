import type { Metadata } from "next";
import HeaderCrumb from "@/app/components/header-crumb/HeaderCrumb";
import TrashPage from "@/app/components/trash/TrashPage";

export const metadata: Metadata = {
  title: "Clients | geodevcodes",
  description: "Total Secure Application",
};

export default function Clients() {
  return (
    <main className="min-h-screen px-4 p-2 md:p-8">
      <div>
        <HeaderCrumb
          screenName="Clients"
          screenContent="Administer client account within the platform."
          buttonName="Add Client"
        />
      </div>
      <section className="h-fit mt-8 p-6">
        <div className="lg:mt-20">
          {/* ====EMPTY TRASH GOES HERE === */}
          <TrashPage
            headingText="Start Adding Clients"
            subHeadingText={
              <span>
                No clients have been added yet. Click the{" "}
                <span className="text-primary mx-1">
                  &apos;Add Client&apos;
                </span>{" "}
                button above to create a new client.
              </span>
            }
          />
        </div>
      </section>
    </main>
  );
}
