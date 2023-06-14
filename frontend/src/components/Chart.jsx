import { AreaChart,Label, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';
import CustomToolTip from './customToolTip.jsx'
const data = [
  { shortform:"IOT", name: "Intenet Of things", Total: 35 },
  { shortform:"CPS", name: "Cyer Physucal System", Total: 28 },
  { shortform:"DIP", name: "Image Processing", Total: 20 },
  { shortform:"SNA", name: "Social Networks", Total: 40 },
  { shortform:"BA", name: "Bussiness Analytics", Total: 30 },
  { shortform:"DN", name: "Data Mining", Total: 15 },
  { shortform:"DS", name: "Data Structures", Total: 45 },
  { shortform:"CR", name: "Cryptography", Total: 70 },
  { shortform:"IVA", name: "Image and Video analysis", Total: 28 },
  { shortform:"SCM", name: "Supply Chain Management", Total: 50 },
  { shortform:"PM", name: "Project Management", Total: 62 },
  { shortform:"CS", name: "Computer Security", Total: 33 },
  { shortform:"PGY", name: "Photography", Total: 42 },
  { shortform:"PSC", name: "Phsychology", Total: 18 },
  { shortform:"DN", name: "Data Mining", Total: 11 },
  { shortform:"DN", name: "Data Mining", Total: 15 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="w-[100%] shadow-md p-[10px] text-gray-600">
      <div className="mb-[20px]">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
    <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#F8C365" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#F8C365" stopOpacity={0}/>
    </linearGradient>

  </defs>
  <XAxis dataKey="shortform">
    <Label
        value="Courses"
        position="bottom"
    />
  </XAxis>
  <YAxis >
  </YAxis>
  <CartesianGrid strokeDasharray="3 3"  className="ring-[#e4e1e1]"/>
  <Tooltip content={<CustomToolTip payload={data} />}/>
  <Area 
  type="monotone" 
  dataKey="Total" 
  stroke="#F8C365" 
  fillOpacity={1} 
  fill="url(#total)" />

</AreaChart>
  </ResponsiveContainer></div>
  )
}

export default Chart