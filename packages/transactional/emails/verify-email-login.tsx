import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailLoginProps {
  email?: string;
  url?: string;
}

const baseUrl = 'https://storage.googleapis.com/accuraat_cms_storage/email';

export const VerifyEmailLogin = ({
  email = 'sanderontwikkelt@gmail.com',
  url = 'http://localhost:3000',
}: VerifyEmailLoginProps) => {
  const previewText = `Log in bij Accuraat Verhuur`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white m-auto bg-gray-100 font-sans py-5">
          <Container className="border border-gray-200 overflow-hidden shadow-md bg-white rounded my-[40px] mx-auto w-full max-w-[465px]">
            <Section className="mt-[20px] p-5 pb-0">
              <Img
                src={`${baseUrl}/accuraat-logo.png`}
                width="40"
                height="37"
                alt="Accuraat"
                className="my-0"
              />
            </Section>
            <Section className='p-5 pt-0'>

            <Heading className="text-black text-[24px] font-normal my-[30px] mx-0">
              Log in bij <strong>Accuraat Verhuur</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hoi {email.split("@")[0]},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We hebben een aanvraag van je ontvangen om in te loggen bij Accuraat Verhuur. Klik op de volgende link om verder te gaan:
              </Text>
            <Section className="mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline px-4 py-3"
                href={url}
              >
                Log in bij Accuraat Verhuur
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Of kopiëer en plak de volgende url in je browser:{' '}
              <Link
                href={url}
                className="text-blue-600 no-underline"
              >
                {url}
              </Link>
            </Text>
            </Section>

            <Section className="bg-black p-5">

           
      <Img
        src={`${baseUrl}/accuraat-full-logo-white.png`}
        width="160"
        height="40"
        alt="Accuraat"
        className="my-0"
      />
       <Text className="text-white text-[12px] leading-[24px] mb-0">
       © Accuraat Verhuur, all rights reserved.
            </Text>
       <Text className="text-gray-500 text-[12px] leading-[24px] my-0">

            <Link
                href={url}
                className="no-underline text-inherit mr-3"
              >
                Algemene voorwaarden
              </Link> 
              |
            <Link
                href={url}
                className="no-underline text-inherit ml-3"
              >
                Privacy beleid
              </Link>
              </Text>
      </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmailLogin;
