"use client";

import React, { useState } from "react";

import { Checkbox, cn } from "@acme/ui";

import type { Align, Button as ButtonType } from "~/lib/types";
import { sendEmail } from "~/lib/sendEmail";
import { setHtml } from "~/lib/setHtml";
import AnimatedCheck from "../animated-check";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";

const ContactForm = ({
  inputFirstNamePlaceholder,
  inputFirstNameLabel,
  inputLastNamePlaceholder,
  inputLastNameLabel,
  inputEmailPlaceholder,
  inputEmailLabel,
  inputPhoneNumberPlaceholder,
  inputPhoneNumberLabel,
  inputMessagePlaceholder,
  inputMessageLabel,
  inputConsentLabel,
  button,
  buttonAlign,
  successMessage,
}: {
  inputFirstNamePlaceholder: string;
  inputFirstNameLabel: string;
  inputLastNamePlaceholder: string;
  inputLastNameLabel: string;
  inputEmailPlaceholder: string;
  inputEmailLabel: string;
  inputPhoneNumberPlaceholder: string;
  inputPhoneNumberLabel: string;
  inputMessagePlaceholder: string;
  inputMessageLabel: string;
  inputConsentLabel: string;
  successMessage: string;
  button: ButtonType;
  buttonAlign: Align;
}) => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    setSubmitted(true);
  };

  return submitted ? (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-[0.625rem] bg-primary/20 p-5 text-center text-2xl">
      <p className="mb-0">{successMessage}</p>
      <AnimatedCheck />
    </div>
  ) : (
    <div>
      <form
        action={sendEmail}
        onSubmit={onSubmit}
        id="contact-form"
        className="flex flex-col space-y-8"
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <Input
            name="firstName"
            placeholder={inputFirstNamePlaceholder}
            label={inputFirstNameLabel}
          />
          <Input
            name="lastName"
            placeholder={inputLastNamePlaceholder}
            label={inputLastNameLabel}
          />
          <Input
            name="email"
            required
            placeholder={inputEmailPlaceholder}
            label={inputEmailLabel}
          />
          <Input
            name="phoneNumber"
            required
            placeholder={inputPhoneNumberPlaceholder}
            label={inputPhoneNumberLabel}
          />
          <Input
            name="companyName"
            required
            placeholder={inputPhoneNumberPlaceholder}
            label={inputPhoneNumberLabel}
          />
          <Input
            name="occupation"
            required
            placeholder={inputPhoneNumberPlaceholder}
            label={inputPhoneNumberLabel}
          />
          <Input
            name="subject"
            className="md:col-span-2"
            required
            placeholder={inputPhoneNumberPlaceholder}
            label={inputPhoneNumberLabel}
          />
          <Textarea
            className="md:col-span-2"
            name="message"
            required
            placeholder={inputMessagePlaceholder}
            label={inputMessageLabel}
          />
        </div>
        <div className="flex w-full items-center">
          <Checkbox name="consent" id="consent" required />
          <label
            htmlFor="content"
            className="ml-2 w-full"
            {...setHtml(inputConsentLabel)}
          />
        </div>
        {!!button?.title && (
          <Button
            className={cn(
              "mt-4 w-min",
              buttonAlign === "center"
                ? "mx-auto"
                : buttonAlign === "right"
                  ? "ml-auto"
                  : "",
            )}
            variant={button.variant as "link"}
            size={button.size as "lg"}
          >
            {button.title}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
