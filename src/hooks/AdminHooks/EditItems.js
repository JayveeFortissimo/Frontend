import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditItems = (id) => {

  const [itemDetails, setItemDetails] = useState({
    product_Name: '',
    price: '',
    gender: '',
    type: '',
    color: '',
    material: '',
    description: '',
    sizes: [{
      size: '',
      quantity: '',
      Bust: '',
      Waist: '',
      Hips: '',
      Height: '',
      Weight: ''
    }],
    id: id
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [color, setColor] = useState([]);
  const [material, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    fetch('https://backend-production-d6a2.up.railway.app/allCategorys')
      .then(response => response.json())
      .then(data => setCategorys(data.data))
      .catch(err => console.error('Error fetching categories:', err));

      fetch('https://backend-production-d6a2.up.railway.app/allColors')
      .then(response => response.json())
      .then(data => setColor(data.data))
      .catch(err => console.error('Error fetching categories:', err));

      fetch('https://backend-production-d6a2.up.railway.app/allMaterials')
      .then(response => response.json())
      .then(data => setMaterials(data.data))
      .catch(err => console.error('Error fetching categories:', err));

    // Fetch item details
    fetch(`https://backend-production-d6a2.up.railway.app/getItemsByID/${id}`)
      .then(res => res.json())
      .then(data => setItemDetails(data))
      .catch(err => console.error('Error fetching item details:', err));
  }, [id]);

  const handleChange = (e, index, field) => {
    const newSizes = [...itemDetails.sizes];
    console.log(newSizes)
    newSizes[index][field] = e.target.value;
    setItemDetails({ ...itemDetails, sizes: newSizes });
  };

  const handleForms = (type, value) => {
    setItemDetails(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const addSize = () => {
    setItemDetails({
      ...itemDetails,
      sizes: [...itemDetails.sizes, {
        size: '',
        quantity: '',
        bust: '',
        waist: '',
        hips: '',
        height: '',
        weight: ''
      }],
    });
  };

  const removeSize = (index) => {
    const newSizes = itemDetails.sizes.filter((_, i) => i !== index);
    setItemDetails({ ...itemDetails, sizes: newSizes });
  };

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://backend-production-d6a2.up.railway.app/updateItem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemDetails),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Item updated successfully');
        navigate('/admin');
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error('Error updating item');
      console.error(err);
    }
  };

  return {
    handleChange,
    handleForms,
    addSize,
    removeSize,
    handleSubmit,
    itemDetails,
    setItemDetails,
    isExpanded,
    toggleDetails,
    categorys,
    color,
    material
  };
};

export default EditItems;