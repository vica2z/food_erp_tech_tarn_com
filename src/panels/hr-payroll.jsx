import React, {useMemo, useState} from "react";
import "./hr-payroll.css";
import HowWorks from "../how-works.jsx";

const BRAND={name:"TechTarn",website:"www.techtarn.com",phone:"+90 - 7453966757",email:"contact@techtarn.com"};
const demoUsers=[
  {email:"hr@techtarn.com",password:"Demo@123",role:"HR & Payroll Manager"},
  {email:"admin@techtarn.com",password:"Demo@123",role:"Super Administrator"}
];

const seed={
 employees:[
  {id:"EMP-1001",name:"Aarav Sharma",dept:"Production",role:"Production Supervisor",join:"2024-03-18",type:"Full Time",status:"Active"},
  {id:"EMP-1002",name:"Meera Kapoor",dept:"Quality",role:"QA Executive",join:"2024-07-01",type:"Full Time",status:"Active"},
  {id:"EMP-1003",name:"Rohan Verma",dept:"Warehouse",role:"Warehouse Associate",join:"2025-01-13",type:"Full Time",status:"Active"},
  {id:"EMP-1004",name:"Ananya Singh",dept:"Finance",role:"Accounts Executive",join:"2025-05-06",type:"Contract",status:"On Leave"}
 ],
 attendance:[
  {id:"ATT-2001",employee:"Aarav Sharma",date:"2026-09-25",shift:"A",in:"08:55",out:"17:30",status:"Present"},
  {id:"ATT-2002",employee:"Meera Kapoor",date:"2026-09-25",shift:"A",in:"09:05",out:"17:25",status:"Present"},
  {id:"ATT-2003",employee:"Rohan Verma",date:"2026-09-25",shift:"B",in:"13:50",out:"22:10",status:"Present"},
  {id:"ATT-2004",employee:"Ananya Singh",date:"2026-09-25",shift:"A",in:"",out:"",status:"Leave"}
 ],
 leaves:[
  {id:"LEV-3001",employee:"Ananya Singh",type:"Casual",from:"2026-09-25",to:"2026-09-26",days:2,status:"Approved",reason:"Personal work"},
  {id:"LEV-3002",employee:"Rohan Verma",type:"Sick",from:"2026-10-02",to:"2026-10-02",days:1,status:"Pending",reason:"Medical appointment"},
  {id:"LEV-3003",employee:"Meera Kapoor",type:"Earned",from:"2026-10-12",to:"2026-10-14",days:3,status:"Rejected",reason:"Peak production period"}
 ],
 payroll:[
  {id:"PAY-4001",employee:"Aarav Sharma",period:"Sep-2026",basic:42000,allowance:6500,deduction:3200,net:45300,status:"Processed"},
  {id:"PAY-4002",employee:"Meera Kapoor",period:"Sep-2026",basic:38000,allowance:5200,deduction:2800,net:40400,status:"Processed"},
  {id:"PAY-4003",employee:"Rohan Verma",period:"Sep-2026",basic:30000,allowance:4500,deduction:1900,net:32600,status:"Pending"},
  {id:"PAY-4004",employee:"Ananya Singh",period:"Sep-2026",basic:36000,allowance:5000,deduction:2400,net:38600,status:"Pending"}
 ],
 compliance:[
  {id:"CMP-5001",item:"PF / EPF Filing",period:"Aug-2026",due:"2026-09-15",owner:"HR",status:"Filed"},
  {id:"CMP-5002",item:"ESI Filing",period:"Aug-2026",due:"2026-09-15",owner:"Payroll",status:"Filed"},
  {id:"CMP-5003",item:"Professional Tax",period:"Sep-2026",due:"2026-09-30",owner:"Payroll",status:"Due"},
  {id:"CMP-5004",item:"Labour Welfare Return",period:"Q3-2026",due:"2026-10-07",owner:"HR",status:"Upcoming"}
 ]
};

const modules=[
 ["dashboard","Dashboard"],["employees","Employees"],["attendance","Attendance"],["leave","Leave"],["payroll","Payroll"],["compliance","Compliance"],["reports","Reports"],["settings","Settings"]
];

function clone(x){return JSON.parse(JSON.stringify(x))}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
function Badge({children}){return <span className={"badge "+String(children).toLowerCase().replaceAll(" ","-")}>{children}</span>}

function Login({onLogin}){
 const [email,setEmail]=useState("hr@techtarn.com"),[password,setPassword]=useState("Demo@123"),[error,setError]=useState("");
 function submit(e){e.preventDefault();const u=demoUsers.find(x=>x.email===email&&x.password===password);if(u) onLogin(u);else setError("Invalid demo credentials.");}
 return <div className="login-page"><div className="login-card">
   <div className="brand-mark">T</div><div className="eyebrow">FOOD PROCESSING ERP</div><h1>{BRAND.name}</h1><p>HR & Payroll workspace</p>
   <form onSubmit={submit}><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required type="email"/></label>
   <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} required type="password"/></label>
   {error&&<div className="error">{error}</div>}<button className="primary full">Sign in</button></form>
   <div className="demo-box"><b>Demo:</b> hr@techtarn.com / Demo@123<br/>admin@techtarn.com / Demo@123</div>
 </div></div>
}

export default function App(){
 const [user,setUser]=useState({email:"admin@techtarn.com",role:"Super Administrator"});
 const [data,setData]=useState(clone(seed));
 const [page,setPage]=useState("dashboard");
 const [mobile,setMobile]=useState(true);
 const [toast,setToast]=useState("");
 const [tour,setTour]=useState(true); const [tourIndex,setTourIndex]=useState(0);
 if(!user) return <Login onLogin={setUser}/>;
 const notify=m=>{setToast(m);setTimeout(()=>setToast(""),1800)};
 const update=(key,rows)=>setData(d=>({...d,[key]:rows}));
 return <div className="app">
  <aside className={"sidebar "+(mobile?"open":"")}><div className="side-brand"><div className="brand-mark small">T</div><div><b>{BRAND.name}</b><small>HR & Payroll</small></div></div>
   <nav>{modules.map(([id,label])=><button key={id} className={page===id?"active":""} onClick={()=>{setPage(id);setMobile(false)}}><span>{icon(id)}</span>{label}</button>)}</nav>
   <div className="side-foot"><small>{user.role}</small><button onClick={()=>setUser(null)}>Sign out</button></div>
  </aside>
  {mobile&&<div className="overlay" onClick={()=>setMobile(false)}/>}
  <main className="main"><header><button className="hamb" onClick={()=>setMobile(!mobile)}>☰</button><div><b>HR & Payroll</b><span> / {modules.find(x=>x[0]===page)?.[1]}</span></div><div className="user-pill">{user.email}</div></header>
   <section className="content">{page==="dashboard"?<Dashboard data={data} go={setPage}/>:page==="employees"?<Employees rows={data.employees} setRows={r=>update("employees",r)} notify={notify}/>:page==="attendance"?<Attendance rows={data.attendance} setRows={r=>update("attendance",r)} employees={data.employees} notify={notify}/>:page==="leave"?<Leave rows={data.leaves} setRows={r=>update("leaves",r)} employees={data.employees} notify={notify}/>:page==="payroll"?<Payroll rows={data.payroll} setRows={r=>update("payroll",r)} employees={data.employees} notify={notify}/>:page==="compliance"?<Compliance rows={data.compliance} setRows={r=>update("compliance",r)} notify={notify}/>:page==="reports"?<Reports data={data} notify={notify}/>:<Settings notify={notify}/>}</section>
  <HowWorks panel="HR & Payroll" module={page}/></main>
  {toast&&<div className="toast">{toast}</div>}
  {tour&&<Tour index={tourIndex} setIndex={setTourIndex} close={()=>setTour(false)} go={setPage}/>}
 </div>
}

function Dashboard({data,go}){
 const active=data.employees.filter(x=>x.status==="Active").length,pendingLeave=data.leaves.filter(x=>x.status==="Pending").length,pendingPay=data.payroll.filter(x=>x.status==="Pending").length,due=data.compliance.filter(x=>["Due","Upcoming"].includes(x.status)).length;
 return <><div className="hero"><div><div className="eyebrow">PEOPLE OPERATIONS</div><h2>HR & Payroll Control Center</h2><p>Manage employees, attendance, leave, payroll and statutory compliance.</p></div><button className="primary" onClick={()=>go("employees")}>Manage Employees</button></div>
 <div className="stats">{[["Active Employees",active,"employees"],["Pending Leave",pendingLeave,"leave"],["Payroll Pending",pendingPay,"payroll"],["Compliance Attention",due,"compliance"]].map(([a,b,c])=><button className="stat" key={a} onClick={()=>go(c)}><span>{a}</span><strong>{b}</strong><small>Open module →</small></button>)}</div>
 <div className="grid2"><Panel title="Today's Attendance"><Metric label="Present" value={data.attendance.filter(x=>x.status==="Present").length}/><Metric label="Leave" value={data.attendance.filter(x=>x.status==="Leave").length}/><Metric label="Absent" value={data.attendance.filter(x=>x.status==="Absent").length}/></Panel>
 <Panel title="Payroll Snapshot"><Metric label="Processed" value={data.payroll.filter(x=>x.status==="Processed").length}/><Metric label="Pending" value={data.payroll.filter(x=>x.status==="Pending").length}/><Metric label="Net Pay" value={money(data.payroll.reduce((s,x)=>s+x.net,0))}/></Panel></div></>
}
function Panel({title,children}){return <div className="panel"><div className="panel-title"><h3>{title}</h3></div><div className="panel-body">{children}</div></div>}
function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function icon(id){return ({dashboard:"⌂",employees:"◉",attendance:"◷",leave:"▣",payroll:"₹",compliance:"✓",reports:"▤",settings:"⚙"})[id]||"•"}

function Table({headers,rows,renderRow}){return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.length?rows.map(renderRow):<tr><td colSpan={headers.length} className="empty">No records found</td></tr>}</tbody></table></div>}

function CRUDPage({title,subtitle,rows,setRows,searchFields,headers,render,formFields,makeRow,notify,addLabel="Add Record"}){
 const [q,setQ]=useState(""),[show,setShow]=useState(false),[edit,setEdit]=useState(null);
 const filtered=rows.filter(r=>searchFields.some(f=>String(r[f]??"").toLowerCase().includes(q.toLowerCase())));
 const save=form=>{try{const row=makeRow(form,edit);if(edit)setRows(rows.map(x=>x.id===edit.id?row:x));else setRows([row,...rows]);setShow(false);setEdit(null);notify(edit?"Record updated":"Record added");}catch(e){alert(e.message||"Please check the entered data.");}};
 return <><div className="page-head"><div><div className="eyebrow">MASTER DATA</div><h2>{title}</h2><p>{subtitle}</p></div><button className="primary" onClick={()=>{setEdit(null);setShow(true)}}>+ {addLabel}</button></div>
 <div className="toolbar"><input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)}/><span>{filtered.length} records</span></div>
 <Panel title={`${title} List`}><Table headers={[...headers,"Actions"]} rows={filtered} renderRow={r=><tr key={r.id}>{render(r)}<td className="actions"><button onClick={()=>{setEdit(r);setShow(true)}}>Edit</button><button className="danger-text" onClick={()=>{if(confirm("Delete this record?")){setRows(rows.filter(x=>x.id!==r.id));notify("Record deleted")}}}>Delete</button></td></tr>}/></Panel>
 {show&&<Modal title={edit?"Edit "+title:"Add "+title} onClose={()=>{setShow(false);setEdit(null)}}><Form fields={formFields} initial={edit||{}} onSave={save} onCancel={()=>{setShow(false);setEdit(null)}}/></Modal>}
 </>}
function Form({fields,initial,onSave,onCancel}){
 const [v,setV]=useState(()=>{const o={};fields.forEach(f=>o[f.name]=initial[f.name]??f.default??"");return o}); const [err,setErr]=useState("");
 function submit(e){e.preventDefault();const missing=fields.find(f=>f.required&&!String(v[f.name]??"").trim());if(missing){setErr(`${missing.label} is required.`);return}onSave(v)}
 return <form onSubmit={submit} className="form">{fields.map(f=><label key={f.name}>{f.label}{f.required&&<em>*</em>}{f.type==="select"?<select value={v[f.name]} onChange={e=>setV({...v,[f.name]:e.target.value})}><option value="">Select...</option>{f.options.map(o=><option key={o}>{o}</option>)}</select>:<input type={f.type||"text"} value={v[f.name]} onChange={e=>setV({...v,[f.name]:e.target.value})} min={f.min} step={f.step}/>}</label>)}{err&&<div className="error">{err}</div>}<div className="modal-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary">Save</button></div></form>
}
function Modal({title,onClose,children}){return <div className="modal-bg" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><div className="modal-head"><h3>{title}</h3><button onClick={onClose}>×</button></div>{children}</div></div>}

function Employees({rows,setRows,notify}){
 const fields=[{name:"name",label:"Employee Name",required:true},{name:"dept",label:"Department",required:true},{name:"role",label:"Role",required:true},{name:"join",label:"Join Date",type:"date",required:true},{name:"type",label:"Employment Type",type:"select",options:["Full Time","Part Time","Contract","Intern"],required:true},{name:"status",label:"Status",type:"select",options:["Active","Inactive","On Leave"],required:true}];
 return <CRUDPage title="Employees" subtitle="Maintain employee master records and employment status." rows={rows} setRows={setRows} searchFields={["id","name","dept","role","status"]} headers={["ID","Employee","Department","Role","Join Date","Status"]} render={r=><><td>{r.id}</td><td><b>{r.name}</b></td><td>{r.dept}</td><td>{r.role}</td><td>{r.join}</td><td><Badge>{r.status}</Badge></td></>} formFields={fields} makeRow={(v,e)=>({...v,id:e?.id||"EMP-"+String(Date.now()).slice(-4)})} notify={notify} addLabel="Employee" />
}
function Attendance({rows,setRows,employees,notify}){
 const fields=[{name:"employee",label:"Employee",type:"select",options:employees.map(x=>x.name),required:true},{name:"date",label:"Date",type:"date",required:true},{name:"shift",label:"Shift",type:"select",options:["A","B","C","General"],required:true},{name:"in",label:"In Time",type:"time"},{name:"out",label:"Out Time",type:"time"},{name:"status",label:"Status",type:"select",options:["Present","Absent","Leave","Half Day"],required:true}];
 return <CRUDPage title="Attendance" subtitle="Capture daily attendance, shifts and working hours." rows={rows} setRows={setRows} searchFields={["id","employee","date","shift","status"]} headers={["ID","Employee","Date","Shift","In","Out","Status"]} render={r=><><td>{r.id}</td><td>{r.employee}</td><td>{r.date}</td><td>{r.shift}</td><td>{r.in||"—"}</td><td>{r.out||"—"}</td><td><Badge>{r.status}</Badge></td></>} formFields={fields} makeRow={(v,e)=>({...v,id:e?.id||"ATT-"+String(Date.now()).slice(-4)})} notify={notify} addLabel="Attendance" />
}
function Leave({rows,setRows,employees,notify}){
 const fields=[{name:"employee",label:"Employee",type:"select",options:employees.map(x=>x.name),required:true},{name:"type",label:"Leave Type",type:"select",options:["Casual","Sick","Earned","Unpaid","Maternity"],required:true},{name:"from",label:"From",type:"date",required:true},{name:"to",label:"To",type:"date",required:true},{name:"days",label:"Days",type:"number",min:"1",step:"1",required:true},{name:"status",label:"Status",type:"select",options:["Pending","Approved","Rejected"],required:true},{name:"reason",label:"Reason",required:true}];
 return <CRUDPage title="Leave" subtitle="Manage leave requests, approvals and balances." rows={rows} setRows={setRows} searchFields={["id","employee","type","status","reason"]} headers={["ID","Employee","Type","From","To","Days","Status"]} render={r=><><td>{r.id}</td><td>{r.employee}</td><td>{r.type}</td><td>{r.from}</td><td>{r.to}</td><td>{r.days}</td><td><Badge>{r.status}</Badge></td></>} formFields={fields} makeRow={(v,e)=>({...v,days:Number(v.days),id:e?.id||"LEV-"+String(Date.now()).slice(-4)})} notify={notify} addLabel="Leave Request" />
}
function Payroll({rows,setRows,employees,notify}){
 const fields=[{name:"employee",label:"Employee",type:"select",options:employees.map(x=>x.name),required:true},{name:"period",label:"Payroll Period",required:true},{name:"basic",label:"Basic Salary",type:"number",min:"0",step:"0.01",required:true},{name:"allowance",label:"Allowances",type:"number",min:"0",step:"0.01",required:true},{name:"deduction",label:"Deductions",type:"number",min:"0",step:"0.01",required:true},{name:"status",label:"Status",type:"select",options:["Pending","Processed","On Hold"],required:true}];
 return <CRUDPage title="Payroll" subtitle="Prepare payroll, calculate net pay and track processing status." rows={rows} setRows={setRows} searchFields={["id","employee","period","status"]} headers={["ID","Employee","Period","Basic","Allowance","Deduction","Net Pay","Status"]} render={r=><><td>{r.id}</td><td>{r.employee}</td><td>{r.period}</td><td>{money(r.basic)}</td><td>{money(r.allowance)}</td><td>{money(r.deduction)}</td><td><b>{money(r.net)}</b></td><td><Badge>{r.status}</Badge></td></>} formFields={fields} makeRow={(v,e)=>{const basic=Number(v.basic),allowance=Number(v.allowance),deduction=Number(v.deduction);if(deduction>basic+allowance) throw new Error("Deductions cannot exceed gross pay.");return {...v,basic,allowance,deduction,net:basic+allowance-deduction,id:e?.id||"PAY-"+String(Date.now()).slice(-4)}}} notify={notify} addLabel="Payroll Entry" />
}
function Compliance({rows,setRows,notify}){
 const fields=[{name:"item",label:"Compliance Item",required:true},{name:"period",label:"Period",required:true},{name:"due",label:"Due Date",type:"date",required:true},{name:"owner",label:"Owner",required:true},{name:"status",label:"Status",type:"select",options:["Filed","Due","Upcoming","Overdue"],required:true}];
 return <CRUDPage title="Compliance" subtitle="Track statutory filings, due dates and ownership." rows={rows} setRows={setRows} searchFields={["id","item","period","owner","status"]} headers={["ID","Item","Period","Due Date","Owner","Status"]} render={r=><><td>{r.id}</td><td>{r.item}</td><td>{r.period}</td><td>{r.due}</td><td>{r.owner}</td><td><Badge>{r.status}</Badge></td></>} formFields={fields} makeRow={(v,e)=>({...v,id:e?.id||"CMP-"+String(Date.now()).slice(-4)})} notify={notify} addLabel="Compliance Record" />
}
function Reports({data,notify}){return <><div className="page-head"><div><div className="eyebrow">ANALYTICS</div><h2>Reports</h2><p>Review HR, attendance, leave, payroll and compliance summaries.</p></div><button className="primary" onClick={()=>notify("Report export prepared")}>Export Report</button></div><div className="report-grid">{[["Employee Headcount",data.employees.length],["Attendance Records",data.attendance.length],["Leave Requests",data.leaves.length],["Payroll Records",data.payroll.length],["Compliance Records",data.compliance.length],["Payroll Net Total",money(data.payroll.reduce((s,x)=>s+x.net,0))]].map(x=><Panel key={x[0]} title={x[0]}><div className="big-number">{x[1]}</div></Panel>)}</div></>}
function Settings({notify}){const [saved,setSaved]=useState(true);return <><div className="page-head"><div><div className="eyebrow">CONFIGURATION</div><h2>Settings</h2><p>Configure organization and HR preferences.</p></div></div><Panel title="Organization Settings"><div className="form settings-form"><label>Company Name<input defaultValue={BRAND.name}/></label><label>Payroll Currency<select defaultValue="INR"><option>INR</option><option>USD</option><option>EUR</option></select></label><label>Default Shift<select defaultValue="A"><option>A</option><option>B</option><option>C</option><option>General</option></select></label><label>Attendance Grace Minutes<input defaultValue="10" type="number" min="0"/></label><button className="primary" onClick={()=>{setSaved(true);notify("Settings saved successfully")}}>Save Settings</button>{saved&&<div className="success">Settings saved.</div>}</div></Panel></>}
function Tour({index,setIndex,close,go}){const steps=[["dashboard","Dashboard","Review headcount, attendance, payroll and compliance attention."],["employees","Employees","Add, edit, search and manage employee master records."],["attendance","Attendance","Capture shifts, in/out time and attendance status."],["leave","Leave","Create leave requests and update approval status."],["payroll","Payroll","Enter salary components; net pay is calculated automatically."],["compliance","Compliance","Track filing owners, due dates and statutory status."],["reports","Reports","Review HR summaries and export reports."],["settings","Settings","Maintain organization and HR configuration."]];const s=steps[index];return <div className="tour"><div className="tour-kicker">GUIDE TOUR · {index+1}/{steps.length}</div><b>{s[1]}</b><p>{s[2]}</p><div className="tour-actions"><button disabled={index===0} onClick={()=>{setIndex(index-1);go(steps[index-1][0])}}>Back</button>{index<steps.length-1?<button className="primary" onClick={()=>{setIndex(index+1);go(steps[index+1][0])}}>Next</button>:<button className="primary" onClick={close}>Finish</button>}</div><button className="tour-close" onClick={close}>×</button></div>}
