'use client';
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useEffect, useState } from "react";

export default function Home() {
  const [resource, setResource] = useState<CloudinaryUploadWidgetInfo | undefined>(undefined);

  useEffect(() => {
    console.log('Resource:', resource);
  }, [resource]);

  return (
    <div className="p-8 space-y-4">
      <h1 >Upload your image</h1>
      {resource?.secure_url ? <Image
        src={resource?.secure_url}
        alt="Uploaded Image"
        width={500}
        height={500}
      /> :
        <CldUploadWidget
          uploadPreset="ml_default"
          signatureEndpoint="api/cloudinary"
          options={{
            language: "pt",
            sources: ["local", "url"],
            cropping: true,
            croppingAspectRatio: 1,
            showPoweredBy: false,
            tags: ["example"],
          }}
          onSuccess={(response) => {
            if (response.event === "success") {
              setResource(response.info as CloudinaryUploadWidgetInfo);
            }
          }}
        >
          {({ open, isLoading }) => {
            if (isLoading) return <Button disabled>Uploading...</Button>;
            return (
              <Button onClick={() => open()}>
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>}
    </div>
  );
}
