"use client";

import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <ErrorMessage message={error.message} />;
}
