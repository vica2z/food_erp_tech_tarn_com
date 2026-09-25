import React,{useState}from"react";
import{createRoot}from"react-dom/client";
import"./master.css";
import super_admin from "./panels/super-admin.jsx";
import management_ceo from "./panels/management-ceo.jsx";
import sales_crm from "./panels/sales-crm.jsx";
import purchase from "./panels/purchase.jsx";
import production from "./panels/production.jsx";
import inventory from "./panels/inventory.jsx";
import quality from "./panels/quality.jsx";
import warehouse from "./panels/warehouse.jsx";
import food_safety from "./panels/food-safety.jsx";
import maintenance from "./panels/maintenance.jsx";
import machine_operator from "./panels/machine-operator.jsx";
import finance_accounts from "./panels/finance-accounts.jsx";
import hr_payroll from "./panels/hr-payroll.jsx";
import logistics_distribution from "./panels/logistics-distribution.jsx";
import reports_analytics from "./panels/reports-analytics.jsx";

const PANELS=[
{id:"super-admin",name:"Super Admin",Component:super_admin},
{id:"management-ceo",name:"Management / CEO",Component:management_ceo},
{id:"sales-crm",name:"Sales & CRM",Component:sales_crm},
{id:"purchase",name:"Purchase",Component:purchase},
{id:"production",name:"Production",Component:production},
{id:"inventory",name:"Raw Material / Inventory",Component:inventory},
{id:"quality",name:"Quality / QA-QC",Component:quality},
{id:"warehouse",name:"Warehouse",Component:warehouse},
{id:"food-safety",name:"Food Safety",Component:food_safety},
{id:"maintenance",name:"Maintenance",Component:maintenance},
{id:"machine-operator",name:"Machine Operator",Component:machine_operator},
{id:"finance-accounts",name:"Finance & Accounts",Component:finance_accounts},
{id:"hr-payroll",name:"HR & Payroll",Component:hr_payroll},
{id:"logistics-distribution",name:"Logistics / Distribution",Component:logistics_distribution},
{id:"reports-analytics",name:"Reports & Analytics",Component:reports_analytics},
];
const CREDS=["admin@techtarn.com","management@techtarn.com","sales@techtarn.com","purchase@techtarn.com","production@techtarn.com","inventory@techtarn.com","quality@techtarn.com","warehouse@techtarn.com","foodsafety@techtarn.com","maintenance@techtarn.com","operator@techtarn.com","finance@techtarn.com","hr@techtarn.com","logistics@techtarn.com","reports@techtarn.com"];
function Login({onLogin}){const[e,setE]=useState("admin@techtarn.com"),[p,setP]=useState("Demo@123"),[err,setErr]=useState("");return <div className="master-login"><div className="master-card"><div className="master-logo">T</div><div className="eyebrow">FOOD PROCESSING ERP · MASTER ACCESS</div><h1>TechTarn ERP</h1><p>All 15 panels under one roof.</p><form onSubmit={ev=>{ev.preventDefault();if(CREDS.includes(e)&&p==="Demo@123")onLogin({email:e,role:"ERP User"});else setErr("Use a valid demo email with password Demo@123.")}}><label>Email<input type="email" value={e} onChange={ev=>setE(ev.target.value)} required/></label><label>Password<input type="password" value={p} onChange={ev=>setP(ev.target.value)} required/></label>{err&&<div className="master-error">{err}</div>}<button className="master-primary">Sign in to ERP</button></form><small>Demo password: Demo@123 · Admin: admin@techtarn.com</small></div></div>}
function Launcher({user,onLogout}){const[selected,setSelected]=useState("");if(!selected)return <div className="launcher"><div className="launch-head"><div><div className="eyebrow">TECHTARN · UNIFIED ERP</div><h1>ERP Control Center</h1><p>Select a panel to open its complete workspace.</p></div><button onClick={onLogout}>Sign out</button></div><div className="panel-grid">{PANELS.map((p,i)=><button className="panel-card" key={p.id} onClick={()=>setSelected(p.id)}><span className="panel-no">{String(i+1).padStart(2,"0")}</span><b>{p.name}</b><small>Open workspace →</small></button>)}</div><div className="launch-foot">{user.email} · TechTarn · 15 panels</div></div>;const p=PANELS.find(x=>x.id===selected);const C=p.Component;return <div className="workspace"><button className="master-switch" onClick={()=>setSelected("")}>⌂ ERP Home</button><div className="master-current">{p.name}</div><C/></div>}
function App(){const[user,setUser]=useState(null);return user?<Launcher user={user} onLogout={()=>setUser(null)}/>:<Login onLogin={setUser}/>}
createRoot(document.getElementById("root")).render(<App/>);
