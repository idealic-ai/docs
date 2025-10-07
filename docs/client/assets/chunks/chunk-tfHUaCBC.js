const n=new Proxy({},{get:(t,e)=>r=>e==="code"?`\`${r}\``:e==="string"?`'${r}'`:r});export{n as p};
