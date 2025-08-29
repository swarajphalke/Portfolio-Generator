import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { createPortfolio } from "../api.js";

const toArray = (v) =>
  Array.isArray(v)
    ? v
    : v
    ? String(v)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

export default function PortfolioForm() {
  const { template } = useParams();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      template,
      hero: {
        name: "",
        title: "",
        tagline: "",
        profileImage: "",
        bgImage: "",
      },
      about: {
        bio: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        totalProjects: "",
        socials: { github: "", linkedin: "", website: "", twitter: "" },
      },
      skills: [],
      services: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
      projects: [
        { title: "", image: "", description: "", url: "" },
        { title: "", image: "", description: "", url: "" },
        { title: "", image: "", description: "", url: "" },
      ],
      testimonials: [{ quote: "", client: "" }],
      blog: [{ title: "", summary: "", url: "" }],
      contact: { message: "", email: "", phone: "" },
    },
  });

  const { fields: serviceFields } = useFieldArray({
    control,
    name: "services",
  });
  const { fields: projectFields } = useFieldArray({
    control,
    name: "projects",
  });
  const { fields: testimonialFields } = useFieldArray({
    control,
    name: "testimonials",
  });
  const { fields: blogFields } = useFieldArray({ control, name: "blog" });

  const [profileImageBase64, setProfileImageBase64] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [projectPreviews, setProjectPreviews] = useState({});

  const handleProfileImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageBase64(reader.result);
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageSelect = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectPreviews((prev) => ({ ...prev, [index]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    data.skills = toArray(data.skills);
    if (!data.skills.length) {
      alert("Please enter at least one skill.");
      return;
    }
    if (!data.projects.some((p) => p.title && p.description)) {
      alert("Please enter at least one project with title and description.");
      return;
    }
    if (profileImageBase64) {
      data.hero.profileImage = profileImageBase64;
    }
    data.projects = data.projects.map((p, i) => ({
      ...p,
      image: projectPreviews[i] || p.image,
    }));
    await createPortfolio(data);
    nav(`/professionals`);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Create Portfolio ({template})</h2>
      </div>

      <div className="card">
        <h3>Personal Info</h3>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          }}
        >
          <div>
            <label className="label">Name</label>
            <input
              className="input"
              {...register("hero.name", { required: "Name is required" })}
            />
            {errors.hero?.name && (
              <p className="error">{errors.hero.name.message}</p>
            )}
          </div>
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              {...register("hero.title", { required: "Title is required" })}
            />
            {errors.hero?.title && (
              <p className="error">{errors.hero.title.message}</p>
            )}
          </div>
          <div>
            <label className="label">Tagline</label>
            <input
              className="input"
              {...register("hero.tagline", {
                required: "Tagline is required",
              })}
            />
            {errors.hero?.tagline && (
              <p className="error">{errors.hero.tagline.message}</p>
            )}
          </div>

          <div>
            <label className="label">Profile Image URL</label>
            <input className="input" placeholder="Paste URL or choose file" />
          </div>
          <div>
            <label className="label">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="input"
              {...register("hero.profileImage", {
                required: "Profile image is required",
              })}
              onChange={(e) => {
                handleProfileImageSelect(e);
              }}
            />
            {errors.hero?.profileImage && (
              <p className="error" style={{ color: "red" }}>
                {errors.hero.profileImage.message}
              </p>
            )}
          </div>

          {(profileImagePreview || watch("hero.profileImage")) && (
            <div style={{ marginTop: "0.5rem" }}>
              <img
                src={profileImagePreview || watch("hero.profileImage")}
                alt="preview"
                style={{ width: 100, borderRadius: "50%" }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>About</h3>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Summary</label>
            <textarea
              className="textarea"
              rows="3"
              {...register("about.bio", { required: "Summary is required" })}
            />
            {errors.about?.bio && (
              <p className="error">{errors.about.bio.message}</p>
            )}
          </div>

          <div>
            <label className="label">Years of Experience</label>
            <input
              className="input"
              type="number"
              {...register("about.experience", {
                required: "Experience is required",
              })}
            />
            {errors.about?.experience && (
              <p className="error">{errors.about.experience.message}</p>
            )}
          </div>

          <div>
            <label className="label">Total Projects</label>
            <input
              className="input"
              type="number"
              {...register("about.totalProjects", {
                required: "Total projects is required",
              })}
            />
            {errors.about?.totalProjects && (
              <p className="error">{errors.about.totalProjects.message}</p>
            )}
          </div>

          {template === "classic" && (
            <>
              <div>
                <label className="label">Email</label>
                <input
                  className="input"
                  {...register("about.email", {
                    required: "Email is required",
                  })}
                />
                {errors.about?.email && (
                  <p className="error">{errors.about.email.message}</p>
                )}
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  className="input"
                  {...register("about.phone", {
                    required: "Phone is required",
                  })}
                />
                {errors.about?.phone && (
                  <p className="error">{errors.about.phone.message}</p>
                )}
              </div>
              <div>
                <label className="label">Location</label>
                <input
                  className="input"
                  {...register("about.location", {
                    required: "Location is required",
                  })}
                />
                {errors.about?.location && (
                  <p className="error">{errors.about.location.message}</p>
                )}
              </div>
            </>
          )}
          <div>
            <label className="label">LinkedIn</label>
            <input
              className="input"
              {...register("about.socials.linkedin", {
                required: "LinkedIn is required",
              })}
            />
            {errors.about?.socials?.linkedin && (
              <p className="error">{errors.about.socials.linkedin.message}</p>
            )}
          </div>
          <div>
            <label className="label">GitHub</label>
            <input className="input" {...register("about.socials.github")} />
          </div>

          <div>
            <label className="label">Website</label>
            <input className="input" {...register("about.socials.website")} />
          </div>

          <div>
            <label className="label">Twitter</label>
            <input className="input" {...register("about.socials.twitter")} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Skills</h3>
        {template === "classic" ? (
          <>
            <input
              className="input"
              placeholder="JavaScript, React, Node.js..."
              {...register("skills", { required: "Skills are required" })}
            />
            {errors.skills && <p className="error">{errors.skills.message}</p>}
          </>
        ) : (
          <>
            <textarea
              className="textarea"
              rows="3"
              placeholder="JavaScript, React, Node.js..."
              {...register("skills", { required: "Skills are required" })}
            />
            {errors.skills && <p className="error">{errors.skills.message}</p>}
          </>
        )}
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Projects</h3>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          }}
        >
          {projectFields.map((f, i) => (
            <div key={f.id} className="card">
              <label className="label">Title</label>
              <input className="input" {...register(`projects.${i}.title`)} />
              <label className="label">Image URL</label>
              <input
                className="input"
                {...register(`projects.${i}.image`)}
                placeholder="Paste URL or choose file"
              />
              <label className="label">Or Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) => handleProjectImageSelect(e, i)}
              />
              {(projectPreviews[i] || watch(`projects.${i}.image`)) && (
                <div style={{ marginTop: "0.5rem" }}>
                  <img
                    src={projectPreviews[i] || watch(`projects.${i}.image`)}
                    alt="project preview"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </div>
              )}
              <label className="label">Description</label>
              <input
                className="input"
                {...register(`projects.${i}.description`)}
              />
              <label className="label">Project URL</label>
              <input className="input" {...register(`projects.${i}.url`)} />
            </div>
          ))}
        </div>
      </div>

      {template === "classic" && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3>Services</h3>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
            }}
          >
            {serviceFields.map((f, i) => (
              <div key={f.id} className="card">
                <label className="label">Title</label>
                <input
                  className="input"
                  {...register(`services.${i}.title`, {
                    required: "Service title is required",
                  })}
                />
                <label className="label">Description</label>
                <textarea
                  className="textarea"
                  rows="2"
                  {...register(`services.${i}.description`, {
                    required: "Service description is required",
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {template === "classic" && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3>Testimonials</h3>
          {testimonialFields.map((f, i) => (
            <div key={f.id} className="card">
              <label className="label">Quote</label>
              <textarea
                className="textarea"
                rows="2"
                {...register(`testimonials.${i}.quote`, {
                  required: "Testimonial quote is required",
                })}
              />
              <label className="label">Client</label>
              <input
                className="input"
                {...register(`testimonials.${i}.client`, {
                  required: "Client name is required",
                })}
              />
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Contact</h3>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Message</label>
            <input className="input" {...register("contact.message")} />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              {...register("contact.email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.contact?.email && (
              <p className="error">{errors.contact.email.message}</p>
            )}
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" {...register("contact.phone")} />
          </div>
        </div>
      </div>

      <div className="toolbar" style={{ marginTop: "1rem" }}>
        <button className="btn" onClick={handleSubmit(onSubmit)}>
          Save & Generate
        </button>
        <button className="btn secondary" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
}
