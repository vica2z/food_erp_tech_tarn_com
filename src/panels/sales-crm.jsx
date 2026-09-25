import React,{useEffect,useMemo,useState} from "react";
import {Activity,Archive,ArrowRight,BarChart3,Bell,Check,ChevronDown,ChevronRight,ClipboardList,Database,Edit3,FileText,Home,LayoutDashboard,LogOut,Menu,Package,Plus,Search,Send,Settings,ShieldCheck,ShoppingCart,Trash2,Truck,UserRound,Users,X} from "lucide-react";
import "./sales-crm.css";
import HowWorks from "../how-works.jsx";

const BRAND={name:"TechTarn",phone:"+90 - 7453966757",email:"contact@techtarn.com",website:"www.techtarn.com"};
const PANELS=["Super Admin","Management / CEO","Sales & CRM","Purchase","Production","Quality / QA-QC","Raw Material / Inventory","Warehouse","Food Safety","Maintenance","Machine Operator","Finance & Accounts","HR & Payroll","Logistics / Distribution","Reports & Analytics"];

const SALES_USER={id:"S001",name:"Sales Demo",email:"sales@techtarn.com",role:"Sales & CRM"};
const ADMIN={id:"SA001",name:"System Administrator",email:"admin@techtarn.com",role:"Super Admin"};

const initialCustomers=[
 {id:"CUS-001",code:"C-1001",name:"FreshMart Foods Pvt Ltd",contact:"Anita Sharma",email:"anita@freshmart.example",phone:"+91 98765 11001",city:"Delhi",credit:500000,status:"Active"},
 {id:"CUS-002",code:"C-1002",name:"GreenBasket Retail",contact:"Rohit Mehta",email:"rohit@greenbasket.example",phone:"+91 98765 11002",city:"Noida",credit:300000,status:"Active"},
 {id:"CUS-003",code:"C-1003",name:"HealthyBite Distributors",contact:"Priya Nair",email:"priya@healthybite.example",phone:"+91 98765 11003",city:"Lucknow",credit:250000,status:"Active"}
];
const initialQuotes=[
 {id:"QT-1001",customer:"FreshMart Foods Pvt Ltd",date:"2026-09-22",valid:"2026-10-07",items:12,total:286400,status:"Sent"},
 {id:"QT-1002",customer:"GreenBasket Retail",date:"2026-09-23",valid:"2026-10-08",items:8,total:164800,status:"Draft"},
 {id:"QT-1003",customer:"HealthyBite Distributors",date:"2026-09-24",valid:"2026-10-09",items:10,total:219500,status:"Accepted"}
];
const initialOrders=[
 {id:"SO-2001",customer:"FreshMart Foods Pvt Ltd",date:"2026-09-23",items:15,total:352000,status:"Confirmed"},
 {id:"SO-2002",customer:"GreenBasket Retail",date:"2026-09-24",items:9,total:188500,status:"Processing"},
 {id:"SO-2003",customer:"HealthyBite Distributors",date:"2026-09-25",items:11,total:241600,status:"Pending"}
];
const initialPricing=[
 {id:"PR-001",product:"Premium Tomato Puree 1kg",customer:"FreshMart Foods Pvt Ltd",unit:"Case",price:1840,currency:"INR",valid:"2026-10-31",status:"Active"},
 {id:"PR-002",product:"Mango Pulp 850g",customer:"GreenBasket Retail",unit:"Case",price:2290,currency:"INR",valid:"2026-11-15",status:"Active"},
 {id:"PR-003",product:"Mixed Fruit Jam 500g",customer:"All Customers",unit:"Case",price:1260,currency:"INR",valid:"2026-12-31",status:"Active"}
];
const initialDispatch=[
 {id:"DSP-001",order:"SO-2001",customer:"FreshMart Foods Pvt Ltd",date:"2026-09-25",carrier:"TechTarn Logistics",vehicle:"UP16 AB 2401",qty:180,status:"Ready"},
 {id:"DSP-002",order:"SO-2002",customer:"GreenBasket Retail",date:"2026-09-26",carrier:"NorthLine Transport",vehicle:"DL01 CD 4820",qty:96,status:"Planned"},
 {id:"DSP-003",order:"SO-1998",customer:"HealthyBite Distributors",date:"2026-09-24",carrier:"TechTarn Logistics",vehicle:"UP16 AB 2310",qty:72,status:"Delivered"}
];

const uid=p=>p+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
const money=n=>"₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:0});

export default function App(){
 const [logged,setLogged]=useState(true),[panel,setPanel]=useState("Sales & CRM"),[module,setModule]=useState("Dashboard"),[query,setQuery]=useState(""),[sidebar,setSidebar]=useState(false),[tour,setTour]=useState(true),[toast,setToast]=useState(""),[modal,setModal]=useState(null);
 const [customers,setCustomers]=useState(initialCustomers),[quotes,setQuotes]=useState(initialQuotes),[orders,setOrders]=useState(initialOrders),[pricing,setPricing]=useState(initialPricing),[dispatch,setDispatch]=useState(initialDispatch);
 const [audit,setAudit]=useState([{id:"AUD-CRM1",time:"25 Sep 2026 10:20",user:"Sales Demo",action:"Login",module:"Authentication"},{id:"AUD-CRM2",time:"25 Sep 2026 10:18",user:"Sales Demo",action:"Viewed",module:"Orders"}]);
 const [settings,setSettings]=useState({currency:"INR",tax:"GST",session:"30 minutes",alerts:true});
 useEffect(()=>{if(toast){let t=setTimeout(()=>setToast(""),2400);return()=>clearTimeout(t)}},[toast]);
 const notify=x=>setToast(x);
 const log=(action,m)=>setAudit(a=>[{id:uid("AUD"),time:new Date().toLocaleString("en-GB"),user:SALES_USER.name,action,module:m},...a]);
 const login=(email,pwd,selected)=>{
   const valid=(email===SALES_USER.email||email===ADMIN.email)&&pwd==="Demo@123";
   if(!valid){notify("Invalid credentials. Use Demo@123.");return}
   setPanel(selected||"Sales & CRM");setModule("Dashboard");setLogged(true);log("Login","Authentication");notify("Login successful.");
 };
 if(!logged)return <Login onLogin={login}/>;

 const nav=["Dashboard","Customers","Quotations","Orders","Pricing","Dispatch","Reports","Settings"];
 const icon=m=>({Dashboard:<LayoutDashboard/>,Customers:<Users/>,Quotations:<FileText/>,Orders:<ShoppingCart/>,Pricing:<BarChart3/>,Dispatch:<Truck/>,Reports:<Archive/>,Settings:<Settings/>}[m]);
 const nextTour=()=>{let i=nav.indexOf(module);if(i<nav.length-1)setModule(nav[i+1]);else setTour(false)};
 const create=()=>setModal(module==="Customers"?"customer":module==="Quotations"?"quote":module==="Orders"?"order":module==="Pricing"?"pricing":module==="Dispatch"?"dispatch":null);

 return <div className="app">
  <aside className={"sidebar "+(sidebar?"open":"")}>
   <div className="brand"><div className="mark">T</div><div><b>TechTarn</b><small>Food Processing ERP</small></div><button className="mobile icon" onClick={()=>setSidebar(false)}><X/></button></div>
   <label className="caption">CURRENT PANEL</label><div className="panelBox">{panel}<ChevronDown size={15}/></div>
   <label className="caption navCaption">SALES & CRM</label>
   <nav>{nav.map(n=><button key={n} className={"nav "+(module===n?"active":"")} onClick={()=>{setModule(n);setSidebar(false)}}>{icon(n)}<span>{n}</span></button>)}</nav>
   <div className="sideFoot"><ShieldCheck size={15}/> Secure ERP Workspace</div>
  </aside>
  <main className="main">
   <header className="topbar">
    <button className="mobile icon" onClick={()=>setSidebar(true)}><Menu/></button>
    <div><small>{panel}</small><h1>{module}</h1></div>
    <div className="actions"><div className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search current module..."/></div><button className="icon"><Bell/></button><div className="avatar">SD</div><button className="logout" onClick={()=>setLogged(false)}><LogOut/> Logout</button></div>
   </header>
   <section className="content">
    {module==="Dashboard"&&<SalesDashboard customers={customers} quotes={quotes} orders={orders} dispatch={dispatch} go={setModule}/>}
    {module==="Customers"&&<Customers data={customers} setData={setCustomers} q={query} open={create} log={log} notify={notify}/>}
    {module==="Quotations"&&<Quotations data={quotes} setData={setQuotes} q={query} open={create} log={log} notify={notify}/>}
    {module==="Orders"&&<Orders data={orders} setData={setOrders} q={query} open={create} log={log} notify={notify}/>}
    {module==="Pricing"&&<Pricing data={pricing} setData={setPricing} q={query} open={create} log={log} notify={notify}/>}
    {module==="Dispatch"&&<Dispatch data={dispatch} setData={setDispatch} q={query} open={create} log={log} notify={notify}/>}
    {module==="Reports"&&<Reports customers={customers} quotes={quotes} orders={orders} dispatch={dispatch} notify={notify}/>}
    {module==="Settings"&&<SettingsPage settings={settings} setSettings={setSettings} save={()=>{log("Updated","Settings");notify("CRM settings saved.")}}/>}
   </section>
  </main>
  {tour&&<Tour module={module} next={nextTour} close={()=>setTour(false)}/>}
  {modal&&<DataModal type={modal} close={()=>setModal(null)} customers={customers} quotes={quotes} orders={orders} pricing={pricing} dispatch={dispatch} setCustomers={setCustomers} setQuotes={setQuotes} setOrders={setOrders} setPricing={setPricing} setDispatch={setDispatch} log={log} notify={notify}/>}
  {toast&&<div className="toast"><Check/>{toast}</div>}
 <HowWorks panel="Sales & CRM" module={module}/></div>
}

function Login({onLogin}){
 const [email,setEmail]=useState("sales@techtarn.com"),[pwd,setPwd]=useState("Demo@123"),[panel,setPanel]=useState("Sales & CRM");
 return <div className="login"><div className="loginCard"><div className="brand loginBrand"><div className="mark big">T</div><div><b>TechTarn</b><small>Food Processing ERP</small></div></div><span className="pill">ERP PROTOTYPE • SALES & CRM</span><h2>Welcome back</h2><p className="muted">Sign in to your authorized ERP panel.</p><form onSubmit={e=>{e.preventDefault();onLogin(email,pwd,panel)}}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}/></label><label>Login panel<select value={panel} onChange={e=>setPanel(e.target.value)}>{PANELS.map(p=><option key={p}>{p}</option>)}</select></label><button className="primary full"><LogOut/> Sign in to {panel}</button></form><div className="demo"><b>Demo credentials</b><span>sales@techtarn.com</span><span>Password: Demo@123</span></div><footer>{BRAND.email} · {BRAND.phone} · {BRAND.website}</footer></div></div>
}

function Intro({title,text,button}){return <div className="intro"><div><h2>{title}</h2><p>{text}</p></div>{button}</div>}
function Action({children,onClick,secondary=false}){return <button className={secondary?"secondary":"primary"} onClick={onClick}>{children}</button>}

function SalesDashboard({customers,quotes,orders,dispatch,go}){
 const sales=orders.reduce((s,o)=>s+o.total,0),pending=quotes.filter(x=>x.status==="Draft").length,ready=dispatch.filter(x=>x.status==="Ready").length;
 return <div className="page"><div className="hero"><div><span className="pill darkpill">PANEL 3 • SALES & CRM</span><h2>Sales command center</h2><p>Customer, quotation, order, pricing and dispatch control in one workspace.</p></div><Action onClick={()=>go("Orders")}><Plus/> New Sales Order</Action></div>
 <div className="stats">{[["Customers",customers.length,Users],["Quote Value",money(quotes.reduce((s,q)=>s+q.total,0)),FileText],["Order Value",money(sales),ShoppingCart],["Dispatch Ready",ready,Truck]].map(([l,v,I])=><div className="stat" key={l}><I/><span>{l}</span><b>{v}</b></div>)}</div>
 <div className="two"><div className="card"><Head title="Sales workflow" text="Open a module to manage the transaction lifecycle."/><div className="tiles">{["Customers","Quotations","Orders","Pricing","Dispatch"].map((x,i)=><button key={x} onClick={()=>go(x)}><span>0{i+1}</span><b>{x}</b><ArrowRight/></button>)}</div></div>
 <div className="card"><Head title="Today’s attention" text="Items that may need sales-team action."/><div className="attention"><div><b>{pending}</b><span>Draft quotations</span></div><div><b>{orders.filter(o=>o.status==="Pending").length}</b><span>Pending orders</span></div><div><b>{ready}</b><span>Ready dispatches</span></div></div></div></div>
 </div>
}
function Head({title,text,action}){return <div className="head"><div><h3>{title}</h3><p>{text}</p></div>{action}</div>}

function Table({title,text,action,children}){return <div className="card tableCard"><Head title={title} text={text} action={action}/><div className="tableWrap">{children}</div></div>}
function Actions({edit,del}){return <div className="rowActions"><button onClick={edit}><Edit3/></button><button onClick={del}><Trash2/></button></div>}

function Customers({data,setData,q,open,log,notify}){
 const rows=data.filter(x=>(Object.values(x).join(" ")).toLowerCase().includes(q.toLowerCase()));
 const remove=id=>{setData(data.filter(x=>x.id!==id));log("Deleted","Customers");notify("Customer deleted.")};
 return <div className="page"><Intro title="Customers" text="Manage customer master records, contacts and credit limits." button={<Action onClick={open}><Plus/> Add Customer</Action>}/><Table title="Customer directory" text={rows.length+" customer records"} action={<span className="count">{rows.length} Records</span>}><table><thead><tr><th>Customer</th><th>Contact</th><th>Location</th><th>Credit limit</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.name}</b><small>{x.code} · {x.email}</small></td><td>{x.contact}<small>{x.phone}</small></td><td>{x.city}</td><td>{money(x.credit)}</td><td><span className="status active">{x.status}</span></td><td><Actions edit={()=>notify("Customer editor opened.")} del={()=>remove(x.id)}/></td></tr>)}</tbody></table></Table></div>
}

function Quotations({data,setData,q,open,log,notify}){
 const rows=data.filter(x=>(Object.values(x).join(" ")).toLowerCase().includes(q.toLowerCase()));
 const remove=id=>{setData(data.filter(x=>x.id!==id));log("Deleted","Quotations");notify("Quotation deleted.")};
 const send=id=>{setData(data.map(x=>x.id===id?{...x,status:"Sent"}:x));log("Updated","Quotations");notify("Quotation sent.")};
 return <div className="page"><Intro title="Quotations" text="Prepare, send and track customer quotations." button={<Action onClick={open}><Plus/> New Quotation</Action>}/><Table title="Quotation register" text="Quotation validity, value and workflow status."><table><thead><tr><th>Quotation</th><th>Customer</th><th>Date / Validity</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.id}</b></td><td>{x.customer}</td><td>{x.date}<small>Valid to {x.valid}</small></td><td>{x.items}</td><td>{money(x.total)}</td><td><span className={"status "+(x.status==="Accepted"?"active":"neutral")}>{x.status}</span></td><td><div className="rowActions"><button onClick={()=>send(x.id)}><Send/></button><button onClick={()=>remove(x.id)}><Trash2/></button></div></td></tr>)}</tbody></table></Table></div>
}

function Orders({data,setData,q,open,log,notify}){
 const rows=data.filter(x=>(Object.values(x).join(" ")).toLowerCase().includes(q.toLowerCase()));
 const remove=id=>{setData(data.filter(x=>x.id!==id));log("Deleted","Orders");notify("Order deleted.")};
 const nextStatus=id=>{let seq=["Pending","Confirmed","Processing","Completed"],x=data.find(a=>a.id===id),i=seq.indexOf(x.status);setData(data.map(a=>a.id===id?{...a,status:seq[Math.min(i+1,seq.length-1)]}:a));log("Updated","Orders");notify("Order status updated.")};
 return <div className="page"><Intro title="Orders" text="Track confirmed sales orders through processing." button={<Action onClick={open}><Plus/> New Sales Order</Action>}/><Table title="Sales order register" text="Order value and fulfillment status."><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.id}</b></td><td>{x.customer}</td><td>{x.date}</td><td>{x.items}</td><td>{money(x.total)}</td><td><span className="status active">{x.status}</span></td><td><div className="rowActions"><button onClick={()=>nextStatus(x.id)}><Check/></button><button onClick={()=>remove(x.id)}><Trash2/></button></div></td></tr>)}</tbody></table></Table></div>
}

function Pricing({data,setData,q,open,log,notify}){
 const rows=data.filter(x=>(Object.values(x).join(" ")).toLowerCase().includes(q.toLowerCase()));
 const remove=id=>{setData(data.filter(x=>x.id!==id));log("Deleted","Pricing");notify("Price record deleted.")};
 return <div className="page"><Intro title="Pricing" text="Maintain customer/product price lists and validity dates." button={<Action onClick={open}><Plus/> Add Price</Action>}/><Table title="Price list" text="Active selling prices."><table><thead><tr><th>Product</th><th>Customer</th><th>Unit</th><th>Price</th><th>Valid to</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.product}</b><small>{x.id}</small></td><td>{x.customer}</td><td>{x.unit}</td><td>{money(x.price)} / {x.unit}</td><td>{x.valid}</td><td><span className="status active">{x.status}</span></td><td><Actions edit={()=>notify("Price editor opened.")} del={()=>remove(x.id)}/></td></tr>)}</tbody></table></Table></div>
}

function Dispatch({data,setData,q,open,log,notify}){
 const rows=data.filter(x=>(Object.values(x).join(" ")).toLowerCase().includes(q.toLowerCase()));
 const remove=id=>{setData(data.filter(x=>x.id!==id));log("Deleted","Dispatch");notify("Dispatch record deleted.")};
 const mark=id=>{setData(data.map(x=>x.id===id?{...x,status:x.status==="Delivered"?"Delivered":"Delivered"}:x));log("Updated","Dispatch");notify("Dispatch marked delivered.")};
 return <div className="page"><Intro title="Dispatch" text="Plan outbound shipments and monitor delivery status." button={<Action onClick={open}><Plus/> Create Dispatch</Action>}/><Table title="Dispatch register" text="Vehicle, carrier and shipment quantities."><table><thead><tr><th>Dispatch</th><th>Order / Customer</th><th>Date</th><th>Carrier / Vehicle</th><th>Qty</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><b>{x.id}</b></td><td>{x.order}<small>{x.customer}</small></td><td>{x.date}</td><td>{x.carrier}<small>{x.vehicle}</small></td><td>{x.qty}</td><td><span className={"status "+(x.status==="Delivered"?"active":"neutral")}>{x.status}</span></td><td><div className="rowActions"><button onClick={()=>mark(x.id)}><Check/></button><button onClick={()=>remove(x.id)}><Trash2/></button></div></td></tr>)}</tbody></table></Table></div>
}

function Reports({customers,quotes,orders,dispatch,notify}){
 const cards=[["Customer report",customers.length+" customers",Users],["Quotation report",money(quotes.reduce((s,x)=>s+x.total,0)),FileText],["Order report",money(orders.reduce((s,x)=>s+x.total,0)),ShoppingCart],["Dispatch report",dispatch.length+" shipments",Truck]];
 return <div className="page"><Intro title="Sales Reports" text="Quick management summaries from Sales & CRM." button={<Action secondary onClick={()=>notify("Report export queued in prototype.")}><Archive/> Export Report</Action>}/><div className="reportGrid">{cards.map(([a,b,I])=><div className="report card" key={a}><I/><span>{a}</span><b>{b}</b><small>Current demo data</small></div>)}</div><Table title="Pipeline snapshot" text="Workflow counts"><table><thead><tr><th>Area</th><th>Records</th><th>Action</th></tr></thead><tbody>{[["Customers",customers.length],["Quotations",quotes.length],["Orders",orders.length],["Dispatch",dispatch.length]].map(r=><tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td><span className="status active">Available</span></td></tr>)}</tbody></table></Table></div>
}
function SettingsPage({settings,setSettings,save}){
 return <div className="page"><Intro title="Sales & CRM Settings" text="Configure sales workspace defaults." button={<Action onClick={save}><Check/> Save Settings</Action>}/><div className="settings card"><h3>Workspace defaults</h3><div className="formGrid"><label>Currency<select value={settings.currency} onChange={e=>setSettings({...settings,currency:e.target.value})}><option>INR</option><option>USD</option><option>EUR</option></select></label><label>Tax regime<input value={settings.tax} onChange={e=>setSettings({...settings,tax:e.target.value})}/></label><label>Session timeout<select value={settings.session} onChange={e=>setSettings({...settings,session:e.target.value})}><option>15 minutes</option><option>30 minutes</option><option>60 minutes</option></select></label><label className="checkLabel"><input type="checkbox" checked={settings.alerts} onChange={e=>setSettings({...settings,alerts:e.target.checked})}/> Enable sales alerts</label></div></div></div>
}

function DataModal({type,close,customers,quotes,orders,pricing,dispatch,setCustomers,setQuotes,setOrders,setPricing,setDispatch,log,notify}){
 const firstCustomer=customers[0]?.name||"FreshMart Foods Pvt Ltd";
 const templates={
 customer:{name:"Demo Customer",code:"C-"+Math.floor(1000+Math.random()*8999),contact:"Contact Person",email:"customer@example.com",phone:"+91 98765 00000",city:"Delhi",credit:100000,status:"Active"},
 quote:{customer:firstCustomer,date:"2026-09-25",valid:"2026-10-10",items:5,total:125000,status:"Draft"},
 order:{customer:firstCustomer,date:"2026-09-25",items:5,total:125000,status:"Pending"},
 pricing:{product:"New Food Product",customer:"All Customers",unit:"Case",price:1500,currency:"INR",valid:"2026-12-31",status:"Active"},
 dispatch:{order:orders[0]?.id||"SO-2001",customer:firstCustomer,date:"2026-09-27",carrier:"TechTarn Logistics",vehicle:"UP16 AB 2500",qty:50,status:"Planned"}
 };
 const [form,setForm]=useState(templates[type]);
 const set=(k,v)=>setForm({...form,[k]:v});
 const save=e=>{e.preventDefault();if(type==="customer")setCustomers([{...form,id:uid("CUS")},...customers]);if(type==="quote")setQuotes([{...form,id:uid("QT")},...quotes]);if(type==="order")setOrders([{...form,id:uid("SO")},...orders]);if(type==="pricing")setPricing([{...form,id:uid("PR")},...pricing]);if(type==="dispatch")setDispatch([{...form,id:uid("DSP")},...dispatch]);log("Created",type[0].toUpperCase()+type.slice(1));notify("Record created successfully.");close()};
 const title={customer:"Add Customer",quote:"New Quotation",order:"New Sales Order",pricing:"Add Price",dispatch:"Create Dispatch"}[type];
 const fields={customer:[["name","Customer name"],["code","Customer code"],["contact","Contact person"],["email","Email"],["phone","Phone"],["city","City"],["credit","Credit limit"]],quote:[["customer","Customer"],["date","Quotation date"],["valid","Valid until"],["items","Items"],["total","Total value"]],order:[["customer","Customer"],["date","Order date"],["items","Items"],["total","Total value"]],pricing:[["product","Product"],["customer","Customer"],["unit","Unit"],["price","Price"],["valid","Valid until"]],dispatch:[["order","Sales order"],["customer","Customer"],["date","Dispatch date"],["carrier","Carrier"],["vehicle","Vehicle"],["qty","Quantity"]]}[type];
 return <div className="backdrop"><div className="modal"><div className="modalHead"><div><span className="pill">DATA ENTRY</span><h3>{title}</h3></div><button className="icon" onClick={close}><X/></button></div><form onSubmit={save}><div className="formGrid">{fields.map(([k,l])=><label key={k}>{l}<input required value={form[k]} onChange={e=>set(k,["credit","items","total","price","qty"].includes(k)?Number(e.target.value):e.target.value)} type={["credit","items","total","price","qty"].includes(k)?"number":k==="email"?"email":k==="date"||k==="valid"?"date":"text"}/></label>)}</div><div className="modalActions"><Action secondary onClick={close}>Cancel</Action><Action><Check/> Save Record</Action></div></form></div></div>
}

function Tour({module,next,close}){return <div className="tour"><div className="tourTop"><span className="pill">GUIDE TOUR</span><button className="icon" onClick={close}><X/></button></div><h3>{module} module</h3><p>Use the controls on this screen to create, search, update workflow status or delete demo records. On mobile, tables can be scrolled horizontally without breaking the page layout.</p><div className="tourFoot"><small>Step-by-step navigation is active.</small><button className="primary small" onClick={next}>Next <ChevronRight/></button></div></div>}

