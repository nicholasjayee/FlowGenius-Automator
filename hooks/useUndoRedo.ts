import { useState, useCallback } from 'react';
import { Node, Edge } from 'reactflow';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export const useUndoRedo = (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void
) => {
  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  // Call this BEFORE making a change to state
  const takeSnapshot = useCallback(() => {
    setPast((prev) => [...prev, { nodes, edges }]);
    setFuture([]);
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture((prev) => [...prev, { nodes, edges }]); // Push current state to future

    setNodes(previousState.nodes);
    setEdges(previousState.edges);
  }, [nodes, edges, past, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const nextState = future[future.length - 1];
    const newFuture = future.slice(0, future.length - 1);

    setFuture(newFuture);
    setPast((prev) => [...prev, { nodes, edges }]); // Push current state to past

    setNodes(nextState.nodes);
    setEdges(nextState.edges);
  }, [nodes, edges, future, setNodes, setEdges]);

  return {
    undo,
    redo,
    takeSnapshot,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
};