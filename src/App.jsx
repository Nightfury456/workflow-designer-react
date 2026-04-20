import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

function App() {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Start Node", type: "Start" },
    },
    {
      id: "2",
      position: { x: 400, y: 200 },
      data: { label: "Task Node", type: "Task" },
    },
  ]);

  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [logs, setLogs] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  const addNode = (type) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: type + " Node",
        type: type,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  // 🔥 Delete Node (also removes connected edges)
  const deleteNode = () => {
    if (!selectedNode) return;

    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));

    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id,
      ),
    );

    setSelectedNode(null);
  };

  // 🔥 Delete Edge (disconnect)
  const deleteEdge = () => {
    if (!selectedEdge) return;

    setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
    setSelectedEdge(null);
  };

  const updateField = (field, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node,
      ),
    );

    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));
  };

  const runWorkflow = () => {
    if (nodes.length === 0) return;

    const result = nodes.map((n, index) => {
      return `Step ${index + 1}: ${n.data.type} - ${n.data.label}`;
    });

    setLogs(result);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", padding: "10px", background: "#eee" }}>
        <h4>Add Nodes</h4>

        <button onClick={() => addNode("Start")}>Start</button>
        <br />
        <br />
        <button onClick={() => addNode("Task")}>Task</button>
        <br />
        <br />
        <button onClick={() => addNode("Approval")}>Approval</button>
        <br />
        <br />
        <button onClick={() => addNode("Automated")}>Automated</button>
        <br />
        <br />
        <button onClick={() => addNode("End")}>End</button>

        <hr />
        <button onClick={runWorkflow}>Run Workflow</button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          panOnDrag={false}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Right Panel */}
      <div style={{ width: "300px", padding: "10px", background: "#ddd" }}>
        <h4>Settings</h4>

        {/* NODE SETTINGS */}
        {selectedNode && (
          <>
            <p>
              <b>Type:</b> {selectedNode.data.type}
            </p>

            <label>Label:</label>
            <input
              value={selectedNode.data.label || ""}
              onChange={(e) => updateField("label", e.target.value)}
            />
            <br />
            <br />

            {selectedNode.data.type === "Task" && (
              <>
                <label>Description:</label>
                <input
                  value={selectedNode.data.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                />
                <br />
                <br />

                <label>Assignee:</label>
                <input
                  value={selectedNode.data.assignee || ""}
                  onChange={(e) => updateField("assignee", e.target.value)}
                />
                <br />
                <br />
              </>
            )}

            {selectedNode.data.type === "Approval" && (
              <>
                <label>Role:</label>
                <input
                  value={selectedNode.data.role || ""}
                  onChange={(e) => updateField("role", e.target.value)}
                />
                <br />
                <br />

                <label>Threshold:</label>
                <input
                  type="number"
                  value={selectedNode.data.threshold || ""}
                  onChange={(e) => updateField("threshold", e.target.value)}
                />
                <br />
                <br />
              </>
            )}

            <button onClick={deleteNode} style={{ color: "red" }}>
              Delete Node
            </button>
          </>
        )}

        {/* EDGE SETTINGS */}
        {selectedEdge && (
          <>
            <p>
              <b>Connection Selected</b>
            </p>

            <button onClick={deleteEdge} style={{ color: "red" }}>
              Delete Connection
            </button>
          </>
        )}

        {!selectedNode && !selectedEdge && <p>Select a node or connection</p>}

        <hr />

        {/* Logs */}
        <h4>Execution Log</h4>
        {logs.length > 0 ? (
          logs.map((log, i) => <p key={i}>{log}</p>)
        ) : (
          <p>No execution yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
