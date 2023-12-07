import React from 'react';
import { Handle } from 'reactflow';

const CNHandle = ({ type, position, id, isConnectable }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{position: 'absolute',
          backgroundColor:'white',
          width:'10%',
          height:'10%'  
          }}
    isConnectable={isConnectable}
  />
);

export default CNHandle;
