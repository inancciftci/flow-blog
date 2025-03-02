"use client";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateBioSchema, UpdateImageAndNameSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  revalidateProfilePage,
  updateBio,
  updateImage,
  updateName,
} from "@/app/(root)/profile/actions/profile-actions";
import { Textarea } from "../ui/textarea";

const UserUpdateForm = ({
  type,
  userData,
}: {
  type: string;
  userData: User;
}) => {
  const imageNameForm = useForm<z.infer<typeof UpdateImageAndNameSchema>>({
    resolver: zodResolver(UpdateImageAndNameSchema),
    defaultValues: {
      avatarUrl: undefined,
      firstName: "",
      lastName: "",
    },
  });
  const bioForm = useForm<z.infer<typeof UpdateBioSchema>>({
    resolver: zodResolver(UpdateBioSchema),
    defaultValues: {
      bio: "",
    },
  });
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      imageNameForm.setValue("avatarUrl", file, { shouldValidate: true });
    }
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const bioHandler = async (data: z.infer<typeof UpdateBioSchema>) => {
    setLoading(true);
    const formdata = new FormData();
    if (data.bio) {
      formdata.append("bio", data.bio);
    }
    updateBio(formdata);
    setLoading(false);
    setIsOpen(false);
    revalidateProfilePage();
  };

  const imageNameHandler = async (
    data: z.infer<typeof UpdateImageAndNameSchema>
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (data.firstName || data.lastName) {
        if (data.firstName) {
          formData.append("firstName", data.firstName);
        }
        if (data.lastName) {
          formData.append("lastName", data.lastName);
        }
        const result = await updateName(formData);
        if (!result.success) {
          console.error("Failed to update profile:", result.message);
          return;
        }
      }

      if (data.avatarUrl) {
        const imageFormData = new FormData();
        imageFormData.append("avatarUrl", data.avatarUrl);
        updateImage(imageFormData);
      }

      revalidateProfilePage();
      setIsOpen(false);
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderFormContent = () => {
    switch (type) {
      case "imageAndName":
        return (
          <Form {...imageNameForm}>
            <form
              onSubmit={imageNameForm.handleSubmit(imageNameHandler)}
              className="space-y-8 bg-white p-8 rounded-lg"
            >
              <div className="flex gap-4">
                <FormField
                  control={imageNameForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} placeholder={userData.first_name} />
                      <FormMessage className="text-red-400 font-bold">
                        {imageNameForm.formState.errors.firstName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={imageNameForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <Input {...field} placeholder={userData.last_name} />
                      <FormMessage className="text-red-400 font-bold">
                        {imageNameForm.formState.errors.lastName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={imageNameForm.control}
                name="avatarUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <Input
                      type="file"
                      className="cursor-pointer"
                      accept="image/*"
                      onChange={imageHandler}
                    />
                    <FormMessage className="text-red-400 font-bold">
                      {imageNameForm.formState.errors.avatarUrl?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`w-full bg-primary-500 ${
                  loading ? "bg-slate-500 disabled" : ""
                }`}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        );
      case "bio":
        return (
          <Form {...bioForm}>
            <form
              onSubmit={bioForm.handleSubmit(bioHandler)}
              className="space-y-8 bg-white p-8 rounded-lg min-w-[350px]"
            >
              <FormField
                control={bioForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <Textarea
                      className="h-[100px]"
                      {...field}
                      placeholder={userData.bio}
                    />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`w-full bg-primary-500 ${
                  loading ? "bg-slate-500 disabled" : ""
                }`}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        );
      default:
        return <p>Invalid form type</p>;
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (type && isOpen) {
    return (
      <div className="bg-[rgba(225,204,164,0.8)] z-[50] flex items-center justify-center fixed top-0 left-0 h-[100vh] w-full">
        <XCircleIcon
          onClick={handleOpen}
          className="absolute top-[3rem] right-[3rem] cursor-pointer text-slate-700"
          width={35}
          height={35}
        />
        {renderFormContent()}
      </div>
    );
  }

  return (
    <Button
      onClick={handleOpen}
      className="bg-primary-500 p-2 rounded-full border-white border-[2px]"
    >
      <PencilSquareIcon className="size-5 text-white" />
    </Button>
  );
};

export default UserUpdateForm;
