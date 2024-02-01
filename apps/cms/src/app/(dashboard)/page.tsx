import { ArrowUpRightIcon, ClockIcon, Share2Icon } from "lucide-react";

import { auth } from "@acme/auth";

import { getDashboardData } from "~/actions/get-dashboard-data";
import { Overview } from "~/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CalendarDateRangePicker } from "~/components/ui/date-range-picker";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { UserGeoOverview } from "~/components/user-geo-overview";
import { ViewsPerTitle } from "~/components/views-per-title";
import { getDateString } from "~/lib/utils";

interface DashboardPageProps {
  params: {};
  searchParams?: { [key: string]: string | undefined };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  searchParams,
}) => {
  const session = await auth();
  console.log(session);
  const startDate = searchParams?.startDate ?? getDateString(7) ?? "";
  const endDate = searchParams?.endDate ?? getDateString() ?? "";

  const {
    trafficOverMonth,
    usersByCountryAndCity,
    averageBounceRate,
    averageSessionDuration,
    totalSessions,
    pageViewsPerTitle,
  } = await getDashboardData({ startDate, endDate });

  return (
    <>
      <Heading title="Dashboard" description="Overview of your store">
        <CalendarDateRangePicker startDate={startDate} endDate={endDate} />
      </Heading>
      <Separator />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totale Sessies
            </CardTitle>
            <Share2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gem. Sessieduur
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(+averageSessionDuration / 60)} min.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bouncepercentage
            </CardTitle>
            <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageBounceRate || 0}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Bezoeken per dag</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={trafficOverMonth} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Gebruikers per stad</CardTitle>
          </CardHeader>
          <CardContent>
            <UserGeoOverview data={usersByCountryAndCity} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Bezochte pagina&apos;s</CardTitle>
          </CardHeader>
          <CardContent>
            <ViewsPerTitle data={pageViewsPerTitle} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
