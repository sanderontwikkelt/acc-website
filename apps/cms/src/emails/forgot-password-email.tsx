import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  token: string;
}

const baseUrl = "https://storage.googleapis.com/cms_upload_bucket";

export const ForgotPasswordEmail = ({
  token = "",
}: ForgotPasswordEmailProps) => {
  const href = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>
        We hebben een verzoek ontvangen om het wachtwoord van uw account bij
        Physis te resetten.
      </Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section style={{ marginBottom: 20 }}>
              <Img
                src={`${baseUrl}/physis.png`}
                width="149"
                height="43"
                alt="Physis"
              />
            </Section>
            <Section>
              <Row>
                <Text style={heading}>
                  We hebben een verzoek ontvangen om het wachtwoord van uw
                  account bij Physis te resetten.
                </Text>
                <Text style={paragraph}>
                  Als u dit verzoek niet heeft ingediend, kunt u deze e-mail
                  negeren. Als u wel uw wachtwoord wilt resetten, klik dan op de
                  onderstaande link:
                </Text>

                <Button style={button} href={href}>
                  Wachtwoord resetten
                </Button>
              </Row>
            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Text style={paragraph}>
                  Deze link is geldig voor 24 uur. Na het verstrijken van deze
                  termijn dient u een nieuw verzoek in te dienen als u nog
                  steeds uw wachtwoord wilt resetten.
                </Text>
                <Text style={paragraph}>
                  Als u problemen ondervindt met het resetten van uw wachtwoord,
                  neem dan contact met ons op via sanderontwikkelt@gmail.com.
                </Text>
                <Text style={paragraph}>
                  Als de link niet werkt, kunt u hier de volledige url vinden:
                </Text>
                <Text style={paragraph}>
                  {process.env.NEXT_PUBLIC_FRONT_URL}/reset-password?token=
                  {token}
                </Text>
              </Row>
            </Section>
            <Hr style={hr} />

            <Section>
              <Row>
                <Text style={footer}>
                  Physis {new Date().getFullYear()}, Protonstraat 9b, 9743 AL
                  Groningen
                </Text>
              </Row>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default ForgotPasswordEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  marginTop: 0,
  marginBottom: 40,
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const button = {
  backgroundColor: "#64BD6E",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const hr = {
  borderColor: "#cccccc",
  margin: "40px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
