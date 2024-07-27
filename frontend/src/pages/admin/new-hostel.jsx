import { Field, Input, Label, Textarea } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { newHostel } from "../../api";
import LocationMap from "../../components/maps/LocationMap";

const options = [
  { value: "internet", label: "internet" },
  { value: "caffetria", label: "caffetria" },
  { value: "accomodation", label: "accomodation" },
];

const NewHostel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [location, setLocation] = useState(null);

  const { isPending, mutate } = useMutation({
    mutationFn: newHostel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hostels"] });
      navigate("/admin");
      toast.success("Successfully added new hostel");
    },
    onError: (err) => {
      console.log("error while new hostel", err);
      toast.error(
        err?.response?.data?.error || "ERROR WHILE REGISTRING HOSTEL",
        {
          position: "bottom-right",
        }
      );
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = (index) => {
    setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (coords) => {
    setLocation(coords);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("rent", rent);
    formData.append("location", JSON.stringify(location));
    formData.append("features", JSON.stringify(features.map((f) => f.value)));
    selectedImages.forEach((image) => {
      formData.append(`images`, image);
    });

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-11/12 mx-auto">
      <Field className="mb-4">
        <Label className="block text-gray-700 font-semibold mb-2">Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </Field>
      <Field className="mb-4">
        <Label className="block text-gray-700 font-semibold mb-2">
          Description
        </Label>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </Field>
      <Field className="mb-4">
        <Label className="block text-gray-700 font-semibold mb-2">
          Features
        </Label>
        <CreatableSelect
          isMulti
          isClearable
          name="features"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          value={features}
          onChange={(val) => setFeatures(val)}
        />
      </Field>
      <Field className="mb-4">
        <Label className="block text-gray-700 font-semibold mb-2">
          Monthly Rent in Nrs
        </Label>
        <Input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </Field>

      <Field className="mb-4">
        <Textarea
          type="text"
          value={location?.full_address || "SELECT LOCATION ON MAP"}
          disabled
          className="border p-2 w-full rounded my-2"
        />
        <LocationMap onLocationSelect={handleLocationSelect} />
      </Field>

      <div
        {...getRootProps()}
        className="flex items-center justify-center gap-2 p-2 border my-4"
      >
        <Input {...getInputProps()} />
        <span>Select Images</span>
        <Upload className="w-4 h-4" />
      </div>
      {selectedImages.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4 h-64">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={`${URL.createObjectURL(image)}`}
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                onClick={() => handleRemoveImage(index)}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center  justify-center w-full my-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-500"
      >
        {isPending && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
        Add Hostel
      </button>
    </form>
  );
};

export default NewHostel;
