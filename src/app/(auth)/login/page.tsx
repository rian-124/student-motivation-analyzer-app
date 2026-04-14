"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Login() {
  return (
    <section className="w-full flex justify-center items-center min-h-screen">
      <Card className="shadow-xl border-2 w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription>
            Masuk ke akun kamu
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>

            {/* Button */}
            <Button className="w-full">
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <a
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}