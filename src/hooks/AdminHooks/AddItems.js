import { useState } from "react";
import toast from 'react-hot-toast';

const AddItems = () => {
  const [file, setFile] = useState(null);
  const [sizes, setSizes] = useState([
    { size: '', quantity: 0, bust: '', waist: '', hips: '', height: '', weight: '' }
  ]);
  const [formData, setFormData] = useState({
    product_Name: '',
    price: '',
    gender: 'Male',
    type: '',
    color: '',
    material: '',
    description: ''
  });

  const handleForms = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Update handlePicture to accept multiple files
  const handlePicture = (e) => {
    setFile(e.target.files); // Store multiple files
  };

  const addSizeField = () => {
    setSizes([...sizes, { size: '', quantity: '', bust: '', waist: '', hips: '', height: '', weight: '' }]);
  };

  const removeSizeField = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleDatas = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append form fields
      formDataToSend.append('product_Name', formData.product_Name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('sizes', JSON.stringify(sizes));

      // Append each file individually
      if (file) {
        Array.from(file).forEach((fileItem) => {
          formDataToSend.append('pictures', fileItem); // 'pictures' matches multer's field name
        });
      }

      const response = await fetch('https://backend-production-d6a2.up.railway.app/addItems', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        toast.error("Data not added successfully.");
        return;
      }

      // Reset form fields upon successful submission
      setFormData({
        product_Name: '',
        price: '',
        gender: 'Male',
        type: '',
        color: '',
        material: '',
        description: '',
      });
      setSizes([{ size: '', quantity: 0, bust: '', waist: '', hips: '', height: '', weight: '' }]);
      setFile(null); // Reset file input

      toast.success("Item added successfully.");
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return {
    handlePicture,
    handleForms,
    handleDatas,
    formData,
    addSizeField,
    removeSizeField,
    handleSizeChange,
    sizes
  };
};

export default AddItems;
