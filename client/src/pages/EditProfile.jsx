import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { getPortfolio, updatePortfolio } from "../api.js";

const toArray = (v) =>
  Array.isArray(v)
    ? v
    : v
    ? String(v)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

export default function EditProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const { register, handleSubmit, control, reset, watch } = useForm();

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

  const [profileImageBase64, setProfileImageBase64] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [projectPreviews, setProjectPreviews] = useState({});

  useEffect(() => {
    getPortfolio(id).then((data) => {
      reset({
        ...data,
        skills: (data.skills || []).join(", "),
      });
    });
  }, [id, reset]);

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
    if (profileImageBase64) {
      data.hero.profileImage = profileImageBase64;
    }
    data.projects = data.projects.map((p, i) => ({
      ...p,
      image: projectPreviews[i] || p.image,
    }));
    await updatePortfolio(id, data);
    nav(`/portfolio/${id}`);
  };

  const template = watch("template");

  if (!watch("hero")) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h2>Edit Portfolio ({template})</h2>
      </div>

      <div className="card">
        <h3>Hero</h3>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}
        >
          <div>
            <label className="label">Name</label>
            <input className="input" {...register("hero.name")} />
          </div>
          <div>
            <label className="label">Title</label>
            <input className="input" {...register("hero.title")} />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" {...register("hero.tagline")} />
          </div>

          <div>
            <label className="label">Profile Image URL</label>
            <input
              className="input"
              {...register("hero.profileImage")}
              placeholder="Paste URL or choose file"
            />
          </div>
          <div>
            <label className="label">Or Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={handleProfileImageSelect}
            />
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
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Bio</label>
            <textarea
              className="textarea"
              rows="3"
              {...register("about.bio")}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" {...register("about.email")} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" {...register("about.phone")} />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" {...register("about.location")} />
          </div>
          <div>
            <label className="label">GitHub</label>
            <input className="input" {...register("about.socials.github")} />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input className="input" {...register("about.socials.linkedin")} />
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
        <label className="label">Comma-separated skills</label>
        <input
          className="input"
          placeholder="React, Node, AWS"
          {...register("skills")}
        />
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
                <input className="input" {...register(`services.${i}.title`)} />
                <label className="label">Description</label>
                <input
                  className="input"
                  {...register(`services.${i}.description`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Projects</h3>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}
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
          <h3>Testimonials</h3>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
            }}
          >
            {testimonialFields.map((f, i) => (
              <div key={f.id} className="card">
                <label className="label">Quote</label>
                <input
                  className="input"
                  {...register(`testimonials.${i}.quote`)}
                />
                <label className="label">Client</label>
                <input
                  className="input"
                  {...register(`testimonials.${i}.client`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Contact</h3>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Message</label>
            <input className="input" {...register("contact.message")} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" {...register("contact.email")} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" {...register("contact.phone")} />
          </div>
        </div>
      </div>

      <div className="toolbar" style={{ marginTop: "1rem" }}>
        <button className="btn" onClick={handleSubmit(onSubmit)}>
          Save Changes
        </button>
        <button className="btn secondary" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
}
