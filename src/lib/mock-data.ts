export type InvoiceStatus = "paid" | "sent" | "overdue" | "draft";
export type ClientStatus = "active" | "prospect" | "archived";

export const organisation = {
  name: "Axis Holdings",
  plan: "Business",
  currency: "USD",
  taxId: "AX-99-4471203",
  country: "Kenya",
  fiscalYearStart: "January",
};

export const organisations = [
  { id: "axis", name: "Axis Holdings", plan: "Business" },
  { id: "northwind", name: "Northwind Freight", plan: "Starter" },
  { id: "vantus", name: "Vantus Retail Ltd", plan: "Business" },
];

export const currentUser = {
  name: "Emma Johnson",
  email: "emma@axisholdings.co",
  role: "Owner",
  initials: "EJ",
};

export const kpis = [
  { label: "Total Revenue", value: "$248,420", delta: "+12.4%", trend: "up" as const, sub: "vs last month $221,100" },
  { label: "Paid Invoices", value: "$50,520", delta: "+16.8%", trend: "up" as const, sub: "vs last month $45,600" },
  { label: "Unpaid Invoices", value: "$25,260", delta: "+12.9%", trend: "up" as const, sub: "vs last month $22,800" },
  { label: "Overdue Invoices", value: "$8,420", delta: "-4.2%", trend: "down" as const, sub: "vs last month $7,600" },
];

export const revenueSeries = [
  { month: "Jan", revenue: 128000, expenses: 86000 },
  { month: "Feb", revenue: 141500, expenses: 92400 },
  { month: "Mar", revenue: 136200, expenses: 88900 },
  { month: "Apr", revenue: 172800, expenses: 101300 },
  { month: "May", revenue: 165400, expenses: 97600 },
  { month: "Jun", revenue: 198300, expenses: 112500 },
  { month: "Jul", revenue: 221100, expenses: 119400 },
  { month: "Aug", revenue: 248420, expenses: 128700 },
];

export const cashflowSeries = [
  { day: "W1", inflow: 42000, outflow: 27500 },
  { day: "W2", inflow: 51200, outflow: 31800 },
  { day: "W3", inflow: 38600, outflow: 29400 },
  { day: "W4", inflow: 62400, outflow: 34100 },
];

export const revenueSplit = [
  { name: "Services", value: 54, color: "var(--color-chart-1)" },
  { name: "Products", value: 28, color: "var(--color-chart-2)" },
  { name: "Retainers", value: 18, color: "var(--color-chart-3)" },
];

export const recentActivity = [
  { id: 1, actor: "Emma Johnson", action: "marked invoice INV-1043 as paid", time: "12 min ago", type: "invoice" },
  { id: 2, actor: "Daniel Kim", action: "created journal entry JE-0219", time: "1 hr ago", type: "ledger" },
  { id: 3, actor: "Aisha Noor", action: "added client Dubai Mall Group", time: "3 hrs ago", type: "client" },
  { id: 4, actor: "System", action: "reconciled 14 bank transactions", time: "Yesterday", type: "bank" },
  { id: 5, actor: "Tomás Rivera", action: "invited liam@axisholdings.co to the team", time: "Yesterday", type: "team" },
];

export const topClients = [
  { name: "Qatar Furniture", revenue: 52400, share: 92, invoices: 14 },
  { name: "Furniture Shop", revenue: 41800, share: 74, invoices: 11 },
  { name: "Dubai Mall Group", revenue: 33250, share: 58, invoices: 9 },
  { name: "Modern Habitat", revenue: 24900, share: 44, invoices: 7 },
  { name: "A to Z Furnitures", revenue: 18600, share: 32, invoices: 5 },
];

export const clients = [
  { id: "CL-001", name: "Qatar Furniture", contact: "Hamad Al-Thani", email: "furniture.shop@gmail.com", phone: "+974 5512 4487", country: "Qatar", balance: 50000, status: "active" as ClientStatus, since: "2023-04-12" },
  { id: "CL-002", name: "Furniture Mart", contact: "Nadia Rahman", email: "furnituremart@gmail.com", phone: "+880 1712 345678", country: "Bangladesh", balance: 76000, status: "active" as ClientStatus, since: "2023-07-01" },
  { id: "CL-003", name: "A to Z Furnitures", contact: "Urban Living", email: "urbanliving360@gmail.com", phone: "+971 50 123 4567", country: "UAE", balance: 32854, status: "active" as ClientStatus, since: "2024-01-19" },
  { id: "CL-004", name: "Dubai Mall Group", contact: "Layla Haddad", email: "dubaimall33@gmail.com", phone: "+61 412 345 678", country: "UAE", balance: 45464, status: "prospect" as ClientStatus, since: "2024-06-03" },
  { id: "CL-005", name: "Modern Habitat", contact: "Sung-min Park", email: "hello@modernhabitat.kr", phone: "+82 10 5544 8899", country: "South Korea", balance: 12300, status: "active" as ClientStatus, since: "2024-09-22" },
  { id: "CL-006", name: "Highline Interiors", contact: "Grace Otieno", email: "accounts@highline.co.ke", phone: "+254 720 998 114", country: "Kenya", balance: 0, status: "archived" as ClientStatus, since: "2022-11-08" },
];

export const invoices = [
  { id: "INV-1043", client: "Qatar Furniture", issued: "2026-08-01", due: "2026-08-15", amount: 14100, balance: 0, status: "paid" as InvoiceStatus },
  { id: "INV-1044", client: "Furniture Mart", issued: "2026-08-03", due: "2026-08-17", amount: 12400, balance: 12400, status: "sent" as InvoiceStatus },
  { id: "INV-1045", client: "Dubai Mall Group", issued: "2026-07-12", due: "2026-07-26", amount: 9800, balance: 9800, status: "overdue" as InvoiceStatus },
  { id: "INV-1046", client: "Modern Habitat", issued: "2026-08-09", due: "2026-08-23", amount: 5600, balance: 5600, status: "sent" as InvoiceStatus },
  { id: "INV-1047", client: "A to Z Furnitures", issued: "2026-08-14", due: "2026-08-28", amount: 7200, balance: 7200, status: "draft" as InvoiceStatus },
  { id: "INV-1048", client: "Qatar Furniture", issued: "2026-06-30", due: "2026-07-14", amount: 21500, balance: 0, status: "paid" as InvoiceStatus },
];

export const transactions = [
  { id: "TX-9014", date: "2026-08-17", description: "Card payment — Qatar Furniture", account: "Standard Chartered ••4471", category: "Sales income", amount: 14100, type: "credit" as const, reconciled: true },
  { id: "TX-9013", date: "2026-08-16", description: "AWS invoice 8827", account: "Standard Chartered ••4471", category: "Software", amount: -1840, type: "debit" as const, reconciled: true },
  { id: "TX-9012", date: "2026-08-15", description: "Payroll run — August", account: "Equity Bank ••8802", category: "Payroll", amount: -42600, type: "debit" as const, reconciled: false },
  { id: "TX-9011", date: "2026-08-14", description: "Transfer to reserve", account: "Equity Bank ••8802", category: "Internal transfer", amount: -20000, type: "debit" as const, reconciled: true },
  { id: "TX-9010", date: "2026-08-12", description: "Wire in — Furniture Mart", account: "Standard Chartered ••4471", category: "Sales income", amount: 12400, type: "credit" as const, reconciled: false },
  { id: "TX-9009", date: "2026-08-11", description: "Office lease — Q3", account: "Equity Bank ••8802", category: "Rent", amount: -9500, type: "debit" as const, reconciled: true },
];

export const accounts = [
  { code: "1000", name: "Cash and Bank", type: "Asset", balance: 184320, normal: "Debit" },
  { code: "1100", name: "Accounts Receivable", type: "Asset", balance: 33660, normal: "Debit" },
  { code: "1400", name: "Inventory", type: "Asset", balance: 62400, normal: "Debit" },
  { code: "2000", name: "Accounts Payable", type: "Liability", balance: 28150, normal: "Credit" },
  { code: "2200", name: "VAT Payable", type: "Liability", balance: 9420, normal: "Credit" },
  { code: "3000", name: "Owner's Equity", type: "Equity", balance: 150000, normal: "Credit" },
  { code: "4000", name: "Sales Revenue", type: "Revenue", balance: 248420, normal: "Credit" },
  { code: "5000", name: "Cost of Goods Sold", type: "Expense", balance: 96800, normal: "Debit" },
  { code: "6100", name: "Salaries and Wages", type: "Expense", balance: 128700, normal: "Debit" },
];

export const journalEntries = [
  { id: "JE-0219", date: "2026-08-17", memo: "Invoice INV-1043 settlement", debit: 14100, credit: 14100, status: "posted", lines: 2 },
  { id: "JE-0218", date: "2026-08-16", memo: "AWS subscription", debit: 1840, credit: 1840, status: "posted", lines: 2 },
  { id: "JE-0217", date: "2026-08-15", memo: "August payroll accrual", debit: 42600, credit: 42600, status: "posted", lines: 4 },
  { id: "JE-0216", date: "2026-08-11", memo: "Q3 office lease", debit: 9500, credit: 9500, status: "draft", lines: 2 },
];

export const bankAccounts = [
  { id: "BA-01", bank: "Standard Chartered", nickname: "Operating", number: "••••4471", balance: 128430, currency: "USD", status: "connected", lastSync: "8 min ago" },
  { id: "BA-02", bank: "Equity Bank", nickname: "Payroll", number: "••••8802", balance: 42890, currency: "USD", status: "connected", lastSync: "24 min ago" },
  { id: "BA-03", bank: "Wise", nickname: "FX reserve", number: "••••2210", balance: 13000, currency: "EUR", status: "needs attention", lastSync: "3 days ago" },
];

export const employees = [
  { id: "EMP-01", name: "Daniel Kim", role: "Finance Lead", department: "Finance", email: "daniel@axisholdings.co", salary: 96000, status: "active", start: "2022-02-14" },
  { id: "EMP-02", name: "Aisha Noor", role: "Account Manager", department: "Sales", email: "aisha@axisholdings.co", salary: 72000, status: "active", start: "2023-05-02" },
  { id: "EMP-03", name: "Tomás Rivera", role: "Operations Manager", department: "Operations", email: "tomas@axisholdings.co", salary: 81000, status: "active", start: "2021-09-27" },
  { id: "EMP-04", name: "Priya Anand", role: "Bookkeeper", department: "Finance", email: "priya@axisholdings.co", salary: 54000, status: "on leave", start: "2024-03-11" },
  { id: "EMP-05", name: "Liam Carter", role: "Sales Associate", department: "Sales", email: "liam@axisholdings.co", salary: 48000, status: "active", start: "2025-01-06" },
];

export const teamMembers = [
  { id: "TM-01", name: "Emma Johnson", email: "emma@axisholdings.co", role: "Owner", status: "active", lastActive: "Now" },
  { id: "TM-02", name: "Daniel Kim", email: "daniel@axisholdings.co", role: "Admin", status: "active", lastActive: "2 hrs ago" },
  { id: "TM-03", name: "Aisha Noor", email: "aisha@axisholdings.co", role: "Member", status: "active", lastActive: "Yesterday" },
  { id: "TM-04", name: "liam@axisholdings.co", email: "liam@axisholdings.co", role: "Member", status: "invited", lastActive: "—" },
];

export const taxRates = [
  { id: "TR-01", name: "VAT Standard", rate: 16, region: "Kenya", accounts: "VAT Payable", default: true },
  { id: "TR-02", name: "VAT Zero-rated", rate: 0, region: "Kenya", accounts: "VAT Payable", default: false },
  { id: "TR-03", name: "UAE VAT", rate: 5, region: "UAE", accounts: "VAT Payable", default: false },
  { id: "TR-04", name: "Withholding Tax", rate: 5, region: "Kenya", accounts: "WHT Payable", default: false },
];

export const connections = [
  { id: "CN-01", name: "Stripe", category: "Payments", status: "connected", detail: "Syncing payouts every 6 hours" },
  { id: "CN-02", name: "M-Pesa", category: "Payments", status: "connected", detail: "Till 552441 · live" },
  { id: "CN-03", name: "Shopify", category: "Commerce", status: "disconnected", detail: "Import orders and payouts" },
  { id: "CN-04", name: "Slack", category: "Notifications", status: "connected", detail: "#finance-alerts" },
  { id: "CN-05", name: "Google Drive", category: "Documents", status: "disconnected", detail: "Archive invoice PDFs" },
];

export const inventory = [
  { sku: "TBL-LEG", name: "Table Virello", available: 12220, reserved: 11540, capacity: 34000, status: "healthy" },
  { sku: "CHR-OAK", name: "Oak Dining Chair", available: 4380, reserved: 3900, capacity: 12000, status: "healthy" },
  { sku: "SFA-LIN", name: "Linen Sofa 3-seat", available: 620, reserved: 1180, capacity: 4000, status: "low" },
  { sku: "DSK-STD", name: "Standing Desk Pro", available: 180, reserved: 240, capacity: 2500, status: "critical" },
];

export const currency = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
