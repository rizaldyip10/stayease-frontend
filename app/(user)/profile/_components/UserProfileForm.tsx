import React from "react";
import { Formik, Form } from "formik";
import ProfileFormField from "@/app/(user)/profile/_components/ProfileFormField";
import { UserProfile } from "@/services/profileService";

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
              key === "avatar"
            )
              return null;

            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            return (
              <ProfileFormField
                key={key}
                label={label}
                type={key === "email" ? "email" : "text"}
                id={key}
                name={key}
                disabled={key === "email" || !isEditing}
                values={values}
                onClick={
                  key === "email"
                    ? () =>
                        alert(
                          "Please go to the settings page to request an email change.",
                        )
                    : undefined
                }
              />
            );
          })}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={toggleEditing}
              className={`${isEditing ? "bg-appcancel hover:text-appcancel hover:bg-[#FAFAFA]" : "bg-blue-950"} hover:bg-[#FAFAFA] hover:text-blue-950 font-bold text-white px-4 py-2 rounded`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="bg-green-800 hover:bg-[#FAFAFA] hover:text-green-800 font-bold text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
