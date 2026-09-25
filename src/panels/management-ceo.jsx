import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, Archive, Bell, Check, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardList, Database, FileClock, Home, KeyRound, LayoutDashboard,
  LockKeyhole, LogOut, Menu, Plus, Search, Settings, ShieldCheck, SlidersHorizontal,
  Trash2, UserCog, Users, X, Edit3
} from "lucide-react";
import HowWorks from "../how-works.jsx";
import "./management-ceo.css";

const BRAND = {
  name: "TechTarn",
  phone: "+90 - 7453966757",
  email: "contact@techtarn.com",
  website: "www.techtarn.com"
};

const PANELS = [
  "Super Admin", "Management / CEO", "Sales & CRM", "Purchase", "Production",
  "Quality / QA-QC", "Raw Material / Inventory", "Warehouse", "Food Safety",
  "Maintenance", "Machine Operator", "Finance & Accounts", "HR & Payroll",
  "Logistics / Distribution", "Reports & Analytics"
];

const DEMO_USERS = [
  { id: "SA001", name: "System Administrator", email: "admin@techtarn.com", role: "Super Admin", status: "Active", lastLogin: "25 Sep 2026, 09:42" },
  { id: "M001", name: "Management Demo", email: "management@techtarn.com", role: "Management / CEO", status: "Active", lastLogin: "25 Sep 2026, 09:20" },
  { id: "S001", name: "Sales Demo", email: "sales@techtarn.com", role: "Sales & CRM", status: "Active", lastLogin: "24 Sep 2026, 17:10" },
  { id: "P001", name: "Purchase Demo", email: "purchase@techtarn.com", role: "Purchase", status: "Active", lastLogin: "24 Sep 2026, 16:50" },
  { id: "PR001", name: "Production Demo", email: "production@techtarn.com", role: "Production", status: "Active", lastLogin: "25 Sep 2026, 08:35" },
  { id: "Q001", name: "Quality Demo", email: "quality@techtarn.com", role: "Quality / QA-QC", status: "Active", lastLogin: "25 Sep 2026, 08:55" },
  { id: "I001", name: "Inventory Demo", email: "inventory@techtarn.com", role: "Raw Material / Inventory", status: "Active", lastLogin: "25 Sep 2026, 09:05" },
  { id: "W001", name: "Warehouse Demo", email: "warehouse@techtarn.com", role: "Warehouse", status: "Active", lastLogin: "25 Sep 2026, 09:12" },
  { id: "F001", name: "Food Safety Demo", email: "foodsafety@techtarn.com", role: "Food Safety", status: "Active", lastLogin: "24 Sep 2026, 15:20" },
  { id: "MT001", name: "Maintenance Demo", email: "maintenance@techtarn.com", role: "Maintenance", status: "Active", lastLogin: "25 Sep 2026, 07:40" },
  { id: "MO001", name: "Machine Operator Demo", email: "operator@techtarn.com", role: "Machine Operator", status: "Active", lastLogin: "25 Sep 2026, 09:28" },
  { id: "FN001", name: "Finance Demo", email: "finance@techtarn.com", role: "Finance & Accounts", status: "Active", lastLogin: "24 Sep 2026, 18:00" },
  { id: "HR001", name: "HR Demo", email: "hr@techtarn.com", role: "HR & Payroll", status: "Active", lastLogin: "25 Sep 2026, 08:10" },
  { id: "L001", name: "Logistics Demo", email: "logistics@techtarn.com", role: "Logistics / Distribution", status: "Active", lastLogin: "24 Sep 2026, 17:35" },
  { id: "R001", name: "Reports Demo", email: "reports@techtarn.com", role: "Reports & Analytics", status: "Active", lastLogin: "25 Sep 2026, 09:30" }
];

const ROLE_SEEDS = [
  ["Super Admin", "Full system access", "All modules", "Active"],
  ["Management / CEO", "Executive access", "Dashboard, Reports", "Active"],
  ["Sales & CRM", "Sales operations", "Customers, Orders", "Active"],
  ["Purchase", "Procurement", "Suppliers, PO, GRN", "Active"],
  ["Production", "Production operations", "Planning, Batches", "Active"],
  ["Quality / QA-QC", "Quality control", "QC, CAPA", "Active"],
  ["Raw Material / Inventory", "Inventory control", "Stock, Lots", "Active"],
  ["Warehouse", "Warehouse operations", "Bins, Picking", "Active"],
  ["Food Safety", "Food safety", "HACCP, Traceability", "Active"],
  ["Maintenance", "Asset maintenance", "PM, Breakdown", "Active"],
  ["Machine Operator", "Shop floor", "Machine entry", "Active"],
  ["Finance & Accounts", "Financial operations", "GL, AP, AR", "Active"],
  ["HR & Payroll", "People operations", "Employees, Payroll", "Active"],
  ["Logistics / Distribution", "Distribution", "Routes, Delivery", "Active"],
  ["Reports & Analytics", "Analytics", "MIS, KPI", "Active"]
];

const MODULES = [
  ["Users", "Create, edit, activate and deactivate users"],
  ["Roles", "Define panel-level roles and access groups"],
  ["Permissions", "Control View, Add, Edit, Delete and Export access"],
  ["Settings", "Company, security, notifications and system preferences"],
  ["Audit Log", "Track important login, create, update and delete activity"]
];

function uid(prefix="ID") {
  return prefix + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [panel, setPanel] = useState("Super Admin");
  const [activeModule, setActiveModule] = useState("Dashboard");
  const [users, setUsers] = useState(DEMO_USERS);
  const [roles, setRoles] = useState(ROLE_SEEDS.map((r,i)=>({id:"R"+String(i+1).padStart(3,"0"), name:r[0], desc:r[1], modules:r[2], status:r[3]})));
  const [permissions, setPermissions] = useState([
    {id:"PER001", role:"Super Admin", module:"Users", view:true, add:true, edit:true, del:true, export:true},
    {id:"PER002", role:"Super Admin", module:"Roles", view:true, add:true, edit:true, del:true, export:true},
    {id:"PER003", role:"Super Admin", module:"Permissions", view:true, add:true, edit:true, del:true, export:true},
    {id:"PER004", role:"Super Admin", module:"Settings", view:true, add:true, edit:true, del:false, export:true},
    {id:"PER005", role:"Management / CEO", module:"Dashboard", view:true, add:false, edit:false, del:false, export:true}
  ]);
  const [audit, setAudit] = useState([
    {id:"AUD-1005", time:"25 Sep 2026 09:42", user:"System Administrator", action:"Login", module:"Authentication", result:"Success"},
    {id:"AUD-1004", time:"25 Sep 2026 09:38", user:"System Administrator", action:"Updated", module:"Permissions", result:"Success"},
    {id:"AUD-1003", time:"25 Sep 2026 09:30", user:"Reports Demo", action:"Exported", module:"Reports", result:"Success"},
    {id:"AUD-1002", time:"25 Sep 2026 09:28", user:"Machine Operator Demo", action:"Login", module:"Authentication", result:"Success"},
    {id:"AUD-1001", time:"25 Sep 2026 09:12", user:"Warehouse Demo", action:"Created", module:"Warehouse", result:"Success"}
  ]);
  const [settings, setSettings] = useState({
    companyName: BRAND.name, phone: BRAND.phone, email: BRAND.email, website: BRAND.website,
    session: "30 minutes", twoFactor: true, emailAlerts: true, darkMode: false
  });
  const [managementKpis, setManagementKpis] = useState([
    {id:"KPI001", name:"Production Output", value:"86.4", unit:"%", target:"90", trend:"+4.2%", status:"On Track"},
    {id:"KPI002", name:"On-Time Delivery", value:"94.1", unit:"%", target:"95", trend:"+1.1%", status:"On Track"},
    {id:"KPI003", name:"Quality Yield", value:"98.2", unit:"%", target:"98", trend:"+0.6%", status:"On Track"},
    {id:"KPI004", name:"Inventory Value", value:"₹ 42.8", unit:"L", target:"45", trend:"-2.4%", status:"Watch"},
    {id:"KPI005", name:"Monthly Revenue", value:"₹ 3.84", unit:"Cr", target:"4.20", trend:"+6.8%", status:"On Track"},
    {id:"KPI006", name:"Food Safety Score", value:"99.1", unit:"%", target:"99", trend:"+0.4%", status:"On Track"}
  ]);
  const [managementReports, setManagementReports] = useState([
    {id:"RPT001", name:"Monthly Executive Review", period:"Sep 2026", owner:"Management", status:"Ready", updated:"25 Sep 2026"},
    {id:"RPT002", name:"Production Performance", period:"Week 39", owner:"Production", status:"Ready", updated:"25 Sep 2026"},
    {id:"RPT003", name:"Sales & Revenue Summary", period:"Sep 2026", owner:"Finance", status:"Draft", updated:"24 Sep 2026"},
    {id:"RPT004", name:"Quality & Food Safety", period:"Sep 2026", owner:"QA / QC", status:"Ready", updated:"25 Sep 2026"}
  ]);
  const [approvals, setApprovals] = useState([
    {id:"APR001", request:"Purchase Order #PO-24018", requester:"Purchase Manager", amount:"₹ 8.40 L", priority:"High", status:"Pending", date:"25 Sep 2026"},
    {id:"APR002", request:"Production Plan #PP-0926", requester:"Production Manager", amount:"12,500 kg", priority:"Medium", status:"Pending", date:"25 Sep 2026"},
    {id:"APR003", request:"Capex Request #CAP-104", requester:"Maintenance Manager", amount:"₹ 4.75 L", priority:"High", status:"Pending", date:"24 Sep 2026"},
    {id:"APR004", request:"Price Revision #PR-882", requester:"Sales Manager", amount:"₹ 2.10 Cr", priority:"Medium", status:"Approved", date:"24 Sep 2026"}
  ]);

  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tour, setTour] = useState(true);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (m) => setToast(m);
  const log = (action, module, user="System Administrator") =>
    setAudit(a => [{id:uid("AUD-"), time:new Date().toLocaleString("en-GB"), user, action, module, result:"Success"}, ...a]);

  const login = (email, password, selectedPanel) => {
    const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found || password !== "Demo@123") {
      showToast("Invalid demo credentials. Password is Demo@123.");
      return;
    }
    const chosen = selectedPanel || found.role;
    setPanel(chosen);
    setLoggedIn(true);
    setActiveModule(chosen === "Super Admin" ? "Dashboard" : "Dashboard");
    log("Login", "Authentication", found.name);
    showToast(`Welcome, ${found.name}`);
  };

  if (!loggedIn) return <LoginScreen onLogin={login} />;

  const moduleItems = panel === "Super Admin"
    ? ["Dashboard", "Users", "Roles", "Permissions", "Settings", "Audit Log"]
    : panel === "Management / CEO"
      ? ["Dashboard", "KPIs", "Reports", "Approvals"]
      : ["Dashboard", "Overview", "Tasks", "Transactions", "Reports", "Settings"];

  const navIcon = (m) => ({
    Dashboard: <LayoutDashboard size={18}/>, Users: <Users size={18}/>, Roles: <UserCog size={18}/>,
    Permissions: <ShieldCheck size={18}/>, Settings: <Settings size={18}/>, "Audit Log": <FileClock size={18}/>,
    Overview: <Activity size={18}/>, Tasks: <ClipboardList size={18}/>, Transactions: <Database size={18}/>,
    Reports: <Archive size={18}/>, KPIs: <Activity size={18}/>, Approvals: <Check size={18}/>
  }[m] || <SlidersHorizontal size={18}/>);

  const openCreate = () => {
    if (activeModule === "Users") setModal({type:"user"});
    else if (activeModule === "Roles") setModal({type:"role"});
    else if (activeModule === "Permissions") setModal({type:"permission"});
    else showToast("This dashboard action is ready for the next phase.");
  };

  return (
    <div className={`app ${settings.darkMode ? "dark" : ""}`}>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brandMark">T</div>
          <div><strong>TechTarn</strong><span>Food Processing ERP</span></div>
          <button className="iconBtn mobileOnly" onClick={()=>setSidebarOpen(false)}><X size={18}/></button>
        </div>
        <div className="panelLabel">CURRENT PANEL</div>
        <div className="panelSelect">{panel}<ChevronDown size={16}/></div>
        <div className="navTitle">MODULES</div>
        <nav>
          {moduleItems.map(m => (
            <button key={m} className={`navItem ${activeModule===m?"active":""}`} onClick={()=>{setActiveModule(m);setSidebarOpen(false);}}>
              {navIcon(m)}<span>{m}</span>
            </button>
          ))}
        </nav>
        <div className="sidebarFoot">
          <div className="secure"><LockKeyhole size={16}/><span>Secure ERP Workspace</span></div>
          <div className="support">Need help? {BRAND.email}</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="iconBtn mobileOnly" onClick={()=>setSidebarOpen(true)}><Menu size={21}/></button>
          <div>
            <div className="eyebrow">{panel}</div>
            <h1>{activeModule}</h1>
          </div>
          <div className="topActions">
            <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..."/></div>
            <button className="iconBtn" title="Notifications"><Bell size={18}/><i></i></button>
            <div className="avatar">SA</div>
            <button className="logout" onClick={()=>setLoggedIn(false)}><LogOut size={17}/> Logout</button>
          </div>
        </header>

        <div className="content">
          {activeModule === "Dashboard" && panel === "Management / CEO" && <ManagementDashboard kpis={managementKpis} approvals={approvals} reports={managementReports} onNavigate={setActiveModule} />}
          {activeModule === "Dashboard" && panel !== "Management / CEO" && <Dashboard panel={panel} users={users} roles={roles} onNavigate={setActiveModule} />}
          {activeModule === "KPIs" && <ManagementKpis kpis={managementKpis} setKpis={setManagementKpis} query={query} onLog={log} onToast={showToast} />}
          {activeModule === "Reports" && panel === "Management / CEO" && <ManagementReports reports={managementReports} setReports={setManagementReports} query={query} onLog={log} onToast={showToast} />}
          {activeModule === "Approvals" && <ManagementApprovals approvals={approvals} setApprovals={setApprovals} query={query} onLog={log} onToast={showToast} />}
          {activeModule === "Users" && <UsersModule users={users} setUsers={setUsers} query={query} openCreate={openCreate} onEdit={(u)=>setModal({type:"editUser",data:u})} onLog={log} onToast={showToast} />}
          {activeModule === "Roles" && <RolesModule roles={roles} setRoles={setRoles} query={query} openCreate={openCreate} onEdit={(r)=>setModal({type:"editRole",data:r})} onLog={log} onToast={showToast} />}
          {activeModule === "Permissions" && <PermissionsModule permissions={permissions} setPermissions={setPermissions} roles={roles} onLog={log} onToast={showToast} />}
          {activeModule === "Settings" && <SettingsModule settings={settings} setSettings={setSettings} onLog={log} onToast={showToast} />}
          {activeModule === "Audit Log" && <AuditModule audit={audit} query={query} />}
          {!(["Dashboard","Users","Roles","Permissions","Settings","Audit Log","KPIs","Approvals"].includes(activeModule) || (panel === "Management / CEO" && activeModule === "Reports")) &&
            <PlaceholderModule panel={panel} module={activeModule} onToast={showToast}/>}
        </div>
      </main>

      {tour && <Tour onClose={()=>setTour(false)} module={activeModule} onNext={()=>{
        const seq = moduleItems;
        const i = seq.indexOf(activeModule);
        if (i < seq.length-1) setActiveModule(seq[i+1]); else setTour(false);
      }}/>}
      {modal && <Modal modal={modal} setModal={setModal} users={users} setUsers={setUsers} roles={roles} setRoles={setRoles} permissions={permissions} setPermissions={setPermissions} onLog={log} onToast={showToast}/>}
      {toast && <div className="toast"><Check size={18}/>{toast}</div>}
    <HowWorks panel="Management / CEO" module={activeModule}/></div>
  );
}

function LoginScreen({onLogin}) {
  const [email,setEmail] = useState("admin@techtarn.com");
  const [password,setPassword] = useState("Demo@123");
  const [selected,setSelected] = useState("Super Admin");
  return <div className="loginPage">
    <div className="loginGlow one"></div><div className="loginGlow two"></div>
    <div className="loginCard">
      <div className="loginBrand"><div className="brandMark big">T</div><div><strong>{BRAND.name}</strong><span>Food Processing ERP</span></div></div>
      <div className="loginCopy"><span className="pill">ERP PROTOTYPE • PHASE 1</span><h1>Welcome back</h1><p>Sign in to access your authorized ERP panel.</p></div>
      <form onSubmit={e=>{e.preventDefault();onLogin(email,password,selected)}} className="loginForm">
        <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
        <label>Login panel<select value={selected} onChange={e=>setSelected(e.target.value)}>{PANELS.map(p=><option key={p}>{p}</option>)}</select></label>
        <button className="primary full" type="submit"><KeyRound size={18}/> Sign in to {selected}</button>
      </form>
      <div className="demoBox"><strong>Demo access</strong><span>Admin: admin@techtarn.com</span><span>Password: Demo@123</span><small>Use the panel selector to preview every panel.</small></div>
      <div className="loginFooter"><span>{BRAND.email}</span><span>{BRAND.phone}</span><span>{BRAND.website}</span></div>
    </div>
  </div>
}


function ManagementDashboard({kpis, approvals, reports, onNavigate}) {
  const pending = approvals.filter(a=>a.status === "Pending").length;
  const readyReports = reports.filter(r=>r.status === "Ready").length;
  const onTrack = kpis.filter(k=>k.status === "On Track").length;
  return <div className="page">
    <div className="hero managementHero">
      <div><span className="pill">EXECUTIVE CONTROL CENTER</span><h2>Management / CEO Dashboard</h2><p>Executive visibility across production, finance, quality, delivery and operational approvals.</p></div>
      <button className="primary" onClick={()=>onNavigate("KPIs")}><Activity size={17}/> Review KPIs</button>
    </div>
    <div className="stats">
      <div className="stat"><div className="statIcon"><Activity size={19}/></div><div><span>KPIs On Track</span><strong>{onTrack}/{kpis.length}</strong></div></div>
      <div className="stat"><div className="statIcon"><Check size={19}/></div><div><span>Pending Approvals</span><strong>{pending}</strong></div></div>
      <div className="stat"><div className="statIcon"><Archive size={19}/></div><div><span>Reports Ready</span><strong>{readyReports}</strong></div></div>
      <div className="stat"><div className="statIcon"><ShieldCheck size={19}/></div><div><span>Overall Status</span><strong>Healthy</strong></div></div>
    </div>
    <div className="mgmtGrid">
      <div className="card">
        <div className="cardHead"><div><h3>Executive KPI snapshot</h3><p>Current management metrics.</p></div><button className="linkBtn" onClick={()=>onNavigate("KPIs")}>View all <ChevronRight size={15}/></button></div>
        <div className="kpiSnapshot">{kpis.slice(0,4).map(k=><div className="kpiMini" key={k.id}><span>{k.name}</span><strong>{k.value}{k.unit}</strong><small className={k.status === "Watch" ? "watch" : "good"}>{k.trend} · {k.status}</small></div>)}</div>
      </div>
      <div className="card">
        <div className="cardHead"><div><h3>Approval queue</h3><p>Items requiring management action.</p></div><button className="linkBtn" onClick={()=>onNavigate("Approvals")}>Open queue <ChevronRight size={15}/></button></div>
        <div className="miniList">{approvals.filter(a=>a.status === "Pending").slice(0,4).map(a=><div className="miniListRow" key={a.id}><div><b>{a.request}</b><small>{a.requester} · {a.amount}</small></div><span className={`priority ${a.priority.toLowerCase()}`}>{a.priority}</span></div>)}</div>
      </div>
    </div>
    <div className="card">
      <div className="cardHead"><div><h3>Management workbench</h3><p>Jump directly to the four executive modules.</p></div></div>
      <div className="moduleGrid managementModules">{[["KPIs","Monitor target vs actual metrics"],["Reports","Review executive and operational reports"],["Approvals","Approve or reject pending requests"]].map(([m,d],i)=><button className="moduleTile" key={m} onClick={()=>onNavigate(m)}><span>0{i+1}</span><div><b>{m}</b><small>{d}</small></div><ChevronRight size={16}/></button>)}</div>
    </div>
  </div>
}

function ManagementKpis({kpis,setKpis,query,onLog,onToast}) {
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({name:"New KPI",value:"0",unit:"%",target:"0",trend:"0%",status:"On Track"});
  const rows=kpis.filter(k=>(k.name+k.value+k.target+k.status).toLowerCase().includes(query.toLowerCase()));
  const startEdit=(k)=>{setEditing(k.id);setForm({...k});};
  const save=()=>{
    if(!form.name.trim()){onToast("KPI name is required.");return;}
    if(editing) setKpis(kpis.map(k=>k.id===editing?{...form,id:editing}:k));
    else setKpis([{...form,id:uid("KPI-")},...kpis]);
    onLog(editing?"Updated":"Created","KPIs"); onToast(editing?"KPI updated successfully.":"KPI created successfully."); setEditing(null);
  };
  const del=(id)=>{setKpis(kpis.filter(k=>k.id!==id));onLog("Deleted","KPIs");onToast("KPI deleted.");};
  return <div className="page"><PageIntro title="KPIs" text="Monitor executive metrics, targets, trends and status." action={<button className="primary" onClick={()=>{setEditing("new");setForm({name:"New KPI",value:"0",unit:"%",target:"0",trend:"0%",status:"On Track"});}}><Plus size={17}/> Add KPI</button>}/>
    <div className="kpiCards">{rows.slice(0,6).map(k=><div className="card kpiCard" key={k.id}><span>{k.name}</span><strong>{k.value}{k.unit}</strong><small>Target {k.target}{k.unit} · <b className={k.status === "Watch" ? "watch" : "good"}>{k.trend}</b></small></div>)}</div>
    <TableShell title="KPI register" subtitle={`${rows.length} metrics`}>
      <div className="tableWrap"><table><thead><tr><th>KPI</th><th>Actual</th><th>Target</th><th>Trend</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(k=><tr key={k.id}><td><b>{k.name}</b><small>{k.id}</small></td><td>{k.value}{k.unit}</td><td>{k.target}{k.unit}</td><td>{k.trend}</td><td><span className={`status ${k.status === "Watch" ? "inactive" : "active"}`}>{k.status}</span></td><td><div className="rowActions"><button onClick={()=>startEdit(k)} title="Edit"><Edit3 size={16}/></button><button onClick={()=>del(k.id)} title="Delete"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
    </TableShell>
    {editing && <ManagementFormModal title={editing === "new" ? "Add KPI" : "Edit KPI"} fields={[["name","KPI name"],["value","Actual value"],["unit","Unit"],["target","Target"],["trend","Trend"]]} form={form} setForm={setForm} selects={[["status","Status",["On Track","Watch","Critical"]]]} onClose={()=>setEditing(null)} onSave={save}/>} 
  </div>
}

function ManagementReports({reports,setReports,query,onLog,onToast}) {
  const [form,setForm]=useState({name:"Executive Report",period:"Sep 2026",owner:"Management",status:"Draft"});
  const rows=reports.filter(r=>(r.name+r.period+r.owner+r.status).toLowerCase().includes(query.toLowerCase()));
  const add=()=>{if(!form.name.trim()){onToast("Report name is required.");return;}setReports([{...form,id:uid("RPT-"),updated:"25 Sep 2026"},...reports]);onLog("Created","Reports");onToast("Report created successfully.");setForm({name:"Executive Report",period:"Sep 2026",owner:"Management",status:"Draft"});};
  const toggle=(id)=>{setReports(reports.map(r=>r.id===id?{...r,status:r.status==="Ready"?"Draft":"Ready"}:r));onLog("Updated","Reports");onToast("Report status updated.");};
  const del=(id)=>{setReports(reports.filter(r=>r.id!==id));onLog("Deleted","Reports");onToast("Report deleted.");};
  return <div className="page"><PageIntro title="Reports" text="Executive, operational and cross-functional management reports." action={<button className="secondary" onClick={()=>onToast("Report export prepared in prototype mode.")}><Archive size={17}/> Export Register</button>}/>
    <div className="card inlineForm"><div><h3>Create report</h3><p>Add a report record for management review.</p></div><div className="inlineFields"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Report name"/><input value={form.period} onChange={e=>setForm({...form,period:e.target.value})} placeholder="Period"/><input value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} placeholder="Owner"/><button className="primary" onClick={add}><Plus size={16}/> Add</button></div></div>
    <TableShell title="Report register" subtitle={`${rows.length} reports`}><div className="tableWrap"><table><thead><tr><th>Report</th><th>Period</th><th>Owner</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><b>{r.name}</b><small>{r.id}</small></td><td>{r.period}</td><td>{r.owner}</td><td><span className={`status ${r.status === "Ready" ? "active" : "inactive"}`}>{r.status}</span></td><td>{r.updated}</td><td><div className="rowActions"><button onClick={()=>toggle(r.id)} title="Toggle ready/draft"><Check size={16}/></button><button onClick={()=>del(r.id)} title="Delete"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></TableShell>
  </div>
}

function ManagementApprovals({approvals,setApprovals,query,onLog,onToast}) {
  const [form,setForm]=useState({request:"New Approval Request",requester:"Department Manager",amount:"₹ 0",priority:"Medium",status:"Pending",date:"25 Sep 2026"});
  const rows=approvals.filter(a=>(a.request+a.requester+a.amount+a.priority+a.status).toLowerCase().includes(query.toLowerCase()));
  const add=()=>{if(!form.request.trim()){onToast("Request name is required.");return;}setApprovals([{...form,id:uid("APR-"),status:"Pending"},...approvals]);onLog("Created","Approvals");onToast("Approval request created.");};
  const decision=(id,status)=>{setApprovals(approvals.map(a=>a.id===id?{...a,status}:a));onLog(status,"Approvals");onToast(`Request ${status.toLowerCase()}.`);};
  const del=(id)=>{setApprovals(approvals.filter(a=>a.id!==id));onLog("Deleted","Approvals");onToast("Approval request deleted.");};
  return <div className="page"><PageIntro title="Approvals" text="Review, approve or reject management requests." action={<button className="secondary" onClick={()=>onToast("Approval queue refreshed.")}><Activity size={17}/> Refresh</button>}/>
    <div className="card inlineForm"><div><h3>New approval request</h3><p>Enter a request for management review.</p></div><div className="inlineFields approvalFields"><input value={form.request} onChange={e=>setForm({...form,request:e.target.value})} placeholder="Request"/><input value={form.requester} onChange={e=>setForm({...form,requester:e.target.value})} placeholder="Requester"/><input value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="Amount / Qty"/><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>High</option><option>Medium</option><option>Low</option></select><button className="primary" onClick={add}><Plus size={16}/> Add</button></div></div>
    <TableShell title="Approval queue" subtitle={`${rows.length} requests`}><div className="tableWrap"><table><thead><tr><th>Request</th><th>Requester</th><th>Amount / Qty</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td><b>{a.request}</b><small>{a.id} · {a.date}</small></td><td>{a.requester}</td><td>{a.amount}</td><td><span className={`priority ${a.priority.toLowerCase()}`}>{a.priority}</span></td><td><span className={`status ${a.status === "Pending" ? "inactive" : "active"}`}>{a.status}</span></td><td><div className="rowActions">{a.status === "Pending" && <><button onClick={()=>decision(a.id,"Approved")} title="Approve"><Check size={16}/></button><button onClick={()=>decision(a.id,"Rejected")} title="Reject"><X size={16}/></button></>}<button onClick={()=>del(a.id)} title="Delete"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></TableShell>
  </div>
}

function ManagementFormModal({title,fields,form,setForm,selects,onClose,onSave}) {
  return <div className="modalBackdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><div className="modalHead"><div><span className="pill">MANAGEMENT KPI</span><h3>{title}</h3></div><button className="iconBtn" onClick={onClose}><X size={18}/></button></div><form className="modalForm" onSubmit={e=>{e.preventDefault();onSave();}}>{fields.map(([key,label])=><label key={key}>{label}<input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} required /></label>)}{selects.map(([key,label,opts])=><label key={key}>{label}<select value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}>{opts.map(o=><option key={o}>{o}</option>)}</select></label>)}<div className="modalActions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button type="submit" className="primary"><Check size={17}/> Save KPI</button></div></form></div></div>
}

function Dashboard({panel, users, roles, onNavigate}) {
  const cards = [
    ["Active Users", users.filter(u=>u.status==="Active").length, Users],
    ["Roles", roles.length, UserCog],
    ["Modules", panel==="Super Admin" ? 5 : 6, LayoutDashboard],
    ["System Status", "Healthy", ShieldCheck]
  ];
  return <div className="page">
    <div className="hero">
      <div><span className="pill">PHASE 1 • CONTROL CENTER</span><h2>{panel} Dashboard</h2><p>Central workspace for secure food-processing ERP administration.</p></div>
      <button className="primary" onClick={()=>onNavigate(panel==="Super Admin"?"Users":"Overview")}><Plus size={17}/> Get Started</button>
    </div>
    <div className="stats">{cards.map(([label,val,Icon])=><div className="stat" key={label}><div className="statIcon"><Icon size={19}/></div><div><span>{label}</span><strong>{val}</strong></div></div>)}</div>
    <div className="grid2">
      <div className="card">
        <div className="cardHead"><div><h3>Administration modules</h3><p>Core controls included in this prototype.</p></div></div>
        <div className="moduleGrid">{(panel==="Super Admin"?MODULES.map(x=>x[0]):["Overview","Tasks","Transactions","Reports","Settings"]).map((m,i)=><button className="moduleTile" key={m} onClick={()=>onNavigate(m)}><span>{String(i+1).padStart(2,"0")}</span><b>{m}</b><ChevronRight size={16}/></button>)}</div>
      </div>
      <div className="card">
        <div className="cardHead"><div><h3>Quick checklist</h3><p>Suggested Phase 1 validation flow.</p></div></div>
        {["Create a demo user","Assign a role","Review permissions","Confirm company settings","Check audit trail"].map((x,i)=><div className="checkRow" key={x}><div className="check"><Check size={13}/></div><span>{x}</span><small>Step {i+1}</small></div>)}
      </div>
    </div>
  </div>
}

function TableShell({title,subtitle,action,children}) {
  return <div className="card tableCard"><div className="cardHead"><div><h3>{title}</h3><p>{subtitle}</p></div>{action}</div>{children}</div>
}

function UsersModule({users,setUsers,query,openCreate,onEdit,onLog,onToast}) {
  const filtered=users.filter(u=>(u.name+u.email+u.role+u.status).toLowerCase().includes(query.toLowerCase()));
  const toggle=(id)=>{setUsers(users.map(u=>u.id===id?{...u,status:u.status==="Active"?"Inactive":"Active"}:u));onLog("Updated","Users");onToast("User status updated.");};
  const del=(id)=>{setUsers(users.filter(u=>u.id!==id));onLog("Deleted","Users");onToast("User deleted.");};
  return <div className="page"><PageIntro title="Users" text="Manage authorized users and panel access." action={<button className="primary" onClick={openCreate}><Plus size={17}/> Add User</button>}/>
    <TableShell title="User directory" subtitle={`${filtered.length} records`}>
      <div className="tableWrap"><table><thead><tr><th>User</th><th>Role / Panel</th><th>Status</th><th>Last login</th><th>Actions</th></tr></thead><tbody>{filtered.map(u=><tr key={u.id}><td><div className="person"><div className="miniAvatar">{u.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><b>{u.name}</b><small>{u.email} · {u.id}</small></div></div></td><td>{u.role}</td><td><span className={`status ${u.status.toLowerCase()}`}>{u.status}</span></td><td>{u.lastLogin}</td><td><div className="rowActions"><button title="Edit" onClick={()=>onEdit(u)}><Edit3 size={16}/></button><button title="Toggle status" onClick={()=>toggle(u.id)}><ShieldCheck size={16}/></button><button title="Delete" onClick={()=>del(u.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
    </TableShell>
  </div>
}

function RolesModule({roles,setRoles,query,openCreate,onEdit,onLog,onToast}) {
  const filtered=roles.filter(r=>(r.name+r.desc+r.modules).toLowerCase().includes(query.toLowerCase()));
  const del=(id)=>{setRoles(roles.filter(r=>r.id!==id));onLog("Deleted","Roles");onToast("Role deleted.");};
  return <div className="page"><PageIntro title="Roles" text="Define role groups and their functional scope." action={<button className="primary" onClick={openCreate}><Plus size={17}/> Add Role</button>}/>
    <TableShell title="Role directory" subtitle={`${filtered.length} roles configured`}>
      <div className="tableWrap"><table><thead><tr><th>Role</th><th>Description</th><th>Primary modules</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(r=><tr key={r.id}><td><b>{r.name}</b><small>{r.id}</small></td><td>{r.desc}</td><td>{r.modules}</td><td><span className="status active">Active</span></td><td><div className="rowActions"><button onClick={()=>onEdit(r)}><Edit3 size={16}/></button><button onClick={()=>del(r.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
    </TableShell>
  </div>
}

function PermissionsModule({permissions,setPermissions,roles,onLog,onToast}) {
  const toggle=(id,key)=>{setPermissions(permissions.map(p=>p.id===id?{...p,[key]:!p[key]}:p));onLog("Updated","Permissions");};
  return <div className="page"><PageIntro title="Permissions" text="Fine-grained View, Add, Edit, Delete and Export controls." action={<button className="secondary" onClick={()=>onToast("Permission changes are saved locally in this prototype.")}>Save Changes</button>}/>
    <TableShell title="Permission matrix" subtitle="Click a permission to toggle it.">
      <div className="tableWrap"><table className="permissionTable"><thead><tr><th>Role</th><th>Module</th><th>View</th><th>Add</th><th>Edit</th><th>Delete</th><th>Export</th></tr></thead><tbody>{permissions.map(p=><tr key={p.id}><td><b>{p.role}</b></td><td>{p.module}</td>{["view","add","edit","del","export"].map(k=><td key={k}><button className={`perm ${p[k]?"on":""}`} onClick={()=>toggle(p.id,k)}>{p[k]?"✓":"—"}</button></td>)}</tr>)}</tbody></table></div>
    </TableShell>
  </div>
}

function SettingsModule({settings,setSettings,onLog,onToast}) {
  const save=()=>{onLog("Updated","Settings");onToast("Settings saved successfully.");};
  return <div className="page"><PageIntro title="Settings" text="Company, security, notification and workspace preferences." action={<button className="primary" onClick={save}><Check size={17}/> Save Settings</button>}/>
    <div className="settingsGrid">
      <div className="card formCard"><h3>Company information</h3><p>Branding shown across the ERP.</p>
        <div className="formGrid">{[["companyName","Company name"],["phone","Contact number"],["email","Email address"],["website","Website"]].map(([k,l])=><label key={k}>{l}<input value={settings[k]} onChange={e=>setSettings({...settings,[k]:e.target.value})}/></label>)}</div>
      </div>
      <div className="card formCard"><h3>Security & notifications</h3><p>Prototype preferences for system controls.</p>
        <label>Session timeout<select value={settings.session} onChange={e=>setSettings({...settings,session:e.target.value})}><option>15 minutes</option><option>30 minutes</option><option>60 minutes</option></select></label>
        <Toggle label="Two-factor authentication" value={settings.twoFactor} setValue={v=>setSettings({...settings,twoFactor:v})}/>
        <Toggle label="Email alerts" value={settings.emailAlerts} setValue={v=>setSettings({...settings,emailAlerts:v})}/>
        <Toggle label="Dark mode" value={settings.darkMode} setValue={v=>setSettings({...settings,darkMode:v})}/>
      </div>
    </div>
  </div>
}

function Toggle({label,value,setValue}) {
  return <div className="toggleRow"><span>{label}</span><button className={`toggle ${value?"on":""}`} onClick={()=>setValue(!value)}><i></i></button></div>
}

function AuditModule({audit,query}) {
  const rows=audit.filter(a=>(a.user+a.action+a.module+a.result).toLowerCase().includes(query.toLowerCase()));
  return <div className="page"><PageIntro title="Audit Log" text="Immutable-style activity view for the prototype." action={<button className="secondary"><FileClock size={17}/> Export Log</button>}/>
    <TableShell title="Recent activity" subtitle={`${rows.length} events`}>
      <div className="tableWrap"><table><thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>Result</th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td>{a.time}</td><td><b>{a.user}</b></td><td><span className="actionTag">{a.action}</span></td><td>{a.module}</td><td><span className="status active">{a.result}</span></td></tr>)}</tbody></table></div>
    </TableShell>
  </div>
}

function PlaceholderModule({panel,module,onToast}) {
  return <div className="page"><PageIntro title={module} text={`Demo workspace for the ${panel} panel.`} action={<button className="primary" onClick={()=>onToast("Module shell is active. Business functions will be added in the next phase.")}><Plus size={17}/> New Entry</button>}/>
    <div className="card emptyState"><div className="emptyIcon"><LayoutDashboard size={26}/></div><h3>{module} workspace ready</h3><p>Navigation, responsive layout, role login and panel shell are active. Detailed business transactions for this panel can be layered into the same structure.</p></div>
  </div>
}

function PageIntro({title,text,action}) {
  return <div className="pageIntro"><div><h2>{title}</h2><p>{text}</p></div>{action}</div>
}

function Modal({modal,setModal,users,setUsers,roles,setRoles,permissions,setPermissions,onLog,onToast}) {
  const isEditUser = modal.type === "editUser";
  const isEditRole = modal.type === "editRole";
  const [form,setForm]=useState(isEditUser ? {...modal.data} : isEditRole ? {...modal.data} : modal.type==="user"?{name:"Demo User",email:"newuser@techtarn.com",role:"Super Admin",status:"Active"}:modal.type==="role"?{name:"New Role",desc:"Custom role",modules:"Dashboard",status:"Active"}:{role:"Super Admin",module:"Users",view:true,add:true,edit:true,del:false,export:false});
  const submit=(e)=>{
    e.preventDefault();
    if(isEditUser) setUsers(users.map(u=>u.id===form.id?{...u,name:form.name,email:form.email,role:form.role}:u));
    else if(isEditRole) setRoles(roles.map(r=>r.id===form.id?{...r,name:form.name,desc:form.desc,modules:form.modules}:r));
    else if(modal.type==="user") setUsers([{...form,id:uid("USR-"),lastLogin:"Never"},...users]);
    else if(modal.type==="role") setRoles([{...form,id:uid("ROLE-")},...roles]);
    else if(modal.type==="permission") setPermissions([{...form,id:uid("PER-")},...permissions]);
    const moduleName = (isEditUser||modal.type==="user") ? "Users" : (isEditRole||modal.type==="role") ? "Roles" : "Permissions";
    onLog(isEditUser||isEditRole ? "Updated" : "Created", moduleName);
    onToast(isEditUser||isEditRole ? "Record updated successfully." : "Record created successfully.");
    setModal(null);
  };
  return <div className="modalBackdrop" onMouseDown={e=>e.target===e.currentTarget&&setModal(null)}><div className="modal"><div className="modalHead"><div><span className="pill">CREATE RECORD</span><h3>{isEditUser?"Edit User":isEditRole?"Edit Role":modal.type==="user"?"Add User":modal.type==="role"?"Add Role":"Add Permission"}</h3></div><button className="iconBtn" onClick={()=>setModal(null)}><X size={18}/></button></div>
    <form onSubmit={submit} className="modalForm">
      {(modal.type==="user" || isEditUser) && <>
        <label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Panel / Role<select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>{PANELS.map(p=><option key={p}>{p}</option>)}</select></label>
        <label>Status<select value={form.status || "Active"} onChange={e=>setForm({...form,status:e.target.value})}><option>Active</option><option>Inactive</option></select></label>
      </>}
      {(modal.type==="role" || isEditRole) && <>
        <label>Role name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>Description<input value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></label>
        <label>Primary modules<input value={form.modules} onChange={e=>setForm({...form,modules:e.target.value})}/></label>
      </>}
      {modal.type==="permission" && <>
        <label>Role<select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>{roles.map(r=><option key={r.id}>{r.name}</option>)}</select></label>
        <label>Module<select value={form.module} onChange={e=>setForm({...form,module:e.target.value})}>{MODULES.map(m=><option key={m[0]}>{m[0]}</option>)}</select></label>
        <div className="permChecks">{["view","add","edit","del","export"].map(k=><label key={k}><input type="checkbox" checked={form[k]} onChange={e=>setForm({...form,[k]:e.target.checked})}/>{k.toUpperCase()}</label>)}</div>
      </>}
      <div className="modalActions"><button type="button" className="secondary" onClick={()=>setModal(null)}>Cancel</button><button className="primary" type="submit"><Check size={17}/> Save Record</button></div>
    </form>
  </div></div>
}

function Tour({onClose,onNext,module}) {
  return <div className="tour"><div className="tourTop"><span className="pill">GUIDE TOUR</span><button className="iconBtn" onClick={onClose}><X size={16}/></button></div><h3>Step through {module}</h3><p>Use the navigation on the left to move between modules. Buttons are functional in this prototype and demo records can be created, edited through controls, toggled and deleted.</p><div className="tourFoot"><small>Tip: resize the browser to validate responsive behavior.</small><button className="primary small" onClick={onNext}>Next <ChevronRight size={16}/></button></div></div>
}

