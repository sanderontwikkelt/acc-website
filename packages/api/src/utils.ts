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
      addNotification(`Bestellingsstatus gewijzigd naar ${status}.`);
  return () => addNotification(`Bestelling geplaatst.`);
};
