import * as React from "react"
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
} from "@react-email/components"

interface ContactProps {
  name?: string
  phoneNumber?: string
  email?: string
  message?: string
}

const baseUrl = "https://storage.googleapis.com/cms_upload_bucket"

export const Contact = ({
  name = "",
  phoneNumber = "",
  email = "",
  message = `“Zeno was a great guest! Easy communication, the apartment was left
        in great condition, very polite, and respectful of all house rules.
        He’s welcome back anytime and would easily recommend him to any
        host!”`,
}: ContactProps) => {
  const pmessage = `Lees het bericht van ${name}`

  return (
    <Html>
      <Head />
      <Preview>{pmessage}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section style={{ marginBottom: 20 }}>
              <Img
                src={`${baseUrl}/lphysis.png`}
                width="149"
                height="43"
                alt="Physis"
              />
            </Section>
            <Section>
              <Row>
                <Text style={heading}>
                  Dit is wat {name || "de bezoeker"} gestuurd heeft:
                </Text>
                <Text style={review}>{message}</Text>
                <Text style={paragraph}>
                  Dit formulier is ingezonden op{" "}
                  {new Date().toLocaleDateString()} om{" "}
                  {new Date().toLocaleTimeString()}.
                </Text>

                {!!phoneNumber && (
                  <Button
                    pY={19}
                    pX={0}
                    style={button}
                    href={`tel:${phoneNumber}`}
                  >
                    {name} Bellen
                  </Button>
                )}
              </Row>
            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Text style={{ ...paragraph, fontWeight: "700" }}>
                  Overige gegevens
                </Text>
                {!!name && <Text>{name}</Text>}
                {!!email && <Text>{email}</Text>}
                {!!phoneNumber && <Text>{phoneNumber}</Text>}
                <Hr style={hr} />
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
  )
}

export default Contact

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 0 48px",
  width: "580px",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
}

const paragraph = {
  marginTop: 0,
  marginBottom: 40,
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
}

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
}

const button = {
  backgroundColor: "#64BD6E",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
}

const hr = {
  borderColor: "#cccccc",
  margin: "40px 0",
}

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
}
