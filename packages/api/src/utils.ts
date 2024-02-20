import { db, schema } from "@acme/db";

export const addOrderNotification = (orderId: number, type: number) => {
  const addNotification = (message: string) =>
    db.insert(schema.orderNotification).values({
      orderId,
      message,
      type,
    });
  if (type === 1) return () => addNotification(`Betalingsessie gestart.`);
  if (type === 2) return () => addNotification(`Betalingsessie gestopt.`);
  if (type === 3)
    return () => addNotification(`Betalingsessie succesvol afgerond.`);
  if (type === 4)
    return (status?: string) =>
      status &&
      Object.keys(orderStatusTranslations).includes(status) &&
      addNotification(
        `Bestellingsstatus gewijzigd naar ${orderStatusTranslations[status as "WAITING_PAYMENT"]}.`,
      );
  return () => addNotification(`Bestelling geplaatst.`);
};

export const orderStatusTranslations = {
  WAITING_PAYMENT: "Wachtend op betaling",
  IN_PROGRESS: "In behandeling",
  WAITING: "In de wacht",
  FINISHED: "Afgerond",
  CANCELLED: "Geannuleerd",
  REFUNDED: "Terugbetaald",
  FAILED: "Mislukt",
  CONCEPT: "Concept",
};

export const orderStatusBadges = {
  WAITING_PAYMENT: "blue",
  IN_PROGRESS: "blue",
  WAITING: "blue",
  FINISHED: "green",
  CANCELLED: "destructive",
  REFUNDED: "default",
  FAILED: "destructive",
  CONCEPT: "outline",
};

export const findCoordinates = async (
  address: string,
): Promise<{ error?: string; lat?: string; lng?: string }> => {
  const apiKey = process.env.GEOLOCATION_API_KEY;

  console.info("Retrieving lat, lng for: " + address, apiKey);
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => {
      if (response.status === "ZERO_RESULTS" || !response.results[0])
        return { error: "wrong address" };
      return {
        lat: String(response.results[0].geometry.location.lat),
        lng: String(response.results[0].geometry.location.lng),
      };
    })
    .catch((e: unknown) => {
      console.info(e, "error");
      return { error: JSON.stringify(e) };
    });
};
