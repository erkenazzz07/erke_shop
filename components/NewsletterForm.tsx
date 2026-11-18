"use client";

import { useState } from "react";
import { showToast } from "@/lib/store";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="newsletter"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!event.currentTarget.checkValidity() || !email) {
          showToast("Enter a valid email address.");
          return;
        }
        setEmail("");
        showToast("You're on the letter. See you next month.");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input id="newsletter-email" type="email" required autoComplete="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Join →</button>
    </form>
  );
}
