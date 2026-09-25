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
{id:"super-admin",name:"Super Admin",email:"admin@techtarn.com",purpose:"Manage users, roles, permissions, settings and audit controls.",modules:["Dashboard","Users","Roles","Permissions","Settings","Audit Log"],Component:super_admin},
{id:"management-ceo",name:"Management / CEO",email:"management@techtarn.com",purpose:"Executive visibility for KPIs, reports and management approvals.",modules:["Dashboard","KPIs","Reports","Approvals"],Component:management_ceo},
{id:"sales-crm",name:"Sales & CRM",email:"sales@techtarn.com",purpose:"Manage customers, quotations, orders, pricing and dispatch.",modules:["Customers","Quotations","Orders","Pricing","Dispatch","Reports"],Component:sales_crm},
{id:"purchase",name:"Purchase",email:"purchase@techtarn.com",purpose:"Control suppliers, RFQs, purchase orders and goods receipts.",modules:["Suppliers","RFQ","Purchase Orders","GRN","Dashboard","Reports"],Component:purchase},
{id:"production",name:"Production",email:"production@techtarn.com",purpose:"Plan and execute food production through recipes, batches and work orders.",modules:["Production Planning","Batch Processing","Recipes","Work Orders","Dashboard","Reports"],Component:production},
{id:"inventory",name:"Raw Material / Inventory",email:"inventory@techtarn.com",purpose:"Track stock, lots, batches, expiry and inventory transfers.",modules:["Stock","Lots","Batches","Expiry","Transfers","Dashboard","Reports"],Component:inventory},
{id:"quality",name:"Quality / QA-QC",email:"quality@techtarn.com",purpose:"Manage quality tests, specifications, sampling, CAPA and compliance.",modules:["QC Tests","Sampling","Specifications","CAPA","Compliance","Reports"],Component:quality},
{id:"warehouse",name:"Warehouse",email:"warehouse@techtarn.com",purpose:"Handle inward, outward, bins, picking and packing operations.",modules:["Inward","Outward","Bin Management","Picking","Packing","Dashboard","Reports"],Component:warehouse},
{id:"food-safety",name:"Food Safety",email:"foodsafety@techtarn.com",purpose:"Control HACCP, CCP, traceability and food safety records.",modules:["HACCP","CCP","Traceability","Food Safety Records","Dashboard","Reports"],Component:food_safety},
{id:"maintenance",name:"Maintenance",email:"maintenance@techtarn.com",purpose:"Maintain machines through preventive maintenance, breakdowns and spares.",modules:["Machines","Preventive Maintenance","Breakdown","Spares","Dashboard","Reports"],Component:maintenance},
{id:"machine-operator",name:"Machine Operator",email:"operator@techtarn.com",purpose:"Record machine status, production, downtime and operator checklists.",modules:["Machine Status","Production Entry","Downtime","Checklist","Dashboard","Reports"],Component:machine_operator},
{id:"finance-accounts",name:"Finance & Accounts",email:"finance@techtarn.com",purpose:"Manage receivables, payables, GL, payments, tax and costing.",modules:["AR","AP","GL","Payments","Tax","Costing"],Component:finance_accounts},
{id:"hr-payroll",name:"HR & Payroll",email:"hr@techtarn.com",purpose:"Manage employees, attendance, leave, payroll and compliance.",modules:["Employees","Attendance","Leave","Payroll","Compliance"],Component:hr_payroll},
{id:"logistics-distribution",name:"Logistics / Distribution",email:"logistics@techtarn.com",purpose:"Coordinate vehicles, routes, deliveries, transport and POD.",modules:["Vehicles","Routes","Delivery","Transport","POD","Dashboard","Reports"],Component:logistics_distribution},
{id:"reports-analytics",name:"Reports & Analytics",email:"reports@techtarn.com",purpose:"Create and review MIS, production, sales, inventory, finance and quality reports.",modules:["MIS","Production","Sales","Inventory","Finance","Quality","Report Builder"],Component:reports_analytics},
];
const CREDS=PANELS.map(x=>x.email);
const PANEL_BY_EMAIL=Object.fromEntries(PANELS.map(x=>[x.email,x]));
function Login({onLogin}){
 const[e,setE]=useState("admin@techtarn.com"),[p,setP]=useState("Demo@123"),[err,setErr]=useState(""),[open,setOpen]=useState(false);
 const selected=PANEL_BY_EMAIL[e];
 const choosePanel=(panel)=>{setE(panel.email);setP("Demo@123");setErr("");setOpen(false);};
 return <div className="master-login">
  <div className="master-login-wrap">
   <div className="master-card">
    <div className="master-logo">T</div><div className="eyebrow">FOOD PROCESSING ERP · MASTER ACCESS</div><h1>TechTarn ERP</h1>
    <p>One secure login for all 15 ERP panels. Choose your work area below or enter your demo credentials.</p>
    <div className="selected-panel"><div><span className="selected-label">Selected panel</span><strong>{selected?.name||"Select a panel"}</strong><small>{selected?.purpose||"Choose a panel to see what it manages."}</small></div><button type="button" onClick={()=>setOpen(v=>!v)}>{open?"Close":"Choose panel"}</button></div>
    {open&&<div className="login-panel-picker">
      <div className="picker-head"><strong>All 15 panels</strong><span>Click a panel to use its demo login</span></div>
      <div className="login-panel-list">{PANELS.map((panel,i)=><button type="button" className={`login-panel-item ${selected?.id===panel.id?"active":""}`} key={panel.id} onClick={()=>choosePanel(panel)}>
       <span className="login-panel-number">{String(i+1).padStart(2,"0")}</span><span className="login-panel-main"><b>{panel.name}</b><small>{panel.purpose}</small><em>{panel.modules.slice(0,4).join(" · ")}{panel.modules.length>4?" · +more":""}</em></span><span className="login-panel-arrow">→</span>
      </button>)}</div>
    </div>}
    <form onSubmit={ev=>{ev.preventDefault();if(CREDS.includes(e)&&p==="Demo@123")onLogin({email:e,role:selected?.name||"ERP User",panel:selected?.id||"super-admin"});else setErr("Use a valid panel email with password Demo@123.")}}>
      <label>Email<input type="email" value={e} onChange={ev=>setE(ev.target.value)} required/></label>
      <label>Password<input type="password" value={p} onChange={ev=>setP(ev.target.value)} required/></label>
      {err&&<div className="master-error">{err}</div>}
      <button className="master-primary">Sign in to ERP</button>
    </form>
    <div className="login-help"><strong>Demo access</strong><span>Password: <b>Demo@123</b></span><span>Admin: <b>admin@techtarn.com</b></span></div>
   </div>
   <div className="login-panels-summary"><div className="summary-head"><div><div className="eyebrow">QUICK PANEL GUIDE</div><h2>Which panel should I use?</h2><p>Each panel has a dedicated workspace and demo account. Click any card to select it on the login form.</p></div><span className="panel-count">15 PANELS</span></div>
    <div className="login-summary-grid">{PANELS.map((panel,i)=><button type="button" key={panel.id} className={`login-summary-card ${selected?.id===panel.id?"active":""}`} onClick={()=>choosePanel(panel)}><span className="summary-number">{String(i+1).padStart(2,"0")}</span><b>{panel.name}</b><small>{panel.purpose}</small><span className="summary-modules">{panel.modules.join(" · ")}</span><span className="summary-login">{panel.email}</span></button>)}</div>
   </div>
  </div>
 </div>
}
function Launcher({user,onLogout}){const[selected,setSelected]=useState("");if(!selected)return <div className="launcher"><div className="launch-head"><div><div className="eyebrow">TECHTARN · UNIFIED ERP</div><h1>ERP Control Center</h1><p>Select a panel to open its complete workspace.</p></div><button onClick={onLogout}>Sign out</button></div><div className="panel-grid">{PANELS.map((p,i)=><button className="panel-card" key={p.id} onClick={()=>setSelected(p.id)}><span className="panel-no">{String(i+1).padStart(2,"0")}</span><b>{p.name}</b><small>Open workspace →</small></button>)}</div><div className="launch-foot">{user.email} · TechTarn · 15 panels</div></div>;const p=PANELS.find(x=>x.id===selected);const C=p.Component;return <div className="workspace"><button className="master-switch" onClick={()=>setSelected("")}>⌂ ERP Home</button><div className="master-current">{p.name}</div><C/></div>}
function App(){const[user,setUser]=useState(null);return user?<Launcher user={user} onLogout={()=>setUser(null)}/>:<Login onLogin={setUser}/>}
createRoot(document.getElementById("root")).render(<App/>);
