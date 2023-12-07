import { Position, MarkerType } from "reactflow";
// reactflow 학습자료에 있던 코드에서 

export function getEdgeParams(source, target) {
    const sourcePos = { x: source.position.x + source.width / 2, y: source.position.y + source.height / 2};
    const targetPos = { x: target.position.x + target.width / 2, y: target.position.y + target.height / 2};
  
    return {
      sx: sourcePos.x,
      sy: sourcePos.y,
      tx: targetPos.x,
      ty: targetPos.y,
      sourcePos: Position.Center,
      targetPos: Position.Center,
    };
  }
  
  export function createNodesAndEdges() {
    const nodes = [];
    const edges = [];
    const center = { x: window.innerWidth / 4, y: window.innerHeight / 4 };
  
    nodes.push({ id: 'target', data: { label: 'Target' }, position: center });
  
    for (let i = 0; i < 8; i++) {
      const degrees = i * (360 / 8);
      const radians = degrees * (Math.PI / 180);
      const x = 250 * Math.cos(radians) + center.x;
      const y = 250 * Math.sin(radians) + center.y;
  
      nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } });
  
      edges.push({
        id: `edge-${i}`,
        target: 'target',
        source: `${i}`,
        type: 'floating',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width:20,
          height: 20,
        },
        
      });
    }
  
    return { nodes, edges };
  }
  