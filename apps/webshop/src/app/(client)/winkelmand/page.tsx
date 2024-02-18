import CartDetails from "~/components/cart-details";
import Section from "~/components/section";
import ServerWrapper from "~/components/server-wrapper";

export const metadata = {
  title: "Winkelmand",
};

export default async function Page() {
  return (
    <ServerWrapper>
      <Section id="product-details" className="py-10 md:py-20">
        <CartDetails />
      </Section>
    </ServerWrapper>
  );
}
