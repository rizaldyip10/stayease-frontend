import React from "react";
import { Form, Formik } from "formik";
import ProfileFormField from "@/app/(user)/profile/_components/ProfileFormField";
import { UserProfile } from "@/constants/Users";
import { Button } from "@/components/ui/button";

interface UserProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  toggleEditing: () => void;
  updateProfile: (values: Partial<UserProfile>) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  profile,
  isEditing,
  toggleEditing,
  updateProfile,
}) => {
  return (
    <Formik
      initialValues={profile}
      onSubmit={(values) => {
        updateProfile(values);
      }}
      enableReinitialize
    >
      {({ values }) => (
        <Form>
          {Object.keys(profile).map((key) => {
            if (
              key === "id" ||
              key === "joinedAt" ||
              key === "userType" ||
              key === "tenantInfo" ||
              key === "avatarUrl"
            )
              return null;

            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            const isEmailField = key === "email";

            return (
              <ProfileFormField
                key={key}
                label={label}
                type={isEmailField ? "email" : "text"}
                id={key}
                name={key}
                disabled={isEmailField || !isEditing}
                values={values}
                isEditing={isEditing}
              />
            );
          })}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={toggleEditing}
              className={`${isEditing ? "bg-appcancel hover:text-appcancel hover:bg-[#FAFAFA]" : "bg-blue-950"} hover:bg-[#FAFAFA] hover:text-blue-950 font-bold text-white px-4 py-2 rounded`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                type="submit"
                className="bg-green-800 hover:bg-[#FAFAFA] hover:text-green-800 font-bold text-white px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
