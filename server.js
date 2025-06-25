import fs from "node:fs/promises";
import express from "express";

async function loadApplications() {
  try {
    const applicationsData = await fs.readFile(
      "./data/applications.json",
      "utf-8"
    );
    return JSON.parse(applicationsData);
  } catch (error) {
    console.log("Error reading applications file", error);
    return [];
  }
}

async function saveApplication(application) {
  const applications = await loadApplications();
  application.id = new Date().getTime(); // Unique ID
  applications.push(application);

  await fs.writeFile(
    "./data/applications.json",
    JSON.stringify(applications, null, 2),
    "utf-8"
  );
  return application;
}

async function updateApplication(id, updatedData) {
  const applications = await loadApplications();

  const index = applications.findIndex((app) => app.id === id);
  if (index === -1) {
    throw new Error("Application not found");
  }

  applications[index] = {
    ...applications[index],
    ...updatedData,
  };

  await fs.writeFile(
    "./data/applications.json",
    JSON.stringify(applications, null, 2),
    "utf-8"
  );

  return applications[index];
}

async function deleteApplication(id) {
  let applications = await loadApplications();
  const index = applications.findIndex((app) => app.id === id);
  if (index === -1) return false;

  applications.splice(index, 1);

  await fs.writeFile(
    "./data/applications.json",
    JSON.stringify(applications, null, 2),
    "utf-8"
  );
  return true;
}

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight
  }
  next();
});

app.get("/applications", async (req, res) => {
  try {
    const applications = await loadApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error loading Applications" });
  }
});

app.post("/applications", async (req, res) => {
  const { companyName, title, jobLocation, jobStatus, comments, jobUrl } =
    req.body;

  if (!companyName || !title || !jobLocation || !jobStatus) {
    return res.status(400).json({
      error: "Company Name, title, Job Location and Job Status are required",
    });
  }

  try {
    const newApplication = await saveApplication({
      companyName,
      title,
      jobLocation,
      jobStatus,
      jobUrl,
      comments,
    });
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: "Error saving application" });
  }
});

app.put("/applications/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { companyName, title, jobLocation, jobStatus, comments, jobUrl } =
    req.body;

  if (!companyName || !title || !jobLocation || !jobStatus || !comments) {
    return res.status(400).json({
      error:
        "Company Name, title, Job Location, Job Status and comments are required",
    });
  }

  try {
    const updatedApplication = await updateApplication(id, {
      companyName,
      title,
      jobLocation,
      jobStatus,
      comments,
      jobUrl,
    });
    res.json(updatedApplication);
  } catch (error) {
    if (error.message === "Application not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error updating application" });
    }
  }
});

app.delete("/applications/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!id) return res.status(400).json({ error: "Invalid ID" });

  try {
    const success = await deleteApplication(id);

    if (!success) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting application" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
