import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminPanel.css";
import { getApiEndpoint } from "../../config/apiConfig";

function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Please login as admin first");
      navigate("/admin/login");
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(getApiEndpoint("/categories"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      isActive: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("adminToken");
      const url = editingCategory._id
        ? getApiEndpoint(`/categories/${editingCategory._id}`)
        : getApiEndpoint("/categories");
      
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        handleCloseModal();
        fetchCategories();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Error saving category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(getApiEndpoint(`/categories/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        getApiEndpoint(`/categories/${id}/toggle-status`),
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Error toggling status");
    }
  };

  if (isLoading) {
    return (
      <div className="admin-panel-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Panel - Hotel Categories</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-actions">
          <button onClick={() => handleOpenModal()} className="add-category-btn">
            + Add New Category
          </button>
        </div>

        <div className="categories-grid">
          {categories.length === 0 ? (
            <div className="no-categories">
              <p>No categories found. Create your first category!</p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category._id} className="category-card">
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span className={`status-badge ${category.isActive ? "active" : "inactive"}`}>
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="category-description">
                  {category.description || "No description"}
                </p>
                <div className="category-actions">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(category._id)}
                    className="toggle-btn"
                  >
                    {category.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <button onClick={handleCloseModal} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Luxury, Budget, Resort"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this category..."
                  rows="4"
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <span>Active</span>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
