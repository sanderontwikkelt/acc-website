"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const {
  GOOGLE_ANALITCS_CREDENTIALS_BASE64,
  GOOGLE_ANALITCS_PROPERTY_ID: propertyId,
} = process.env;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(
    Buffer.from(GOOGLE_ANALITCS_CREDENTIALS_BASE64, "base64").toString(),
  ),
});

interface DashboardData {
  pageViewsPerTitle: {
    pageTitle: string;
    pagePath: string;
    pageViews: number;
  }[];
  totalSessions: number;
  averageSessionDuration: string;
  averageBounceRate: string;
  usersByCountryAndCity: {
    country: string;
    city: string;
    userCount: number;
  }[];
  trafficOverMonth: { name: string; total: number }[];
}

// Function to fill the date range map with formatted dates as keys and 0 as initial pageViews
const fillDateRangeMap = (
  startDate: string,
  endDate: string,
): Map<string, number> => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateMap = new Map<string, number>();

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0];
    dateMap.set(formattedDate, 0);
  }

  // Ensure the end date is included
  const endFormatted = end.toISOString().split("T")[0];
  if (!dateMap.has(endFormatted)) {
    dateMap.set(endFormatted, 0);
  }

  return dateMap;
};

export const getDashboardData = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<DashboardData> => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [
      { name: "pageTitle" },
      { name: "country" },
      { name: "city" },
      { name: "date" },
      { name: "pagePath" },
    ],
    metrics: [
      { name: "screenPageViews" },
      { name: "sessions" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
      { name: "activeUsers" },
    ],
  });

  const dashboardData: DashboardData = {
    pageViewsPerTitle: [],
    totalSessions: 0,
    averageSessionDuration: "0",
    averageBounceRate: "0",
    usersByCountryAndCity: [],
    trafficOverMonth: [],
  };

  let totalDuration = 0;
  let totalBounceRate = 0;
  let sessionCount = 0;

  if (response.rows) {
    // Aggregate data for page views per title
    const pageViewsMap = new Map<
      string,
      { pageViews: number; pageTitle: string; pagePath: string }
    >();

    // Aggregate data for users by country and city
    const usersByLocationMap = new Map<
      string,
      { country: string; city: string; userCount: number }
    >();

    const dateMap = fillDateRangeMap(startDate, endDate);

    for (const row of response.rows) {
      const pageTitle = row.dimensionValues?.[0]?.value || "Niet beschikbaar";
      const country = row.dimensionValues?.[1]?.value || "Niet beschikbaar";
      const city = row.dimensionValues?.[2]?.value || "Niet beschikbaar";
      const date = row.dimensionValues?.[3]?.value || "Niet beschikbaar";
      const pagePath = row.dimensionValues?.[4]?.value || "Niet beschikbaar";
      const pageViews = parseInt(row.metricValues?.[0]?.value || "0");
      const sessions = parseInt(row.metricValues?.[1]?.value || "0");
      const sessionDuration = parseFloat(row.metricValues?.[2]?.value || "0");
      const bounceRate = parseFloat(row.metricValues?.[3]?.value || "0");

      // Aggregate sessions and calculate totals for averages
      dashboardData.totalSessions += sessions;
      totalDuration += sessionDuration * sessions; // Total duration for average calculation
      totalBounceRate += bounceRate * sessions; // Total bounce for average calculation
      sessionCount += sessions;

      const pageKey = `${pageTitle}-${pagePath}`;

      if (pageViewsMap.has(pageKey)) {
        const pageViewData = pageViewsMap.get(pageKey);
        if (pageViewData) pageViewData.pageViews += pageViews;
      } else {
        pageViewsMap.set(pageKey, { pageTitle, pagePath, pageViews });
      }

      // Users by Country and City
      const locationKey = `${country}-${city}`;
      if (usersByLocationMap.has(locationKey)) {
        const locationData = usersByLocationMap.get(locationKey);
        if (locationData) locationData.userCount += sessions; // Assuming one user per session
      } else {
        usersByLocationMap.set(locationKey, {
          country: country,
          city: city,
          userCount: sessions,
        });
      }

      const views = parseInt(row.metricValues?.[0]?.value || "0", 10); // Assuming the first metric is views
      const formatDate = `${date.substring(0, 4)}-${date.substring(
        4,
        6,
      )}-${date.substring(6, 8)}`;

      if (formatDate && dateMap.has(formatDate)) {
        dateMap.set(formatDate, (dateMap.get(formatDate) || 0) + views);
      }
    }

    // Populate the aggregated results into dashboardData
    dashboardData.pageViewsPerTitle = Array.from(pageViewsMap.values());
    dashboardData.usersByCountryAndCity = Array.from(
      usersByLocationMap,
      ([, data]) => data,
    );
    dashboardData.trafficOverMonth = Array.from(dateMap, ([date, total]) => ({
      name: date.substring(5, 10),
      total,
    }));

    // Calculate averages
    dashboardData.averageSessionDuration = (
      totalDuration / (sessionCount || 1)
    ).toFixed(2);
    dashboardData.averageBounceRate =
      ((totalBounceRate / (sessionCount || 1)) * 100).toFixed(2) + "%"; // Convert to percentage
  }

  return dashboardData;
};
