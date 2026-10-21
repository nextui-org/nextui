import {Person} from "@gravity-ui/icons";
import {Avatar, Button, Card, CloseButton, Separator} from "@heroui/react";
import React from "react";

import {AppleIcon, GoogleIcon} from "./components/icons";

export function LoginDemo() {
  return (
    <Card className="w-full max-w-[320px] items-start justify-center p-5">
      <Card.Header className="flex w-full items-center justify-center gap-2">
        <Avatar>
          <Avatar.Fallback>
            <Person />
          </Avatar.Fallback>
        </Avatar>
        <Card.Title>Create an account</Card.Title>
        <CloseButton className="absolute end-3 top-3" />
      </Card.Header>
      <Card.Content className="w-full gap-2">
        <p className="text-center text-sm font-medium text-muted">
          Start your free 7-day trial. No credit card required.
        </p>
        <Button className="w-full">Get Started</Button>
        <div className="flex w-full items-center gap-2 py-2">
          <Separator className="flex-1" />
          <p className="text-center text-xs font-medium text-muted uppercase">Or</p>
          <Separator className="flex-1" />
        </div>
        <Button className="w-full" variant="tertiary">
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button className="w-full" variant="tertiary">
          <AppleIcon />
          Continue with Apple
        </Button>
      </Card.Content>
    </Card>
  );
}
