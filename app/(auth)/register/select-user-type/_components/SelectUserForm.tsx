"use client";
import React from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSelectUserType } from "@/hooks/auth/useSelectUserType";
import FormInputs from "@/app/(auth)/_components/FormInputs";
import Link from "next/link";

const SelectUserForm: React.FC = () => {
  const { initialValues, validationSchema, handleUserTypeSubmit } =
    useSelectUserType();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-950">
            Select User Type
          </CardTitle>
          <CardDescription className="text-center">
            Choose your account type to complete registration
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUserTypeSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    onValueChange={(value) => setFieldValue("userType", value)}
                    value={values.userType}
                  >
                    <SelectTrigger id="userType">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TENANT">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {values.userType === "TENANT" && (
                  <FormInputs formType="userType" />
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-blue-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                </Button>
                <Button
                  variant="link"
                  className="text-blue-950 hover:underline"
                  asChild
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SelectUserForm;
