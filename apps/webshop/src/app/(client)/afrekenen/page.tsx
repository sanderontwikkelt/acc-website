import ServerWrapper from "~/components/server-wrapper";
import Section from "~/components/section";
import CartDetails from "~/components/cart-details";

export const metadata = {
    title: 'Afrekenen'
}

export default async function Page() {
return (
<ServerWrapper>
  <Section id="product-details" className="py-10 md:py-20">
    <CartDetails />
  </Section>
  </ServerWrapper>
              )
}
