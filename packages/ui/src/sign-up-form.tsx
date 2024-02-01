"use client";

import React from "react";
import { z } from "zod";

import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "./form";
import { Input } from "./input";

export const schema = z.object({
  name: z.string().min(1),
  email: z.string().min(2).email(),
  password: z.string().min(1),
});

export const SignUpForm = () => {
  const form = useForm({
    schema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full max-w-2xl flex-col gap-4"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Naam" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="E-mail" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Wachtwoord" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-min">Inloggen</Button>
        </form>
      </Form>
    </>
  );
};
