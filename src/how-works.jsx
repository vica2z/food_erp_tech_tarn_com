import React from "react";

const common=(m)=>{
  const x=String(m||"Module");
  if(/dashboard/i.test(x)) return [
    "Review the KPI cards and alerts first.",
    "Open a workflow tile to jump into the related module.",
    "Use the module screens to maintain records, then return to Dashboard to confirm the updated counts."
  ];
  if(/report|mis|analytics/i.test(x)) return [
    "Choose the report, period or data set you want to review.",
    "Apply available filters/grouping and verify the displayed records.",
    "Export the result when the report is ready for sharing or review."
  ];
  if(/setting|configuration/i.test(x)) return [
    "Review the current organization or module configuration.",
    "Update the required preferences and validation values.",
    "Save the settings and confirm the success message before leaving the page."
  ];
  if(/approval|permission|role/i.test(x)) return [
    "Open the record, role or permission set that needs attention.",
    "Review the details and make the required change or approval decision.",
    "Save/approve the change and verify the resulting status or audit entry."
  ];
  if(/payment|receipt|finance|ledger|tax|cost/i.test(x)) return [
    "Open the financial record and confirm the party, date, reference and amount.",
    "Enter or edit the transaction and complete the required validation.",
    "Save the entry, then review its status or related report for confirmation."
  ];
  if(/production|batch|recipe|work order/i.test(x)) return [
    "Select the product, plan/batch and production details.",
    "Enter quantities, dates, line and status; validate the production data.",
    "Save/update the record and follow its status through the production workflow."
  ];
  if(/quality|qc|capa|compliance|haccp|ccp|food safety|traceability/i.test(x)) return [
    "Select the sample, specification, control point or compliance record.",
    "Enter the observation/result, owner, date and required status details.",
    "Save the record and follow exceptions, approvals or corrective actions to closure."
  ];
  if(/machine|maintenance|breakdown|spare|operator|downtime|checklist/i.test(x)) return [
    "Select the machine or operational record you are working on.",
    "Enter the operating, service, downtime or checklist information and update status.",
    "Save the entry and confirm the current machine/work status on the dashboard or list."
  ];
  if(/warehouse|inventory|stock|lot|batch|expiry|transfer|inward|outward|picking|packing/i.test(x)) return [
    "Select the item, lot/batch, location or warehouse transaction.",
    "Enter quantity, location and movement details; check expiry/status where applicable.",
    "Save the movement and verify the updated stock, bin or transaction history."
  ];
  if(/sales|customer|quotation|order|pricing|dispatch|crm/i.test(x)) return [
    "Open the customer or commercial transaction you need to maintain.",
    "Enter the customer, product, price, quantity and workflow details.",
    "Save the record and move it through quotation, order, pricing or dispatch status."
  ];
  if(/purchase|supplier|rfq|grn/i.test(x)) return [
    "Select the supplier and purchase document or receipt you need to process.",
    "Enter items, quantities, dates, prices and approval/receipt details.",
    "Save the record and verify the purchase or GRN status before moving to the next step."
  ];
  if(/hr|employee|attendance|leave|payroll|compliance/i.test(x)) return [
    "Select the employee or HR transaction.",
    "Enter the required attendance, leave, payroll or compliance information.",
    "Save and verify the status, calculation or compliance due date."
  ];
  if(/logistics|vehicle|route|delivery|transport|pod/i.test(x)) return [
    "Select the vehicle, route, delivery or transport record.",
    "Enter assignment, route, quantity, driver and delivery/POD details.",
    "Save the transaction and confirm delivery, transport or POD status."
  ];
  return [
    "Open the module and review the demo records and available actions.",
    "Use Add/Edit/Search and complete all required fields before saving.",
    "Verify the saved record, status and related report or workflow before moving on."
  ];
};

export default function HowWorks({panel,module}){
  const steps=common(module);
  return <details className="how-works">
    <summary><span className="how-icon">?</span><span>How it works</span><small>{module}</small></summary>
    <div className="how-pop">
      <div className="how-title"><div><b>{module}</b><span>{panel}</span></div><span className="how-badge">USER GUIDE</span></div>
      <ol>{steps.map((s,i)=><li key={s}><span>{i+1}</span><p>{s}</p></li>)}</ol>
      <div className="how-tip"><b>Tip:</b> Use the existing <b>Guide Tour</b> button for guided navigation across the panel modules.</div>
    </div>
  </details>;
}
