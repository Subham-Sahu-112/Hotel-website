import React, { useEffect, useState } from "react";
import "./CreateListing.css";
import BasicInformation from "./components/BasicInformation";
import HotelAmenities from "./components/HotelAmenities";
import RoomTypesPricing from "./components/RoomTypesPricing";
import ContactInformation from "./components/ContactInformation";
import HotelImages from "./components/HotelImages";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    basicInfo: {
      hotelName: "",
      starRating: "",
      description: "",
      address: "",
      city: "",
      country: "",
    },
    amenities: [],
    roomTypes: [
      {
        id: 1,
        roomType: "",
        pricePerNight: "",
        maxGuests: "",
      },
    ],
    contactInfo: {
      email: "",
      phone: "",
      checkInTime: "",
      checkOutTime: "",
    },
    images: {
      mainImage: null,
      additionalImages: [],
    },
  });

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append images
      if (formData.images.mainImage) {
        formDataToSend.append("mainImage", formData.images.mainImage);
      }
      if (
        formData.images.additionalImages &&
        formData.images.additionalImages.length > 0
      ) {
        formData.images.additionalImages.forEach((file) => {
          formDataToSend.append("additionalImages", file);
        });
      }

      // Append JSON fields
      formDataToSend.append("basicInfo", JSON.stringify(formData.basicInfo));
      formDataToSend.append(
        "contactInfo",
        JSON.stringify(formData.contactInfo)
      );
      formDataToSend.append("amenities", JSON.stringify(formData.amenities));
      formDataToSend.append("roomTypes", JSON.stringify(formData.roomTypes));

      // Send to backend
      const response = await fetch("http://localhost:1000/hotels", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Hotel saved successfully:", data.hotel);
        toast.success("Hotel created successfully!");
        Navigate("/vender/properties");
      } else {
        console.error("❌ Error:", data.message);
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("⚠️ Server error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="create-listing-container">
      <div className="create-listing-wrapper">
        <form onSubmit={handleSubmit} className="create-listing-form">
          <Header />

          <BasicInformation
            data={formData.basicInfo}
            onChange={(data) => updateFormData("basicInfo", data)}
          />

          <HotelAmenities
            data={formData.amenities}
            onChange={(data) => updateFormData("amenities", data)}
          />

          <RoomTypesPricing
            data={formData.roomTypes}
            onChange={(data) => updateFormData("roomTypes", data)}
          />

          <ContactInformation
            data={formData.contactInfo}
            onChange={(data) => updateFormData("contactInfo", data)}
          />

          <HotelImages
            data={formData.images}
            onChange={(data) => updateFormData("images", data)}
          />

          <div className="list-submit-button-container">
            <button type="submit" className="list-submit-button">
              Create Hotel Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
