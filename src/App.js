import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  NodeToolbar,
  NodeResizer,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from 'reactflow';
import { nanoid } from 'nanoid'; // 고유한 id를 부여하기 위해 주로 사용

import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';// custom node를 불러옴
import CustomEdge from './components/CustomEdge';

const initialNodes = []; // 초기엔 빈값
const initialEdges = [];

const nodeTypes = {
  customnode: CustomNode
}; // reactflow 에 nodetyped으로 주기 위해 객체, prop

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); //node 드래그 반영.
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // 선 연결인지 움직임인지 기억x
  const [nameValue, setNameValue] = useState(''); //버튼 눌렀을 때 동작하게 하기 위해.
  const [linkValue, setLinkValue] = useState('');
  const [colorValue, setColorValue] = useState('#ffc0cb'); 


  // 선연결 이벤트 .. connection 두 노드사이의 새로운 선이 생길때.
  const onConnect = useCallback( (connection) => {
    // 새로 생긴 선을 edge로 만들어줌.
    const edge = { ...connection, type: 'customedge' ,style:{strokeWidth:'5px'}};
  // connection 의 source, target 과 일치하는 노드를 찾아 edgecount를 늘려줌.
  setNodes((ns)=> ns.map((node)=>{
    if (node.id === connection.source || node.id === connection.target){
      return {...node, data:{...node.data, edgeCount: node.data.edgeCount + 1}};
    }
    return node;
  }));
    // 기존에 있는 edgs에 connect로 인해 생긴 edge 추가.
    setEdges((eds) => addEdge(edge, eds));
  },[setEdges, setNodes]); 


// 선연결하기전에 보이는 선의 스타일 mark나 animation을 추가할려면 아마도 컴포넌트로 작성 
const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'pink',
  animated: true,
}
//edge.
const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};
 // 이벤트 발생시 동작할 것.
  const handleNameChange = (event) => {
    setNameValue(event.target.value);};

  const handleLinkChange = (event) => {
    setLinkValue(event.target.value);};

  const handleColorChange = (event) => {
    setColorValue(event.target.value);};

// 노드 만들어 지는 과정 1. 아이디어 부여, 2. 랜덤한 위치 지정, 3. input에서 받은 링크와 이름, 색깔 저장.
  const HandleButtonClick = () => {
    const newNode = {
      id: nanoid(),// 값 중복 피하기
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: nameValue, link: linkValue, color: colorValue, edgeCount:0 }, // 노드에 color, link 커스텀 노드
      type: 'customnode'
      
    };
    // 작동후 원래대로 돌리는 과정.
    setNodes((ns) => [...ns, newNode]);
    setNameValue('');
    setLinkValue('');
  };


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}//선택,드래그,삭제 
        onEdgesChange={onEdgesChange}//선택,드래그,삭제
        //g
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={{customedge:CustomEdge}}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        
        

      >
        <Controls />
        <NodeToolbar />
        <NodeResizer />
        <MiniMap />
        <Panel
          position='top-left'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              border: '3px solid black',
              padding: '10px',
              backgroundColor: 'pink',
            }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <input onChange={handleNameChange} type='text' value={nameValue}
                     placeholder='이름' style={{border: '2px solid black'}}/>

              <input onChange={handleLinkChange} value={linkValue} type='text' 
                     placeholder='링크를 입력하세요'style={{border: '2px solid black'}}/>

              <input onChange={handleColorChange} value={colorValue} type='color' 
                     style={{width:'30px', height:'20px',padding:'-1',}} />
            </div>
            <button
              onClick={HandleButtonClick}
              style={{ alignSelf: 'center', borderRadius: '20%' }}
            >
              create
            </button>
          </div>
        </Panel>
        {/*배경 을 바꾸고 싶으면 여기를 건든다.*/}
        <Background variant='cross' color='pink' gap={44} size={7} />
      </ReactFlow>
    </div>
  );
}
