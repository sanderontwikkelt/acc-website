import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import PageWrapper from "~/components/page-wrapper";
import { AdminSideBar } from "~/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="flex h-screen w-screen">
      <AdminSideBar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
}
