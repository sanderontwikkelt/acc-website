import { redirect } from "next/navigation";

import prismadb from "~/lib/prismadb";
import { SettingsForm } from "./components/settings-form";

const SettingsPage = async () => {
  const settings = await prismadb.settings.findFirst();

  if (!settings) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
};

export default SettingsPage;
