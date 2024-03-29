import CheckoutDetails from "~/components/checkout-details";
import Section from "~/components/section";
import ServerWrapper from "~/components/server-wrapper";

export const metadata = {
  title: "Afrekenen",
};

export default async function Page() {
  return (
    <ServerWrapper>
      <Section id="product-details" className="py-10 md:py-20">
        <CheckoutDetails />
      </Section>
    </ServerWrapper>
  );
}
