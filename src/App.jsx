import { useEffect, useState } from "react";
import API from "./services/api";

function App() {

  const [materials, setMaterials] = useState([]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  // FETCH MATERIALS
  const fetchMaterials = async () => {
    try {
      const response = await API.get("/");
      setMaterials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD MATERIAL
  const addMaterial = async () => {
    try {

      await API.post("/", {
        name,
        quantity,
        status,
      });

      fetchMaterials();

      setName("");
      setQuantity("");
      setStatus("");

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE MATERIAL
  const deleteMaterial = async (id) => {
    try {

      await API.delete(`/${id}`);

      fetchMaterials();

    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE MATERIAL
  const updateMaterial = async (id) => {
    try {

      await API.put(`/${id}`, {
        name,
        quantity,
        status,
      });

      fetchMaterials();

      setEditingId(null);

      setName("");
      setQuantity("");
      setStatus("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial",
      }}
    >

      {/* TITLE */}
      <h1
        style={{
  textAlign: "center",
  fontSize: "48px",
  marginBottom: "40px",
  fontWeight: "bold",
  background: "linear-gradient(to right, #38bdf8, #8b5cf6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  lineHeight: "1.2",
  wordBreak: "break-word",
  padding: "0 20px",
}}
      >
        BuildTrack Material Manager
      </h1>

      {/* FORM */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >

        <input
          type="text"
          placeholder="Material Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "14px",
            width: "220px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            padding: "14px",
            width: "180px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "14px",
            width: "180px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          onClick={() => {
            if (editingId) {
              updateMaterial(editingId);
            } else {
              addMaterial();
            }
          }}
          style={{
            padding: "14px 25px",
            borderRadius: "12px",
            border: "none",
            background:
              "linear-gradient(to right, #06b6d4, #8b5cf6)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
            transition: "0.3s",
          }}
        >
          {editingId ? "Update Material" : "Add Material"}
        </button>

      </div>

      {/* MATERIAL CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >

        {materials.map((material) => (

          <div
            key={material.id || material.name}
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
          >

            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px",
                color: "#38bdf8",
              }}
            >
              {material.name}
            </h2>

            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              <strong>Quantity:</strong> {material.quantity}
            </p>

            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              <strong>Status:</strong> {material.status}
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >

              {/* DELETE */}
              <button
                onClick={() => deleteMaterial(material.id)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(to right, #ef4444, #dc2626)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(239,68,68,0.4)",
                }}
              >
                Delete
              </button>

              {/* EDIT */}
              <button
                onClick={() => {
                  setEditingId(material.id);
                  setName(material.name);
                  setQuantity(material.quantity);
                  setStatus(material.status);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(to right, #3b82f6, #2563eb)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(59,130,246,0.4)",
                }}
              >
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;