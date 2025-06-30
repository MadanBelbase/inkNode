import React, { useState } from "react";
import "../styles/CreateBlog.css";

const CreateBlog: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const form = e.target as HTMLFormElement;
    const formData = new FormData();

    formData.append("title", (form.querySelector('[name="title"]') as HTMLInputElement).value);
    formData.append("excerpt", (form.querySelector('[name="excerpt"]') as HTMLTextAreaElement).value);
    formData.append("content", (form.querySelector('[name="content"]') as HTMLTextAreaElement).value);
    formData.append("tags", (form.querySelector('[name="tags"]') as HTMLInputElement).value);
    formData.append("status", (form.querySelector('[name="status"]:checked') as HTMLInputElement).value);

    const imageInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    const file = imageInput.files?.[0];
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch("http://localhost:3000/create-blog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ this is important
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post submitted successfully");
        form.reset();
        setImagePreview(null);
      } else {
        console.error("Failed to submit blog post:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="create-blog-page">
      <h1 className="create-blog-title">Create a New Blog Post</h1>

      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="form-input"
              placeholder="Enter your blog title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">
              Excerpt (Short Description)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              className="form-textarea"
              placeholder="A brief summary of your post"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-input"
              placeholder="technology, web development, design"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content*
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              required
              className="form-textarea content-textarea"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Image Upload</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="form-group">
              <label className="form-label">Image Preview</label>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginTop: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  padding: "4px",
                }}
              />
            </div>
          )}

          <div className="publish-options">
            <div className="radio-option">
              <input
                id="draft"
                name="status"
                type="radio"
                value="draft"
                defaultChecked
                className="radio-input"
              />
              <label htmlFor="draft" className="radio-label">
                Save as Draft
              </label>
            </div>
            <div className="radio-option">
              <input
                id="published"
                name="status"
                type="radio"
                value="published"
                className="radio-input"
              />
              <label htmlFor="published" className="radio-label">
                Publish Now
              </label>
            </div>
            <button type="submit" className="submit-button">
              Save Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
